import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators, FormControl } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';

import { RestApiService } from '../../services/rest-api.service';
import { Employee } from '../../models/employee';


@Component({
  selector: 'app-manage-employees',
  templateUrl: './manage-employees.component.html',
  styleUrls: ['./manage-employees.component.css']
})
export class ManageEmployeesComponent implements OnInit {

  employeeForm: FormGroup;
  currentFunctionality : string = "";
  employeeId : string = "";

  constructor(private restApiService: RestApiService,
    private route: ActivatedRoute, private router: Router,) {
      this.route.params.subscribe(params => {
        if (params.id != undefined) {
          this.getEmployeeData(params.id);
          this.currentFunctionality = "Update";
          this.employeeId = params.id;
        }
        else {
          this.currentFunctionality = "Add";
        }
      });
  }

  ngOnInit() {
    this.employeeForm = new FormGroup({
      name: new FormControl('', [Validators.required, Validators.minLength(4)]),
      phone: new FormControl('', [Validators.required, Validators.pattern('^(0|[1-9][0-9]*)$')]),
      address: new FormGroup({
        city: new FormControl(''),
        address_line1: new FormControl(''),
        address_line2: new FormControl(''),
        postal_code: new FormControl('')
      })
    });    
  }
 
  submitForm(){
    console.log(this.employeeForm.value);
    
    if(this.employeeForm.status == "INVALID") {
      return;
    }

    if(this.currentFunctionality == "Update") {
      this.updateEmployee(this.employeeForm.value);
    }
    else {
      this.addEmployee(this.employeeForm.value);
    }
  }

  addEmployee(employee){
    this.restApiService.postData('/add', employee).subscribe((res) => {
      //handle server response
    })
  }

  updateEmployee(employee){
    employee['id'] = this.employeeId;
    this.restApiService.postData('/updateEmployee',employee).subscribe((res)=>{
      //handle server response
    })
  }

  getEmployeeData(id){
    this.restApiService.getItemById('/assets/employees.json',id).subscribe((res)=>{
      console.log(res);
      delete res.id;
      this.employeeForm.setValue(res);
    });
  }

}
