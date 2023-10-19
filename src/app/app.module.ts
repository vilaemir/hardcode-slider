import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { SliderModule } from './modules/slider/slider.module';
import { RouterModule } from '@angular/router';
import { SliderComponent } from './modules/slider/components/slider.component';

@NgModule({
  declarations: [AppComponent],
  imports: [
    BrowserModule,
    SliderModule,
    RouterModule.forRoot([{ path: '', component: SliderComponent }]),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
