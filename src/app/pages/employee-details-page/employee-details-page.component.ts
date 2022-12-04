import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Employee } from 'src/app/models/employee';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employee-details-page',
  templateUrl: './employee-details-page.component.html',
  styleUrls: ['./employee-details-page.component.scss'],
})
export class EmployeeDetailsPageComponent implements OnInit {
  data!: Employee;
  
  constructor(
    private employeesService: EmployeesService,
    private router: Router
  ) {}

  ngOnInit(): void {
    const employeeId: number = +this.router.url.split('/')[2];
    this.employeesService.getEmployeeByID(employeeId).subscribe((data) => {
      this.data = data;
    });
  }
}
