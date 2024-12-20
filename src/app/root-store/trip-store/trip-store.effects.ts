import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { TranslateService } from '@ngx-translate/core';
import { of } from 'rxjs';
import {
  catchError,
  filter,
  map,
  switchMap,
  tap,
  withLatestFrom,
} from 'rxjs/operators';
import { TripStoreSelectors } from '.';
import { TripService } from '../../core';
import {
  HOME_PAGE_URL,
  LocalStorageIds,
  PagedResponse,
  Trip,
} from '../../shared';
import {
  getFromLocalStorage,
  handleError,
  saveToLocalStorage,
} from '../../shared/utils/helpers';
import * as TripsActions from './trip-store.actions';

@Injectable()
export class TripEffect {
  tripsError$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TripsActions.TripsError),
        tap((action) => {
          handleError(action.payload.error, this.translateService);
        })
      ),
    { dispatch: false }
  );

  loadTripsRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripsActions.LoadTripsRequest),
      withLatestFrom(
        this.store$.select(TripStoreSelectors.selectPage),
        this.store$.select(TripStoreSelectors.selectLimit),
        this.store$.select(TripStoreSelectors.selectTitleFilter),
        this.store$.select(TripStoreSelectors.selectSort)
      ),
      switchMap(([, page, limit, titleFilter, sort]) =>
        this.tripService.getTrips({ page, limit, titleFilter, ...sort }).pipe(
          map((response: PagedResponse<Trip>) =>
            TripsActions.LoadTripsSuccess({
              response,
            })
          ),
          catchError((errorResponse) =>
            of(
              TripsActions.TripsError({
                payload: { error: errorResponse },
              })
            )
          )
        )
      )
    )
  );

  loadTripRequest$ = createEffect(() =>
    this.actions$.pipe(
      ofType(TripsActions.LoadTripRequest),
      switchMap((action) =>
        this.tripService.getTripById(action.id).pipe(
          map((trip: Trip) =>
            TripsActions.LoadTripSuccess({
              trip,
            })
          ),
          catchError((errorResponse) =>
            of(
              TripsActions.TripsError({
                payload: { error: errorResponse },
              })
            )
          )
        )
      )
    )
  );

  loadTodayTripRequest$ = createEffect(
    () =>
      this.actions$.pipe(
        ofType(TripsActions.LoadTodayTripRequest),
        tap(() => this.navigateToTodayTripIfExists()),
        filter(() => !getFromLocalStorage(LocalStorageIds.todayTripId)),
        switchMap(() =>
          this.tripService.getRandomTrip().pipe(
            tap((trip: Trip) => this.saveAndNavigateToTrip(trip)),
            catchError((errorResponse) =>
              of(
                TripsActions.TripsError({
                  payload: { error: errorResponse },
                })
              )
            )
          )
        )
      ),
    { dispatch: false }
  );

  private navigateToTodayTripIfExists(): void {
    const todayTripId = getFromLocalStorage(LocalStorageIds.todayTripId);
    if (todayTripId) {
      this.router.navigate([`${HOME_PAGE_URL}/${todayTripId}`]);
    }
  }

  private saveAndNavigateToTrip(trip: Trip): void {
    saveToLocalStorage(LocalStorageIds.todayTripId, trip.id);
    this.router.navigate([`${HOME_PAGE_URL}/${trip.id}`]);
  }

  constructor(
    private store$: Store,
    private actions$: Actions,
    private tripService: TripService,
    private router: Router,
    private translateService: TranslateService
  ) {}
}
