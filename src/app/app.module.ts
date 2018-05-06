import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpModule } from '@angular/http';
import { AppComponent } from './app.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { DataTableModule } from 'angular-4-data-table';
import { RouterModule } from '@angular/router';

import { RestApiService } from './services/rest-api.service';
import { CheckAlphabetsPipe } from './pipes/check-alphabets.pipe';
import { ManageEmployeesComponent } from './components/manage-employees/manage-employees.component';
import { ListEmployeesComponent } from './components/list-employees/list-employees.component';

@NgModule({
  declarations: [
    AppComponent,
    CheckAlphabetsPipe,
    ManageEmployeesComponent,
    ListEmployeesComponent
  ],
  imports: [
    BrowserModule,
    HttpModule,
    DataTableModule,
    FormsModule,
    ReactiveFormsModule,
    RouterModule.forRoot([
      { path: '', redirectTo: 'employees', pathMatch: 'full' },
      { path: 'employees/:id/edit', component: ManageEmployeesComponent },
      { path: 'employees/add', component: ManageEmployeesComponent },
      { path: 'employees', component: ListEmployeesComponent },      
      { path: '**', redirectTo: 'employees' }
    ], {useHash:true})
  ],
  providers: [RestApiService],
  bootstrap: [AppComponent]
})
export class AppModule { }
