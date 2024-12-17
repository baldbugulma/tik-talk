import {Component, effect, inject} from '@angular/core';
import {
  Form,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';

import { debounceTime, startWith, switchMap } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {profileActions, ProfileService, selectFilters} from "@tt/profile";
import {Store} from "@ngrx/store";

@Component({
  selector: 'app-profile-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
})
export class ProfileFiltersComponent {
  fb = inject(FormBuilder);
  store = inject(Store)

  selectFilters = this.store.selectSignal(selectFilters)

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  })

  constructor() {
    const filters = this.selectFilters();
    console.log(filters)
    if (filters) {
      this.searchForm.patchValue(filters, { emitEvent: false });
    }
    const startValue = filters ? filters : {}

    this.searchForm.valueChanges
      .pipe(
        startWith(startValue),
        debounceTime(300),
      )
      .subscribe(formValue => {
        // При каждом изменении значений формы запускаем action `filterEvents`
        // с текущими значениями формы в качестве фильтров.
        this.store.dispatch(profileActions.filterEvents({filters: formValue}));
      });
  }
}
