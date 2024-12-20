import { HttpErrorResponse } from '@angular/common/http';
import { createAction, props } from '@ngrx/store';
import { PagedResponse, Sort, Trip } from '../../shared';

//#region Load Trips
export const LoadTripsRequest = createAction('[Trip] Load Trips Request');
export const LoadTripsSuccess = createAction(
  '[Trip] Load Trips Success',
  props<{
    response: PagedResponse<Trip>;
  }>()
);
export const LoadTripRequest = createAction(
  '[Trip] Load Trip Request',
  props<{ id: string }>()
);
export const LoadTripSuccess = createAction(
  '[Trip] Load Trip Success',
  props<{ trip: Trip }>()
);
export const LoadTodayTripRequest = createAction(
  '[Trip] Load Today Trip Request'
);
//#endregion

//#region Update Landing Page info
export const UpdateTitleFilter = createAction(
  '[Trip] Update Title Filter',
  props<{ titleFilter: string }>()
);
export const UpdatePage = createAction(
  '[Trip] Update Page',
  props<{ page: number }>()
);
export const UpdateLimit = createAction(
  '[Trip] Update Limit',
  props<{ limit: number }>()
);
export const UpdateSort = createAction(
  '[Trip] Update Sort',
  props<{ sort: Sort }>()
);
//#endregion

export const TripsError = createAction(
  '[Trip] Trips Error',
  props<{ payload: { error: HttpErrorResponse } }>()
);
