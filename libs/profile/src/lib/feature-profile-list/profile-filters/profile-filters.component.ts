import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';

import { debounceTime, startWith } from 'rxjs';

import { Store } from '@ngrx/store';
import { selectFilters } from '@tt/data-access/profile/store/selector';
import { profileActions } from '@tt/data-access/profile/store/action';

import { ChangeDetectionStrategy } from '@angular/core';

@Component({selector: 'app-profile-filters',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './profile-filters.component.html',
  styleUrl: './profile-filters.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ProfileFiltersComponent {
  fb = inject(FormBuilder);
  store = inject(Store);

  selectFilters = this.store.selectSignal(selectFilters);

  searchForm = this.fb.group({
    firstName: [''],
    lastName: [''],
    stack: [''],
  });

  constructor() {
    const filters = this.selectFilters();
    console.log(filters);
    if (filters) {
      this.searchForm.patchValue(filters, { emitEvent: false });
    }
    const startValue = filters ? filters : {};

    this.searchForm.valueChanges
      .pipe(startWith(startValue), debounceTime(300))
      .subscribe((formValue) => {
        // При каждом изменении значений формы запускаем action `filterEvents`
        // с текущими значениями формы в качестве фильтров.
        this.store.dispatch(
          profileActions.filterEvents({ filters: formValue })
        );
      });
  }
}
