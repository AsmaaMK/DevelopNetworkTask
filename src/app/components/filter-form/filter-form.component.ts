import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { EmployeesService } from 'src/app/services/employees.service';
import inputFieldsData from './input-fields.json';

@Component({
  selector: 'app-filter-form',
  templateUrl: './filter-form.component.html',
  styleUrls: ['./filter-form.component.scss'],
})
export class FilterFormComponent implements OnInit {
  filterForm!: FormGroup;
  departmentsOptions!: string[];
  experienceOptions!: string[];
  panelOpenState = false;

  constructor(private employeesService: EmployeesService) {}

  ngOnInit(): void {
    this.filterForm = new FormGroup({
      name: new FormControl(''),
      department: new FormControl(''),
      experience: new FormControl([]),
      salary: new FormControl(),
      employmentDate: new FormControl(),
    });

    this.departmentsOptions = inputFieldsData.departments;
    this.experienceOptions = inputFieldsData.experience;
  }

  filterEmployees() {
    let filter = this.filterForm.value;
    console.log(filter);
    this.employeesService.filterEmployees(filter);
  }

  clearFilters() {
    this.filterForm.setValue({
      name: '',
      department: '',
      experience: [],
      salary: null,
      employmentDate: null,
    });

    this.employeesService.filteredEmployeesData.next([
      ...this.employeesService.allEmployeesData,
    ]);
  }
}
