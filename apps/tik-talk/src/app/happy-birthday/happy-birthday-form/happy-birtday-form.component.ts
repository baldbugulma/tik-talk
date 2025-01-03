import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  FormArray,
  FormControl,
  FormGroup,
  FormRecord,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Feature, MockService } from './mock.service';

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

@Component({
  selector: 'app-happy-birtday-form',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule],
  templateUrl: './happy-birtday-form.component.html',
  styleUrl: './happy-birtday-form.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HappyBirtdayFormComponent {
  ReciverEvent = ReciverEvent;
  mockService = inject(MockService);

  features: Feature[] = [];

  form = new FormGroup({
    type: new FormControl<ReciverEvent>(ReciverEvent.CHILD),
    name: new FormControl<string>('', [
      Validators.required,
      Validators.minLength(3),
    ]),
    lastName: new FormControl<string>(''),
    address: new FormGroup({
      city: new FormControl<string>(''),
      street: new FormControl<string>(''),
      building: new FormControl<number | null>(null),
      apartment: new FormControl<number | null>(null),
    }),
    services: new FormArray([getServicesForm()]),
    feature: new FormRecord({}),
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
