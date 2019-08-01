import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource, MatSort } from '@angular/material';
import { SelectionModel } from '@angular/cdk/collections';
import periodic from './periodic.json';
import { ExpressionService } from '../services/expression.service.js';

export class PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
  phase: string;
  discoverer: string;

  constructor(name: string, position: number, weight: number, symbol: string, phase: string, discoverer: string) {
    this.name = name;
    this.position = position;
    this.weight = weight;
    this.symbol = symbol;
    this.phase = phase;
    this.discoverer = discoverer;
  }
}

@Component({
  selector: 'app-table',
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.scss']
})
export class TableComponent implements OnInit {

  data: PeriodicElement[];
  displayedColumns: string[] = ['select', 'position', 'name', 'weight', 'symbol', 'phase', 'discoverer'];
  dataSource: MatTableDataSource<PeriodicElement>;
  selection = new SelectionModel<PeriodicElement>(true, []);
  @ViewChild(MatSort, {static: true}) sort: MatSort;

  constructor(private expressionService: ExpressionService) {
    this.data = periodic.elements.map(element => {
      return new PeriodicElement(element.name, element.number, element.atomic_mass, element.symbol, element.phase, element.discovered_by);
    });
    this.dataSource = new MatTableDataSource<PeriodicElement>(this.data);
   }

  ngOnInit() {
    this.dataSource.sort = this.sort;
    this.dataSource.filterPredicate = (data: PeriodicElement, filter: string) => {
      if (!filter) { return true ; }
      try {
        const evaluator = this.expressionService.parse(filter);
        return evaluator.compute(data);
      } catch (err) {
        console.log(err);
        return true;
      }
    };
  }

  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim();
  }

  isAllSelected() {
    const numSelected = this.selection.selected.length;
    const numRows = this.dataSource.data.length;
    return numSelected === numRows;
  }

  masterToggle() {
    this.isAllSelected() ?
        this.selection.clear() :
        this.dataSource.data.forEach(row => this.selection.select(row));
  }

  checkboxLabel(row?: PeriodicElement): string {
    if (!row) {
      return `${this.isAllSelected() ? 'select' : 'deselect'} all`;
    }
    return `${this.selection.isSelected(row) ? 'deselect' : 'select'} row ${row.position + 1}`;
  }

  counter() {
     return 0;
  }

}
