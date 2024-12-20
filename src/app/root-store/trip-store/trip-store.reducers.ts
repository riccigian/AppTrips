import { Action, createReducer, on } from '@ngrx/store';
import { Sort, SortByKeys, SortOrderKeys, Trip } from '../../shared';
import * as TripsActions from './trip-store.actions';

export const tripFeatureKey = 'trips';

export interface State {
  isLoading: boolean;
  trips: Trip[];
  selectedTrip: Trip;
  total: number;
  limit: number;
  page: number;
  titleFilter: string;
  sort: Sort;
}

export const initialState: State = {
  isLoading: false,
  trips: [],
  selectedTrip: null,
  total: 0,
  limit: 10,
  page: 1,
  titleFilter: '',
  sort: { sortBy: SortByKeys.title, sortOrder: SortOrderKeys.ASC },
};

export const tripReducer = createReducer(
  initialState,
  //#region Load Trips
  on(TripsActions.LoadTripsRequest, (state) => ({
    ...state,
    isLoading: true,
    trips: [],
  })),
  on(
    TripsActions.LoadTripsSuccess,
    (state, { response: { items, limit, total, page } }) => ({
      ...state,
      isLoading: false,
      trips: items,
      total,
      limit,
      page,
    })
  ),
  //#endregion
  //#region Load Trip
  on(TripsActions.LoadTripRequest, (state) => ({
    ...state,
    isLoading: true,
    selectedTrip: null,
  })),
  on(TripsActions.LoadTripSuccess, (state, { trip }) => ({
    ...state,
    isLoading: false,
    selectedTrip: trip,
  })),
  //#endregion
  //#region Update Landing Page info
  on(TripsActions.UpdateTitleFilter, (state, { titleFilter }) => ({
    ...state,
    titleFilter,
  })),
  on(TripsActions.UpdatePage, (state, { page }) => ({
    ...state,
    page,
  })),
  on(TripsActions.UpdateLimit, (state, { limit }) => ({
    ...state,
    limit,
  })),
  on(TripsActions.UpdateSort, (state, { sort }) => ({
    ...state,
    sort,
  }))
  //#endregion
);

export function reducer(state: State, action: Action) {
  return tripReducer(state, action);
}
