import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';

import { AppComponent } from './app.component';

import { HorizontalSliderModule } from "./../components/horizontal-slider/horizontal-slider.module";

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    HttpModule,
    HorizontalSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
