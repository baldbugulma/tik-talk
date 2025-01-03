import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

export interface Feature {
  code: string;
  label: string;
  value: boolean;
}

@Injectable({
  providedIn: 'root',
})
export class MockService {
  getServices() {
    return of([
      {
        nameService: 'Украшение зала',
        costService: 10000,
      },
      {
        nameService: 'Фотосессия',
        costService: 15000,
      },
      {
        nameService: 'Живая музыка',
        costService: 20000,
      },
      {
        nameService: 'Выездной банкет',
        costService: 25000,
      },
      {
        nameService: 'Шоу мыльных пузырей',
        costService: 8000,
      },
    ]);
  }

  getFeatures(): Observable<Feature[]> {
    return of([
      {
        code: 'firework',
        label: 'Салют',
        value: true,
      },
      {
        code: 'striptease',
        label: 'Стриптиз',
        value: false,
      },
      {
        code: 'animator',
        label: 'Аниматор',
        value: true,
      },
      {
        code: 'magician',
        label: 'Фокусник',
        value: false,
      },
      {
        code: 'karaoke',
        label: 'Караоке',
        value: true,
      },
    ]);
  }

  constructor() {}
}
