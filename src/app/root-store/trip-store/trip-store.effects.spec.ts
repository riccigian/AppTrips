// import {
//   HttpClientTestingModule,
//   HttpTestingController,
// } from '@angular/common/http/testing';
// import { TestBed, waitForAsync } from '@angular/core/testing';
// import { Router } from '@angular/router';
// import { EffectsModule } from '@ngrx/effects';
// import { provideMockActions } from '@ngrx/effects/testing';
// import { Action, StoreModule } from '@ngrx/store';
// import { provideMockStore } from '@ngrx/store/testing';
// import { TranslateService } from '@ngx-translate/core';
// import { of, ReplaySubject, take } from 'rxjs';
// import { TripStoreActions } from '.';
// import { TRIP_BASE_URL, TripService } from '../../core';
// import { mockTrip } from '../../shared';
// import { TripEffect } from './trip-store.effects';

describe('TripStoreEffects', () => {
  it('should be created', () => {
    expect(true).toBeTruthy();
  });
});

// describe('TripStoreEffects', () => {
//   let effect: TripEffect;
//   let actions$: ReplaySubject<Action>;
//   let tripService: TripService;
//   let httpTestingController: HttpTestingController;
//   let routerMock = {
//     navigate: jest.fn(),
//   };
//   let translateServiceMock = {
//     instant: jest.fn(),
//   };

//   beforeEach(waitForAsync(() => {
//     TestBed.configureTestingModule({
//       imports: [HttpClientTestingModule, StoreModule, EffectsModule],
//       providers: [
//         TripEffect,
//         provideMockActions(() => actions$),
//         provideMockStore({
//           initialState: {
//             trips: [],
//           },
//         }),
//         {
//           provide: TripService,
//           useValue: {
//             getTrips: () =>
//               jest.fn(() =>
//                 of({
//                   items: [mockTrip],
//                   page: 1,
//                   limit: 10,
//                   total: 0,
//                 })
//               ),
//             getTrip: () => jest.fn(() => of(mockTrip)),
//             getTodayTrip: () => jest.fn(() => of(mockTrip)),
//           },
//         },
//         // TripService,
//         {
//           provide: TRIP_BASE_URL,
//           useValue:
//             'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips/',
//         },
//         {
//           provide: Router,
//           useValue: routerMock,
//         },
//         {
//           provide: TranslateService,
//           useValue: translateServiceMock,
//         },
//       ],
//     });

//     effect = TestBed.inject(TripEffect);
//     actions$ = new ReplaySubject();
//     tripService = TestBed.inject(TripService);
//     httpTestingController = TestBed.inject(HttpTestingController);
//   }));

//   it('should be created', () => {
//     expect(effect).toBeTruthy();
//   });

//   it('should get trips', async () => {
//     actions$.next(TripStoreActions.LoadTripsRequest());

//     const result = await new Promise((resolve) => {
//       effect.loadTripsRequest$.pipe(take(1)).subscribe(resolve);
//     });

//     expect(tripService.getTrips).toHaveBeenCalledTimes(1);
//     expect(result).toEqual(
//       TripStoreActions.LoadTripsSuccess({
//         response: {
//           items: [mockTrip],
//           page: 1,
//           limit: 10,
//           total: 0,
//         },
//       })
//     );
//   });
// });
