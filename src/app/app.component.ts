import { Component } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { RestApiService } from './services/rest-api.service';
import { Http, Headers, Response } from '@angular/http';

import { DataTableResource } from 'angular-4-data-table';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  items = [];
  tableSource; // = new DataTableResource(this.items);  
  itemCount = 0;

  constructor( public restApiService:RestApiService) {
    this.restApiService.getAllItems('/assets/employees.json').subscribe((res)=>{
      console.log(res);
      this.tableSource = new DataTableResource(res.data);
      this.items = res.data;
      this.tableSource.count().then( 
        (count) => {
          this.itemCount = count
        }
      );
    })
  }

  reloadItems(params) {
    if (this.tableSource) {
      this.tableSource.query(params).then(
        (items) => {
          this.items = items
        }
      );
    }    
  }

  // special properties:
  rowClick(rowEvent) {
    console.log('Clicked: ' + rowEvent.row.item.name);
  }

  rowDoubleClick(rowEvent) {
    alert('Double clicked: ' + rowEvent.row.item.name);
  }

  rowTooltip(item) { return item.jobTitle; }
}
