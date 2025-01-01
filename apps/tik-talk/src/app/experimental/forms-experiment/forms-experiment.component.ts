import { KeyValuePipe } from '@angular/common';
import { Component, inject } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  FormArray,
  FormBuilder,
  FormControl,
  FormGroup,
  FormRecord,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MockService } from '../mock.service';

enum ReceiverType {
  PERSON = 'PERSON',
  LEGAL = 'LEGAL',
}

interface Address {
  city?: string;
  street?: string;
  house?: number | null;
  apartment?: number | null;
}

interface Feature {
  code: string;
  label: string;
  value: boolean;
}

function getAdressForm(initialValue: Address = {}) {
  return new FormGroup({
    city: new FormControl<string>(initialValue.city ?? ''),
    street: new FormControl<string>(initialValue.street ?? ''),
    house: new FormControl<number | null>(initialValue.house ?? null),
    apartment: new FormControl<number | null>(initialValue.apartment ?? null),
  });
}

import { ChangeDetectionStrategy } from '@angular/core';

@Component({selector: 'app-forms-experiment',
  standalone: true,
  imports: [ReactiveFormsModule, KeyValuePipe],
  templateUrl: './forms-experiment.component.html',
  styleUrl: './forms-experiment.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class FormsExperimentComponent {
  fb = inject(FormBuilder);

  mockService = inject(MockService);

  ReceiverType = ReceiverType;

  features: Feature[] = [];

  form = new FormGroup({
    recipientType: new FormControl<ReceiverType>(ReceiverType.PERSON),
    firstName: new FormControl<string>('', Validators.required),
    lastName: new FormControl<string>(''),
    inn: new FormControl<string>('null'),
    addresses: new FormArray([getAdressForm()]),
    feature: new FormRecord({}),
  });

  // form = this.#fb.group({
  //   recipientType: this.#fb.control<ReceiverType>(ReceiverType.PERSON),
  //   firstName: this.#fb.control<string>('', Validators.required),
  //   lastName: this.#fb.control<string>(''),
  //   inn: this.#fb.control<string>('null'),
  //   address: this.#fb.group({
  //     city: this.#fb.control<string>(''),
  //     street: this.#fb.control<string>(''),
  //     house: this.#fb.control<number | null>(null),
  //     apartment: this.#fb.control<number | null>(null),
  //   })
  // })

  constructor() {
    this.mockService
      .getAddresses()
      .pipe(takeUntilDestroyed())
      .subscribe((addrs) => {
        this.form.controls.addresses.clear();

        for (const addr of addrs) {
          this.form.controls.addresses.push(getAdressForm(addr));
        }

        // this.form.controls.addresses.setControl(1, getAdressForm(addrs[2]))
      });

    this.mockService
      .getFeatures()
      .pipe(takeUntilDestroyed())
      .subscribe((features) => {
        this.features = features;

        for (const feature of features) {
          this.form.controls.feature.addControl(
            feature.code,
            new FormControl(feature.value)
          );
        }
      });

    this.form.controls.recipientType.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe((val) => {
        console.log('type event');
        this.form.controls.inn.clearValidators();
        if (val === ReceiverType.LEGAL) {
          this.form.controls.inn.setValidators([
            Validators.required,
            Validators.minLength(10),
          ]);
        }
      });

    const formPatch = {
      firstName: 'Алеша',
      lastName: 'Gjgjdbx',
    };

    this.form.valueChanges.subscribe((val) => {
      console.log(val);
    });
    //@ts-ignore

    this.form.controls.lastName.disable();
  }

  onSubmit(event: SubmitEvent) {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    console.log(this.form.valid);
    console.log(this.form.value);
  }

  addAdress() {
    this.form.controls.addresses.insert(0, getAdressForm());
  }

  deleteAddress(index: number) {
    this.form.controls.addresses.removeAt(index, { emitEvent: false });
  }

  sort = () => 0;
}
