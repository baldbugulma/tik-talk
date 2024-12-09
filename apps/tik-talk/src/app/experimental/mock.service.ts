import { Injectable } from '@angular/core';
import { of } from 'rxjs';
@Injectable({
  providedIn: 'root',
})
export class MockService {
  getAddresses() {
    return of([
      {
        city: 'Москва',
        street: 'Тверская',
        house: 12,
        apartment: 45,
      },
      {
        city: 'Санкт-Петербург',
        street: 'Невский проспект',
        house: 32,
        apartment: 16,
      },
      {
        city: 'Новосибирск',
        street: 'Красный проспект',
        house: 10,
        apartment: 27,
      },
      {
        city: 'Екатеринбург',
        street: 'Ленина',
        house: 5,
        apartment: 11,
      },
    ]);
  }

  getFeatures() {
    return of([
      {
        code: 'lift',
        label: 'Подъем на этаж',
        value: true,
      },
      {
        code: 'strong-package',
        label: 'Усиленная упаковка',
        value: true,
      },
      {
        code: 'fast',
        label: 'Ускоренная доставка',
        value: false,
      },
    ]);
  }

  constructor() {}
}
