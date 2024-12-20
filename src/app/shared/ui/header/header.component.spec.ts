import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { BehaviorSubject, Subscription } from 'rxjs';
import { FilterModalComponent } from '.';
import { HeaderComponent } from './header.component';

describe('HeaderComponent', () => {
  let comp: HeaderComponent;
  let fixture: ComponentFixture<HeaderComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [HeaderComponent, FilterModalComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(HeaderComponent);
    comp = fixture.componentInstance;
  }));

  it('should be created', () => {
    expect(comp).toBeDefined();
  });

  it('should have the titleFilter$ as a BehaviorSubject', () => {
    expect(comp.titleFilter$).toBeDefined();
    expect(comp.titleFilter$).toBeInstanceOf(BehaviorSubject);
  });

  it('should have the isFilterMenuOpen closed (false)', () => {
    expect(comp.isFilterMenuOpen).toBeFalsy();
  });

  describe('ngOnInit', () => {
    it('should call the changeFilter event', () => {
      jest.spyOn(comp.changeFilter, 'emit');
      comp.ngOnInit();
      comp.onChangeFilter({ target: { value: 'test' } } as any);
      setTimeout(() => {
        expect(comp.changeFilter.emit).toHaveBeenCalledWith('test');
      }, 550);
    });
  });

  describe('ngOnDestroy', () => {
    it('should call the unsubscribe method', () => {
      comp.subs = new Subscription();
      jest.spyOn(comp.subs, 'unsubscribe');
      comp.ngOnDestroy();
      expect(comp.subs.unsubscribe).toHaveBeenCalled();
    });
  });

  describe('onDocumentClick', () => {
    it('should not call the filterModal method if click is inside menu', () => {
      comp.filterModal = { isOpen: true, toggleModal: jest.fn() } as any;
      const event = new MouseEvent('click', { bubbles: true });
      document.body.innerHTML =
        '<div class="menu"><div class="inside"></div></div>';
      const insideElement = document.querySelector('.inside');
      insideElement?.dispatchEvent(event);
      comp.onDocumentClick(event);
      expect(comp.filterModal.toggleModal).not.toHaveBeenCalled();
    });
  });

  describe('onChangeFilter', () => {
    it('should update titleFilter$ when searchTerm.length > 2', () => {
      jest.spyOn(comp.titleFilter$, 'next');
      comp.onChangeFilter({ target: { value: 'test' } } as any);
      expect(comp.titleFilter$.next).toHaveBeenCalledWith('test');
    });

    it('should update titleFilter$ when searchTerm.length = 0', () => {
      jest.spyOn(comp.titleFilter$, 'next');
      comp.onChangeFilter({ target: { value: '' } } as any);
      expect(comp.titleFilter$.next).toHaveBeenCalledWith('');
    });

    it('should not update titleFilter$ when searchTerm length <= 2', () => {
      jest.spyOn(comp.titleFilter$, 'next');
      comp.onChangeFilter({ target: { value: 'te' } } as any);
      expect(comp.titleFilter$.next).not.toHaveBeenCalled();
    });
  });

  describe('toggleSortAndFilterMenu', () => {
    it('should call filterModal.toggleModal', () => {
      comp.filterModal = { toggleModal: jest.fn() } as any;
      comp.toggleSortAndFilterMenu();
      expect(comp.filterModal.toggleModal).toHaveBeenCalled();
    });
  });
});
