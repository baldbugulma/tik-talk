import { Component, forwardRef, inject, signal } from '@angular/core';
import {
  ControlValueAccessor,
  FormControl,
  NG_VALUE_ACCESSOR,
  ReactiveFormsModule,
} from '@angular/forms';
import { TtInputComponent } from '../tt-input/tt-input.component';
import { DadataService } from '@tt/data-access/common-ui';
import { debounceTime, switchMap, tap } from 'rxjs';
import { AsyncPipe } from '@angular/common';

@Component({
  selector: 'tt-address-input',
  standalone: true,
  imports: [TtInputComponent, AsyncPipe, ReactiveFormsModule],
  templateUrl: './address-input.component.html',
  styleUrl: './address-input.component.css',
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

  setDisabledState(isDisabled: boolean): void {}

  writeValue(city: string | null): void {
    this.innerSearchControl.patchValue(city, {
      emitEvent: false,
    });
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  onChange(value: any): void {}

  onTouched(): void {}

  onSuggestionPick(city: string): void {
    this.isDropdowOpened.set(false);
    this.innerSearchControl.patchValue(city, {
      emitEvent: false,
    });
    this.onChange(city);
    console.log(city);
  }
}
