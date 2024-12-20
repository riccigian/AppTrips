import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { SortByKeys, SortOrderKeys } from '../../..';
import { FilterModalComponent } from './filter-modal.component';

describe('FilterModalComponent', () => {
  let component: FilterModalComponent;
  let fixture: ComponentFixture<FilterModalComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [FilterModalComponent],
    }).compileComponents();

    fixture = TestBed.createComponent(FilterModalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  }));

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('toggleModal', () => {
    it('should toggle modal open state', () => {
      component.toggleModal();
      expect(component.isOpen).toBeTruthy();
      component.toggleModal();
      expect(component.isOpen).toBeFalsy();
    });
  });

  describe('onDocumentClick', () => {
    it('should close sortByMenu when clicking outside', () => {
      component.isOpen = true;
      component.isSortByMenuOpen = true;
      const event = new MouseEvent('click', { bubbles: true });
      document.body.innerHTML = '<div id="outside"></div>';
      const outsideElement = document.querySelector('#outside');
      outsideElement?.dispatchEvent(event);
      component.onDocumentClick(event);
      expect(component.isSortByMenuOpen).toBeFalsy();
    });

    it('should not close sortByMenu when clicking inside', () => {
      component.isOpen = true;
      component.isSortByMenuOpen = true;
      const event = new MouseEvent('click', { bubbles: true });
      document.body.innerHTML = '<div id="sortByButton"></div>';
      const insideElement = document.querySelector('#sortByButton');
      insideElement?.dispatchEvent(event);
      component.onDocumentClick(event);
      expect(component.isSortByMenuOpen).toBeTruthy();
    });
  });

  describe('onSortByChange', () => {
    it('should change sortBy criteria', () => {
      component.onSortByChange(SortByKeys.price);
      expect(component.sortAndFilterInfo.sortBy).toBe(SortByKeys.price);
      expect(component.isConfirmButtonDisabled).toBeFalsy();
    });
  });

  describe('onSortOrderChange', () => {
    it('should toggle sortOrder', () => {
      component.onSortOrderChange();
      expect(component.sortAndFilterInfo.sortOrder).toBe(SortOrderKeys.DESC);
      component.onSortOrderChange();
      expect(component.sortAndFilterInfo.sortOrder).toBe(SortOrderKeys.ASC);
      expect(component.isConfirmButtonDisabled).toBeFalsy();
    });
  });

  describe('confirm', () => {
    it('should emit changeSort event on confirm', () => {
      jest.spyOn(component.changeSort, 'emit');
      component.sortAndFilterInfo = {
        sortBy: SortByKeys.price,
        sortOrder: SortOrderKeys.DESC,
      };
      component.confirm();
      expect(component.changeSort.emit).toHaveBeenCalledWith({
        sortBy: SortByKeys.price,
        sortOrder: SortOrderKeys.DESC,
      });
      expect(component.isConfirmButtonDisabled).toBeTruthy();
    });
  });
});
