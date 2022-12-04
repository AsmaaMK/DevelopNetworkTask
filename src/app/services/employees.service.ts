import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, map, Observable } from 'rxjs';
import { EmployeeSchema } from '../models/employee-schema';
import { Employee } from '../models/employee';
import { FilterEmployees } from '../models/employee-filter';

@Injectable({
  providedIn: 'root',
})
export class EmployeesService {
  apiUrl = environment.apiUrl;

  allEmployeesData: Employee[] = [];
  filteredEmployeesData: BehaviorSubject<Employee[]> = new BehaviorSubject(
    <Employee[]>[]
  );

  constructor(private http: HttpClient) {}

  getAllEmployees(): Observable<Employee[]> {
    return this.http.get<EmployeeSchema[]>(`${this.apiUrl}/Employees`).pipe(
      map((employees) => {
        const employeesData: Employee[] = [];

        employees.forEach((employee) => {
          employeesData.push({
            ...employee,
            name: employee.firstName + ' ' + employee.lastName,
            employmentDate: new Date(employee.employmentDate),
          });
        });

        return employeesData;
      })
    );
  }

  getEmployeeByID(id: number): Observable<Employee> {
    return this.http.get<EmployeeSchema>(`${this.apiUrl}/Employees/${id}`).pipe(
      map((employee) => {
        return {
          ...employee,
          name: employee.firstName + ' ' + employee.lastName,
          employmentDate: new Date(employee.employmentDate),
        };
      })
    );
  }

  filterEmployees(filter: FilterEmployees) {
    this.filteredEmployeesData.next(
      this.allEmployeesData.filter((employee) => {
        return (
          (filter.name ? employee.name.includes(filter.name.trim()) : true) &&
          (filter.department
            ? employee.department.includes(filter.department)
            : true) &&
          (filter.experience.length
            ? filter.experience.includes(employee.experience)
            : true) &&
          (filter.salary ? employee.salary === filter.salary : true) &&
          this.theSameDate(
            new Date(employee.employmentDate),
            filter.employmentDate
          )
        );
      })
    );
  }

  private theSameDate(date1: Date, date2: Date): boolean {
    if (!date1 || !date2) {
      return true;
    }

    return (
      date1.getFullYear() === date2.getFullYear() &&
      date1.getMonth() === date2.getMonth() &&
      date1.getDate() === date2.getDate()
    );
  }
}
