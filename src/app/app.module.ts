import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';

import { DataTableModule } from 'angular-4-data-table';

import { RestApiService } from './services/rest-api.service';
import { CheckAlphabetsPipe } from './pipes/check-alphabets.pipe';

@NgModule({
  declarations: [
    AppComponent,
    CheckAlphabetsPipe
  ],
  imports: [
    BrowserModule,
    HttpModule,
    DataTableModule
  ],
  providers: [RestApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
