import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  AbstractControl,
  FormArray,
  FormControl,
  FormGroup,
  FormRecord,
  FormsModule,
  ReactiveFormsModule,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Feature, MockService } from './mock.service';
import { MaskitoDirective } from '@maskito/angular';
import { dateMask, phoneMask, timeMask } from './mask';
import { InputRatingComponent } from '../input-rating/input-rating.component';

enum ReciverEvent {
  CHILD = 'CHILD',
  ADULT = 'ADULT',
}

interface Services {
  nameService?: string;
  costService?: number | null;
}

function getServicesForm(initialValue: Services = {}) {
  return new FormGroup({
    nameService: new FormControl<string>(initialValue.nameService ?? ''),
    costService: new FormControl<number | null>(
      initialValue.costService ?? null
    ),
  });
}

function validateStartWith(forbiddenLetter: string): ValidatorFn {
  return (control: AbstractControl) => {
    return control.value.startsWith(forbiddenLetter)
      ? { startWith: `${forbiddenLetter} последняя буква в алфавите ` }
      : null;
  };
}

function validateDateRange({
  fromControlName,
  toControlName,
}: {
  fromControlName: string;
  toControlName: string;
}) {
  return (control: AbstractControl) => {
    const fromControl = control.get(fromControlName);
    const toControl = control.get(toControlName);

    if (!fromControl || !toControl) return null;

    const fromDate = new Date(fromControl.value);
    const toDate = new Date(toControl.value);

    return fromDate && toDate && fromDate > toDate
      ? { dateRange: { message: 'дата начала не можеть позднее даты конца' } }
      : null;
  };
}

@Component({
  selector: 'app-happy-birtday-form',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MaskitoDirective,
    InputRatingComponent,
  ],
  templateUrl: './happy-birtday-form.component.html',
  styleUrl: './happy-birtday-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HappyBirtdayFormComponent {
  readonly phoneMask = phoneMask;
  readonly dateMask = dateMask;
  readonly timeMask = timeMask;
  ReciverEvent = ReciverEvent;
  mockService = inject(MockService);

  features: Feature[] = [];

  form = new FormGroup({
    type: new FormControl<ReciverEvent>(ReciverEvent.CHILD),
    name: new FormControl<string>('', [
      Validators.required,
      validateStartWith('м'),
    ]),
    lastName: new FormControl<string>(''),
    date: new FormControl<string>(''),
    time: new FormControl<string>(''),
    phone: new FormControl<string>('', [Validators.required]),
    address: new FormGroup({
      city: new FormControl<string>(''),
      street: new FormControl<string>(''),
      building: new FormControl<number | null>(null),
      apartment: new FormControl<number | null>(null),
    }),
    services: new FormArray([getServicesForm()]),
    feature: new FormRecord({}),
    dateRange: new FormGroup(
      {
        from: new FormControl<string>(''),
        to: new FormControl<string>(''),
      },
      validateDateRange({ fromControlName: 'from', toControlName: 'to' })
    ),
  });

  constructor() {
    this.mockService
      .getServices()
      .pipe(takeUntilDestroyed())
      .subscribe((services) => {
        this.form.controls.services.clear({ emitEvent: false });

        for (const service of services) {
          this.form.controls.services.push(getServicesForm(service));
        }
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

    this.form.controls.type.valueChanges
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        console.log(this.form.controls.type.value);
        if (this.form.controls.type.value === 'CHILD') {
          this.form.controls.name.clearValidators();
        }
      });
  }

  onSubmit(event: SubmitEvent): void {
    this.form.markAllAsTouched();
    this.form.updateValueAndValidity();

    if (this.form.invalid) return;

    console.log(this.form.getRawValue());
  }

  addService(): void {
    this.form.controls.services.insert(0, getServicesForm());
  }

  deleteAddres(index: number): void {
    this.form.controls.services.removeAt(index, { emitEvent: false });
  }

  sort = () => 0;

  protected readonly FormControl = FormControl;
  protected readonly getServicesForm = getServicesForm;
}
