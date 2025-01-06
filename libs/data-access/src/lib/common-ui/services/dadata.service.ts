import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs';
import { DadataSuggestions } from '@tt/data-access/common-ui/interfaces/dadata.interfaces';

@Injectable({
  providedIn: 'root',
})
export class DadataService {
  #apiUrl =
    'http://suggestions.dadata.ru/suggestions/api/4_1/rs/suggest/address';
  #http = inject(HttpClient);
  #token = 'e93c657f91a76623c124a062f335a742d70962d3';

  getSuggestion(query: string) {
    return this.#http
      .post<{ suggestions: DadataSuggestions[] }>(
        this.#apiUrl,
        { query },
        {
          headers: {
            Authorization: `Token ${this.#token}`,
          },
        }
      )
      .pipe(
        map((res) => {
          return Array.from(
            new Set(
              res.suggestions.map((suggestion) => {
                return suggestion.data.city;
              })
            )
          );
        })
      );
  }
}
