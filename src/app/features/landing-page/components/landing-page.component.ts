import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { combineLatest, Subscription } from 'rxjs';
import { TripStoreActions, TripStoreSelectors } from '../../../root-store';
import { HOME_PAGE_URL, Sort } from '../../../shared';

@Component({
  selector: 'landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LandingPageComponent implements OnDestroy {
  public subs = new Subscription();
  public trips$ = this.store$.select(TripStoreSelectors.selectAllTrips);
  public isLoading$ = this.store$.select(TripStoreSelectors.selectIsLoading);
  public titleFilter$ = this.store$.select(
    TripStoreSelectors.selectTitleFilter
  );
  public paginationTotal$ = this.store$.select(TripStoreSelectors.selectTotal);
  public currentPage$ = this.store$.select(TripStoreSelectors.selectPage);
  public paginationLimit$ = this.store$.select(TripStoreSelectors.selectLimit);
  public sort$ = this.store$.select(TripStoreSelectors.selectSort);

  constructor(private store$: Store, private router: Router) {
    this.subs.add(
      combineLatest([
        this.titleFilter$,
        this.currentPage$,
        this.paginationLimit$,
        this.sort$,
      ]).subscribe(() => {
        this.store$.dispatch(TripStoreActions.LoadTripsRequest());
      })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  onChangePage(page: number): void {
    this.store$.dispatch(TripStoreActions.UpdatePage({ page }));
    this.scrollToTop();
  }

  onChangeLimit(limit: number): void {
    this.store$.dispatch(TripStoreActions.UpdateLimit({ limit }));
    this.scrollToTop();
  }

  onChangeFilter(titleFilter: string): void {
    this.store$.dispatch(TripStoreActions.UpdateTitleFilter({ titleFilter }));
    this.scrollToTop();
  }

  onChangeSort(sort: Sort): void {
    this.store$.dispatch(TripStoreActions.UpdateSort({ sort }));
    this.scrollToTop();
  }

  onClickTodayTrip(): void {
    this.store$.dispatch(TripStoreActions.LoadTodayTripRequest());
  }

  onTripSelected(id: string): void {
    this.router.navigate([`${HOME_PAGE_URL}/${id}`]);
  }

  private scrollToTop(): void {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }
}
