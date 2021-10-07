import { Component, OnInit } from '@angular/core';
import { ApiService } from 'src/app/service/api.service';
import { Employee } from 'src/app/model/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {

  Employee:any = [];

  constructor(
    private apiService: ApiService
  ) { 
    this.readEmployee();
  }

  ngOnInit(): void {
  }
  readEmployee() {
    this.apiService.getEmployees().subscribe((data) => {
      this.Employee = data;
    })
  }
  removeEmployee(employee: Employee, index: number) {
    if(window.confirm('Are you sure?')){
      this.apiService.deleteEmployee(index).subscribe((data) => {
        this.Employee.splice(index, 1);
      })
    }
  }
}
