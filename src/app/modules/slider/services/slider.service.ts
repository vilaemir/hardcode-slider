import { Injectable } from '@angular/core';
import { ajax } from 'rxjs/ajax';
import {
  Observable,
  map,
  catchError,
  of,
} from 'rxjs';

import { SliderItem } from '../interfaces/slider-item';

@Injectable({
  providedIn: 'root',
})
export class SliderService {
  private slidesUrl = 'http://localhost:3000/slides';

  constructor() {}

  getSlides(): Observable<SliderItem[]> {
    return ajax<SliderItem[]>(this.slidesUrl).pipe(
      map(({ response }) => response),
      catchError((error) => {
        console.error(error);

        return of(error);
      }),
    );
  }
}
