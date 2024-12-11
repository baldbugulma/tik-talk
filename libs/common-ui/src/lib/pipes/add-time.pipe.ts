import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'addTime',
  standalone: true,
})
export class AddTimePipe implements PipeTransform {
  transform(dateString: string): string {
    const inputDate = new Date(dateString);

    // Преобразование даты к локальной зоне пользователя
    const localDate = new Date(
      inputDate.getTime() - inputDate.getTimezoneOffset() * 60 * 1000
    );

    const currentDate = new Date();

    // Вычисляем разницу во времени в миллисекундах
    const diffInMs = currentDate.getTime() - localDate.getTime();

    // Оставшаяся логика остается неизменной
    const diffInMinutes = Math.floor(diffInMs / (1000 * 60));
    const diffInHours = Math.floor(diffInMs / (1000 * 60 * 60));
    const diffInDays = Math.floor(diffInMs / (1000 * 60 * 60 * 24));
    const diffInMonths = Math.floor(diffInMs / (1000 * 60 * 60 * 24 * 30.44));

    if (diffInMinutes < 1) {
      return 'Только что';
    } else if (diffInMinutes === 1) {
      return '1 минуту назад';
    } else if (diffInMinutes < 60) {
      return `${diffInMinutes} ${this.declineWord(
        diffInMinutes,
        'минута',
        'минуты',
        'минут'
      )} назад`;
    } else if (diffInHours === 1) {
      return '1 час назад';
    } else if (diffInHours < 24) {
      return `${diffInHours} ${this.declineWord(
        diffInHours,
        'час',
        'часа',
        'часов'
      )} назад`;
    } else if (diffInDays === 1) {
      return '1 день назад';
    } else if (diffInDays < 30) {
      return `${diffInDays} ${this.declineWord(
        diffInDays,
        'день',
        'дня',
        'дней'
      )} назад`;
    } else if (diffInMonths === 1) {
      return '1 месяц назад';
    } else {
      return `${diffInMonths} ${this.declineWord(
        diffInMonths,
        'месяц',
        'месяца',
        'месяцев'
      )} назад`;
    }
  }

  // Метод для склонения слов (минуты, часы, дни, месяцы)
  private declineWord(
    number: number,
    form1: string,
    form2: string,
    form5: string
  ): string {
    const n = Math.abs(number) % 100;
    const n1 = n % 10;
    if (n > 10 && n < 20) return form5;
    if (n1 > 1 && n1 < 5) return form2;
    if (n1 === 1) return form1;
    return form5;
  }
}
