import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'formatDate',
  standalone: true
})
export class FormatDatePipe implements PipeTransform {

  transform(dateString: string): string {
    const inputDate = new Date(dateString);
    const today = new Date();

    // Сбрасываем время для точного сравнения дат
    const todayStart = new Date(today.getFullYear(), today.getMonth(), today.getDate());
    const yesterdayStart = new Date(todayStart);
    yesterdayStart.setDate(todayStart.getDate() - 1);

    const inputDateStart = new Date(inputDate.getFullYear(), inputDate.getMonth(), inputDate.getDate());

    if (inputDateStart.getTime() === todayStart.getTime()) {
      return 'Сегодня';
    }

    if (inputDateStart.getTime() === yesterdayStart.getTime()) {
      return 'Вчера';
    }

    // Если прошло больше времени, форматируем как dd.mm.yyyy
    const day = inputDate.getDate().toString().padStart(2, '0');
    const month = (inputDate.getMonth() + 1).toString().padStart(2, '0');
    const year = inputDate.getFullYear();

    return `${day}.${month}.${year}`;
  }
}
