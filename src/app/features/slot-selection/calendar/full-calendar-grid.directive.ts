import { Directive, ElementRef, AfterViewInit, OnDestroy } from '@angular/core';
import { daysInWeek } from 'date-fns/constants';

@Directive({
  selector: '[appFullGrid]',
})
export class FullCalendarGridDirective implements AfterViewInit, OnDestroy {
  private observer?: MutationObserver;
  private isProcessing = false;

  constructor(private el: ElementRef<HTMLElement>) {}

  ngAfterViewInit() {
    requestAnimationFrame(() => {
      this.addEmptyCalendarCells();
      this.setupCalendarObserver();
    });
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }

  private setupCalendarObserver() {
    this.observer = new MutationObserver(mutations => {
      if (this.isProcessing) {
        return;
      }

      // Only process if there are mutations not caused by our empty cells
      const hasRelevantChanges = mutations.some(mutation => {
        const addedNodes = Array.from(mutation.addedNodes);
        const removedNodes = Array.from(mutation.removedNodes);

        // Ignore changes that only involve our empty cells
        const onlyEmptyCells = [...addedNodes, ...removedNodes].every(node => {
          return (
            node instanceof Element &&
            node.classList?.contains('calendar-custom-empty-cell')
          );
        });

        return !onlyEmptyCells;
      });

      if (hasRelevantChanges) {
        this.addEmptyCalendarCells();
      }
    });

    this.observer.observe(this.el.nativeElement, {
      childList: true,
      subtree: true,
    });
  }

  private addEmptyCalendarCells(): boolean {
    if (this.isProcessing) {
      return false;
    }

    this.isProcessing = true;

    let tableBody = this.el.nativeElement.querySelector('.mat-calendar-body');

    if (!tableBody) {
      this.isProcessing = false;
      return false;
    }

    const rows = tableBody.querySelectorAll('tr');
    if (rows.length === 0) {
      this.isProcessing = false;
      return false;
    }

    // Remove existing empty cells and labels
    rows.forEach(row => {
      row
        .querySelectorAll('.mat-calendar-body-label')
        .forEach(label => label.remove());
      row
        .querySelectorAll('.calendar-custom-empty-cell')
        .forEach(cell => cell.remove());
    });

    // Find first and last rows with data cells
    const rowsWithData = Array.from(rows).filter(
      row =>
        row.querySelectorAll(
          '.mat-calendar-body-cell:not(.calendar-custom-empty-cell)'
        ).length > 0
    );

    if (rowsWithData.length === 0) {
      this.isProcessing = false;
      return false;
    }

    // Add leading empty cells to first row
    this.addEmptyCells(rowsWithData[0], 'leading');

    // Add trailing empty cells to last row
    this.addEmptyCells(rowsWithData[rowsWithData.length - 1], 'trailing');

    this.isProcessing = false;
    return true;
  }

  private addEmptyCells(row: Element, position: 'leading' | 'trailing') {
    const allCells = row.querySelectorAll('td');
    const needed = daysInWeek - allCells.length;

    if (needed <= 0) {
      return;
    }

    const templateCell =
      position === 'leading'
        ? (allCells[0] as HTMLElement)
        : (allCells[allCells.length - 1] as HTMLElement);

    if (!templateCell) {
      return;
    }

    const fragment = document.createDocumentFragment();

    for (let i = 0; i < needed; i++) {
      const emptyCell = this.createEmptyCell(templateCell);
      fragment.appendChild(emptyCell);
    }

    if (position === 'leading') {
      row.insertBefore(fragment, templateCell);
    } else {
      row.appendChild(fragment);
    }
  }

  private createEmptyCell(templateCell: HTMLElement): HTMLElement {
    const emptyCell = templateCell.cloneNode(true) as HTMLElement;
    emptyCell.classList.add('calendar-custom-empty-cell');

    const contentElement = emptyCell.querySelector(
      '.mat-calendar-body-cell-content'
    );
    if (contentElement) {
      contentElement.textContent = '';
      contentElement.removeAttribute('aria-label');
    }

    return emptyCell;
  }
}
