import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { RestApiService } from '../../services/rest-api.service';
import { Http, Headers, Response } from '@angular/http';
import { Router } from '@angular/router';

import { DataTableResource } from 'angular-4-data-table';


@Component({
  selector: 'app-list-employees',
  templateUrl: './list-employees.component.html',
  styleUrls: ['./list-employees.component.css']
})

export class ListEmployeesComponent implements OnInit {

  displayItems = [];
  sourceItems = [];
  tableSource; // = new DataTableResource(this.items);  
  itemCount = 0;
  filterText: string = "";

  constructor(public restApiService: RestApiService, public router: Router) {
    this.restApiService.getAllItems('/assets/employees.json').subscribe((res) => {
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

  ngOnInit () {
    
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

  filterItems() {
    this.displayItems.length = 0;
    this.sourceItems.forEach(element => {
      if (element.name.toLowerCase().includes(this.filterText.toLowerCase()) || element.address.city.toLowerCase().includes(this.filterText.toLowerCase())) {
        this.displayItems.push(element);
      }
    });
  }

  editEmployee(employee){
    console.log(employee);
    let navigateTo = '/employees/'+employee.id+'/edit';
    this.router.navigateByUrl(navigateTo);
  }
}
