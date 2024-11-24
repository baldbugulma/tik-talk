import { AsyncPipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormControl, ReactiveFormsModule } from '@angular/forms';

import { RouterLink, RouterLinkActive } from '@angular/router';
import { map, startWith, switchMap } from 'rxjs';
import { ChatsService } from '../../../data/services/chats.service';
import { ChatsBtnComponent } from "../chats-btn/chats-btn.component";

@Component({
  selector: 'app-chats-list',
  standalone: true,
  imports: [ChatsBtnComponent, AsyncPipe, RouterLink, RouterLinkActive, ReactiveFormsModule],
  templateUrl: './chats-list.component.html',
  styleUrl: './chats-list.component.scss'
})
export class ChatsListComponent {
// Внедрение сервиса ChatsService с помощью DI
chatsService = inject(ChatsService);

// Создание FormControl для фильтрации чатов
filterChatsControll = new FormControl(''); // Начальное значение - пустая строка

// Создание observable, который будет содержать отфильтрованный список чатов
chats$ = this.chatsService.getMyChats() // Получаем observable с чатами
  .pipe(
    // Используем switchMap для переключения на поток значений фильтра
    switchMap(chats => {
      return this.filterChatsControll.valueChanges // Подписываемся на изменения в поле ввода фильтра
        .pipe(
          startWith(''), // Начинаем с пустой строки, чтобы изначально отображались все чаты
          map(inputValue => {
            // Фильтруем чаты на основе значения ввода
            return chats.filter(chat => {
              // Проверяем, содержится ли текст из поля ввода в имени пользователя
              return `${chat.userFrom.firstName} ${chat.userFrom.lastName}`
                .toLowerCase() // Приводим имена к нижнему регистру
                .includes(inputValue?.toLowerCase() ?? ''); // Сравниваем с текстом ввода (учитываем, что inputValue может быть null)
            });
          })
        );
    })
  );
}
