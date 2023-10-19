import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SliderComponent } from './components/slider.component';

@NgModule({
  declarations: [SliderComponent],
  imports: [CommonModule],
  providers: [],
  exports: [SliderComponent],
})
export class SliderModule {}
