import { Component, inject } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { ChatsListComponent, ChatsService } from '@tt/chats';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  selector: 'app-chats',
  standalone: true,
  imports: [RouterOutlet, ChatsListComponent],
  templateUrl: './chats.component.html',
  styleUrl: './chats.component.scss',
})
export class ChatsPageComponent {
  #chatService = inject(ChatsService);

  constructor() {
    this.#chatService.connectWs().pipe(takeUntilDestroyed()).subscribe();
  }
}
