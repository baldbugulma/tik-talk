import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  forwardRef,
  inject,
  signal,
} from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  FormGroup,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TtInputComponent } from '../tt-input/tt-input.component';
import { DadataService, DadataSuggestions } from '@tt/data-access/common-ui';
import { debounceTime, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'tt-address-input',
  standalone: true,
  imports: [TtInputComponent, AsyncPipe, ReactiveFormsModule],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.css',
  changeDetection: ChangeDetectionStrategy.OnPush,
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => AddressInputComponent),
    },
  ],
})
export class AddressInputComponent implements ControlValueAccessor {
  innerSearchControl = new FormControl();
  #dadataService = inject(DadataService);
  isDropdowOpened = signal<boolean>(true);
  cdr = inject(ChangeDetectorRef);

  addressForm = new FormGroup({
    city: new FormControl(''),
    street: new FormControl(''),
    building: new FormControl(''),
  });

  suggestions$ = this.innerSearchControl.valueChanges.pipe(
    debounceTime(500),
    switchMap((value) => {
      return this.#dadataService.getSuggestion(value).pipe(
        tap((res) => {
          this.isDropdowOpened.set(!!res.length);
        })
      );
    })
  );

  writeValue(city: string | null): void {
    this.innerSearchControl.patchValue(city, {
      emitEvent: false,
    });

    if (!city) {
      return;
    }

    const address = city.split(' ');

    this.addressForm.patchValue({
      city: address[0] || '',
      street: address[1] || '',
      building: address[2] || '',
    });
  }

  setDisabledState(isDisabled: boolean): void {}

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange(value: any): void {}

  onTouched(): void {}

  onSuggestionPick(suggest: DadataSuggestions): void {
    this.isDropdowOpened.set(false);

    // Обновляем форму
    this.addressForm.patchValue({
      city: suggest.data.city,
      street: suggest.data.street,
      building: suggest.data.house,
    });

    // Формируем строку для поля ввода (если нужно объединить поля в строку)
    const newValue = `${suggest.data.city_type || ''}.${
      suggest.data.city || ''
    } ${suggest.data.street_type || ''}.${suggest.data.street || ''} ${
      suggest.data.house_type || ''
    }.${suggest.data.house || ''}`.trim();

    // Обновляем значение в поле ввода
    this.innerSearchControl.setValue(newValue, { emitEvent: false });

    // Вызываем onChange, чтобы уведомить Angular об изменении
    this.onChange(newValue);

    // Принудительно обновляем компонент
    this.cdr.detectChanges();
  }
}
