import { first } from 'rxjs';
import { TripListComponent } from '.';

describe('TripListComponent', () => {
  const comp = new TripListComponent();

  it('should be created', () => {
    expect(comp).toBeDefined();
  });

  it('should emit the changePage event', () => {
    const page: number = 2;
    comp.currentPage = page;

    comp.changePage
      .pipe(first())
      .subscribe((selectedPage: number) => expect(selectedPage).toBe(page));
    comp.changePage.emit(page);
  });

  it('should emit the changeLimit event', () => {
    const limit: number = 10;
    comp.paginationLimit = limit;

    comp.changeLimit
      .pipe(first())
      .subscribe((selectedLimit: number) => expect(selectedLimit).toBe(limit));
    comp.changeLimit.emit(limit);
  });

  it('should emit the tripSelected event', () => {
    const tripId: string = '1';

    comp.tripSelected
      .pipe(first())
      .subscribe((selectedTripId: string) =>
        expect(selectedTripId).toBe(tripId)
      );
    comp.tripSelected.emit(tripId);
  });
});
