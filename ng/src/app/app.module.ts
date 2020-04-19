import { NgModule } from '@angular/core';
import { BrowserModule }  from '@angular/platform-browser';

import { AppComponent } from './app.component';
import { ChordComponent } from './chord.component';
import { ToneComponent } from './tone.component';
import { TuningComponent } from './tuning.component';

@NgModule({
  imports: [
    BrowserModule
  ],
  declarations: [
    AppComponent,
    ChordComponent,
    ToneComponent,
    TuningComponent
  ],
  providers: [
  ],
  bootstrap: [ AppComponent ]
})
export class AppModule { }
