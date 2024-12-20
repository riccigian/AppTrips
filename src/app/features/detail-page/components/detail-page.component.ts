import { ChangeDetectionStrategy, Component, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Store } from '@ngrx/store';
import { Subscription } from 'rxjs';
import { TripStoreActions, TripStoreSelectors } from '../../../root-store';
import { HOME_PAGE_URL, Trip } from '../../../shared';

@Component({
  selector: 'detail-page',
  templateUrl: './detail-page.component.html',
  styleUrls: ['./detail-page.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class DetailPageComponent implements OnDestroy {
  public subs = new Subscription();
  public isLoading$ = this.store$.select(TripStoreSelectors.selectIsLoading);
  public trip: Trip;

  constructor(
    private store$: Store,
    private route: ActivatedRoute,
    private router: Router
  ) {
    this.subs.add(
      this.route.paramMap.subscribe((params) => {
        this.store$.dispatch(
          TripStoreActions.LoadTripRequest({ id: params.get('id') })
        );
      })
    );
    this.subs.add(
      this.store$
        .select(TripStoreSelectors.selectSelectedTrip)
        .subscribe((trip) => {
          this.trip = trip;
        })
    );
  }

  ngOnDestroy(): void {
    this.subs.unsubscribe();
  }

  goToTrips(): void {
    this.router.navigate([HOME_PAGE_URL]);
  }

  public getTripPropertyKeys(trip: Trip): string[] {
    return Object.keys(trip).filter(
      (key) =>
        ![
          'id',
          'title',
          'thumbnailUrl',
          'imageUrl',
          'creationDate',
          'price',
          'description',
        ].includes(key)
    );
  }
}
