import { Component, forwardRef, input, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormsModule,
  NG_VALUE_ACCESSOR,
} from '@angular/forms';

@Component({
  selector: 'tt-input', // Селектор компонента, используется в шаблонах
  standalone: true, // Указывает, что компонент автономный
  imports: [FormsModule], // Импорты, необходимые для работы компонента
  templateUrl: './tt-input.component.html', // Шаблон компонента
  styleUrl: './tt-input.component.scss', // Стили компонента
  providers: [
    {
      provide: NG_VALUE_ACCESSOR, // Регистрация компонента в Angular формах
      multi: true, // Разрешает регистрацию нескольких провайдеров
      useExisting: forwardRef(() => TtInputComponent), // Указывает текущий компонент для NG_VALUE_ACCESSOR
    },
  ],
})
export class TtInputComponent implements ControlValueAccessor {
  // Свойство, определяющее тип ввода (text или password), по умолчанию 'text'
  type = input<'text' | 'password'>('text');

  // Свойство для текста-заполнителя (placeholder), по умолчанию пустая строка
  placeholder = input<string>('');

  // Сигнал, указывающий, заблокирован ли компонент, по умолчанию false (компонент активен)
  disabled = signal<boolean>(false);

  // Колбэк-функция, вызываемая при изменении значения
  onChange: any;

  // Колбэк-функция, вызываемая при взаимодействии с компонентом
  onTouched: any;

  // Текущее значение компонента, по умолчанию null
  value: string | null = null;

  /**
   * Метод, вызываемый Angular для передачи значения в компонент.
   * @param val - Новое значение для установки.
   */
  writeValue(val: string | null) {
    this.value = val; // Логирование значения в консоль (для отладки).
  }

  /**
   * Метод для регистрации функции обратного вызова при изменении значения.
   * @param fn - Функция, вызываемая при изменении значения.
   */
  registerOnChange(fn: any): void {
    this.onChange = fn; // Сохраняем функцию в свойстве onChange.
  }

  /**
   * Метод для регистрации функции обратного вызова при взаимодействии с компонентом.
   * @param fn - Функция, вызываемая при взаимодействии с компонентом.
   */
  registerOnTouched(fn: any): void {
    this.onTouched = fn; // Сохраняем функцию в свойстве onTouched.
  }

  /**
   * Метод, вызываемый Angular для блокировки или разблокировки компонента.
   * @param isDisabled - Если true, компонент становится заблокированным.
   */
  setDisabledState(isDisabled: boolean): void {
    this.disabled.set(isDisabled); // Устанавливаем значение сигнала disabled.
  }

  /**
   * Метод, вызываемый при изменении значения пользователем.
   * @param val - Новое значение, введенное пользователем.
   */
  onModelChange(val: string | null): void {
    this.onChange(val); // Вызываем функцию onChange с новым значением.
  }
}
