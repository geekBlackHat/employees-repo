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
  displayItems = [];
  sourceItems = [];
  tableSource; // = new DataTableResource(this.items);  
  itemCount = 0;
  filterText : string = "";

  constructor( public restApiService:RestApiService) {
    this.restApiService.getAllItems('/assets/employees.json').subscribe((res)=>{
      console.log(res);
      this.tableSource = new DataTableResource(res.data);
      this.displayItems = res.data;
      this.sourceItems = Object.assign([], res.data);
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
          this.displayItems = items
        }
      );
    }    
  }

  filterItems(){
    this.displayItems.length = 0;
    this.sourceItems.forEach(element => {      
      if (element.name.toLowerCase().includes(this.filterText.toLowerCase()) || element.address.city.toLowerCase().includes(this.filterText.toLowerCase())) {
        this.displayItems.push(element);
      }
    });
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
