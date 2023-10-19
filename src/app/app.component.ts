import { Component, OnInit } from '@angular/core';

import { SliderItem } from './modules/slider/interfaces/slider-item';
import { SliderService } from './modules/slider/services/slider.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-root',
  template: `
    <app-slider
      id="slider"
      [items]="slides$"
      [displayTime]="3000"
      [slidesToShow]="1"
    ></app-slider>
  `,
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  title = 'hardcode-slider';

  slides$: Observable<SliderItem[]> = new Observable();

  ngOnInit() {
    this.slides$ = this.sliderService.getSlides();
  }

  constructor(public sliderService: SliderService) {}
}
