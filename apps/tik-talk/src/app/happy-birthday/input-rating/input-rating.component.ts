import { Component, forwardRef, signal } from '@angular/core';
import { SvgIconComponent } from '@tt/common-ui';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { of } from 'rxjs';

@Component({
  selector: 'app-input-rating',
  standalone: true,
  imports: [SvgIconComponent],
  templateUrl: './input-rating.component.html',
  styleUrl: './input-rating.component.scss',
  providers: [
    {
      provide: NG_VALUE_ACCESSOR,
      multi: true,
      useExisting: forwardRef(() => InputRatingComponent),
    },
  ],
})
export class InputRatingComponent implements ControlValueAccessor {
  activeStar = signal<number>(0);

  registerOnChange(fn: any): void {
    this.onChange = fn; //Из шаблона в модель
  }

  registerOnTouched(fn: any): void {
    this.onChange = fn;
  }

  setDisabledState(isDisabled: boolean): void {}

  writeValue(obj: any): void {}

  onChange() {}

  onTouched() {}

  protected readonly of = of;
}
