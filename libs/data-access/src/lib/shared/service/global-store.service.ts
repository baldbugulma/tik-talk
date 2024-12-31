import { Injectable, signal } from '@angular/core';
import { Profile } from 'libs/data-access/src';

@Injectable({
  providedIn: 'root',
})
export class GlobalStoreService {
  me = signal<Profile | null>(null);
}
