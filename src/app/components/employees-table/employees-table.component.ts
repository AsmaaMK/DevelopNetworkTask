import {
  AfterViewInit,
  Component,
  HostListener,
  OnInit,
  ViewChild,
} from '@angular/core';
import { MatTable, MatTableDataSource } from '@angular/material/table';
import { Employee } from 'src/app/models/employee';
import { EmployeesService } from 'src/app/services/employees.service';

@Component({
  selector: 'app-employees-table',
  templateUrl: './employees-table.component.html',
  styleUrls: ['./employees-table.component.scss'],
})
export class EmployeesTableComponent implements AfterViewInit, OnInit {
  @ViewChild(MatTable) table!: MatTable<Employee>;
  dataSource: MatTableDataSource<Employee> = new MatTableDataSource();
  data: Employee[] = [];
  dataLoaded = false;

  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [
    'id',
    'name',
    'employmentDate',
    'experience',
    'salary',
    'department',
  ];

  constructor(private employeesService: EmployeesService) {}

  ngOnInit(): void {
    if (this.employeesService.allEmployeesData.length === 0) {
      this.employeesService.getAllEmployees().subscribe((employees) => {
        this.employeesService.allEmployeesData = employees;
        this.employeesService.filteredEmployeesData.next(employees);
        this.dataLoaded = true;
      });
    } else {
      this.employeesService.filteredEmployeesData.next(
        this.employeesService.allEmployeesData
      );
      this.dataLoaded = true;
    }
  }

  ngAfterViewInit(): void {
    this.employeesService.filteredEmployeesData.subscribe((data) => {
      this.data = data;
      this.dataSource = new MatTableDataSource(this.data);
    });

    this.possitionHeader();
  }

  @HostListener('window:resize', ['$event'])
  possitionHeader() {
    const table = document.getElementById('table');
    const headerRow = <HTMLElement>document.querySelector('tr.mat-header-row');

    if (window.innerWidth < 1000) {
      if (headerRow && table) {
        table.style.marginTop = headerRow.offsetHeight + 'px';
        headerRow.style.marginTop = `-${headerRow.offsetHeight}px`;
      }
    } else if (headerRow && table) {
      table.style.marginTop = '0px';
      headerRow.style.marginTop = '0px';
    }
  }
}
