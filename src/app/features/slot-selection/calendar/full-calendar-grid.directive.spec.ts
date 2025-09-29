import { Component } from '@angular/core';
import {
  ComponentFixture,
  TestBed,
  fakeAsync,
  tick,
} from '@angular/core/testing';
import { By } from '@angular/platform-browser';

import { FullCalendarGridDirective } from './full-calendar-grid.directive';

@Component({
  template: `
    <div appFullGrid>
      <table class="mat-calendar-body">
        <tr>
          <td class="mat-calendar-body-cell">
            <div class="mat-calendar-body-cell-content">1</div>
          </td>
          <td class="mat-calendar-body-cell">
            <div class="mat-calendar-body-cell-content">2</div>
          </td>
        </tr>
      </table>
    </div>
  `,
  standalone: true,
  imports: [FullCalendarGridDirective],
})
class TestComponent {}

@Component({
  template: `
    <div appFullGrid>
      <table class="mat-calendar-body">
        <tr>
          <td class="mat-calendar-body-cell">
            <div class="mat-calendar-body-cell-content">30</div>
          </td>
        </tr>
        <tr>
          <td class="mat-calendar-body-cell">
            <div class="mat-calendar-body-cell-content">1</div>
          </td>
          <td class="mat-calendar-body-cell">
            <div class="mat-calendar-body-cell-content">2</div>
          </td>
          <td class="mat-calendar-body-cell">
            <div class="mat-calendar-body-cell-content">3</div>
          </td>
        </tr>
        <tr>
          <td class="mat-calendar-body-cell">
            <div class="mat-calendar-body-cell-content">31</div>
          </td>
        </tr>
      </table>
    </div>
  `,
  standalone: true,
  imports: [FullCalendarGridDirective],
})
class TestMultiRowComponent {}

describe('FullCalendarGridDirective', () => {
  let fixture: ComponentFixture<TestComponent>;
  let directive: FullCalendarGridDirective;

  beforeEach(() => {
    fixture = TestBed.createComponent(TestComponent);
    const debugElement = fixture.debugElement.query(
      By.directive(FullCalendarGridDirective)
    );
    directive = debugElement.injector.get(FullCalendarGridDirective);
  });

  afterEach(() => {
    fixture?.destroy();
  });

  it('should create directive', () => {
    expect(directive).toBeTruthy();
  });

  it('should add empty cells to complete week', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    // Manually trigger the directive logic
    (directive as any).addEmptyCalendarCells();

    const tableBody = fixture.nativeElement.querySelector('.mat-calendar-body');
    const allCells = tableBody.querySelectorAll('td');

    // Should have 7 cells total (2 original + 5 empty)
    expect(allCells.length).toBe(7);

    const emptyCells = tableBody.querySelectorAll(
      '.calendar-custom-empty-cell'
    );
    expect(emptyCells.length).toBe(5);
  }));

  it('should create observer on init', fakeAsync(() => {
    fixture.detectChanges();
    tick();

    (directive as any).setupCalendarObserver();

    const observer = (directive as any).observer;
    expect(observer).toBeTruthy();
  }));

  it('should disconnect observer on destroy', () => {
    const disconnectSpy = jasmine.createSpy('disconnect');
    (directive as any).observer = { disconnect: disconnectSpy };

    directive.ngOnDestroy();

    expect(disconnectSpy).toHaveBeenCalled();
  });

  it('should handle multi-row calendar with leading and trailing cells', fakeAsync(() => {
    const multiRowFixture = TestBed.createComponent(TestMultiRowComponent);
    multiRowFixture.detectChanges();
    tick();

    // Get directive and manually call method
    const multiRowDirective = multiRowFixture.debugElement
      .query(By.directive(FullCalendarGridDirective))
      .injector.get(FullCalendarGridDirective);
    (multiRowDirective as any).addEmptyCalendarCells();

    const tableBody =
      multiRowFixture.nativeElement.querySelector('.mat-calendar-body');
    const rows = tableBody.querySelectorAll('tr');

    // First row (1 cell) should have leading empty cells (6 leading + 1 original = 7)
    const firstRow = rows[0];
    const firstRowCells = firstRow.querySelectorAll('td');
    expect(firstRowCells.length).toBe(7);

    // Last row (1 cell) should have trailing empty cells (1 original + 6 trailing = 7)
    const lastRow = rows[2];
    const lastRowCells = lastRow.querySelectorAll('td');
    expect(lastRowCells.length).toBe(7);

    // Middle row (3 cells) should not be modified
    const middleRow = rows[1];
    const middleRowCells = middleRow.querySelectorAll('td');
    expect(middleRowCells.length).toBe(3);

    multiRowFixture.destroy();
  }));
});
