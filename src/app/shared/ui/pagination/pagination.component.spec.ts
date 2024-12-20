import { ComponentFixture, TestBed, waitForAsync } from '@angular/core/testing';
import { TranslateModule } from '@ngx-translate/core';
import { first } from 'rxjs';
import { PaginationComponent } from '.';

describe('PaginationComponent', () => {
  let component: PaginationComponent;
  let fixture: ComponentFixture<PaginationComponent>;

  beforeEach(waitForAsync(() => {
    TestBed.configureTestingModule({
      declarations: [PaginationComponent],
      imports: [TranslateModule.forRoot()],
    }).compileComponents();

    fixture = TestBed.createComponent(PaginationComponent);
    component = fixture.componentInstance;
  }));

  it('should be created', () => {
    expect(component).toBeDefined();
  });

  describe('ngOnInit', () => {
    it('should calculate the number of pages (10)', () => {
      component.total = 100;
      component.limit = 10;
      component.ngOnInit();
      expect(component.pagesCount).toBe(10);
    });

    it('should calculate the number of pages (11)', () => {
      component.total = 101;
      component.limit = 10;
      component.ngOnInit();
      expect(component.pagesCount).toBe(11);
    });
  });

  describe('EventEmitter', () => {
    it('should emit the changePage event', () => {
      const page: number = 2;
      component.currentPage = page;

      component.changePage
        .pipe(first())
        .subscribe((selectedPage: number) => expect(selectedPage).toBe(page));
      component.changePage.emit(page);
    });

    it('should emit the changeLimit event', () => {
      const limit: number = 10;
      component.limit = limit;

      component.changeLimit
        .pipe(first())
        .subscribe((selectedLimit: number) =>
          expect(selectedLimit).toBe(limit)
        );
      component.changeLimit.emit(limit);
    });

    it('should emit the changeLimit event via onLimitChange', () => {
      const limit: number = 10;
      component.limit = limit;

      component.changeLimit
        .pipe(first())
        .subscribe((selectedLimit: number) =>
          expect(selectedLimit).toBe(limit)
        );

      component.onLimitChange({ target: { value: limit } } as any);
    });
  });
});
