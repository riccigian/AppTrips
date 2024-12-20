import { TripStoreActions } from '.';
import { mockTrip } from '../../shared';
import {
  State,
  initialState as initialTripState,
  tripReducer,
} from './trip-store.reducers';

describe('TripStoreReducer', () => {
  let initialState: State;

  beforeEach(() => {
    initialState = { ...initialTripState };
  });

  it('should change state when LoadTrips', () => {
    const result = tripReducer(
      initialState,
      TripStoreActions.LoadTripsRequest()
    );

    expect(result).toEqual({
      isLoading: true,
      trips: [],
      limit: 10,
      page: 1,
      selectedTrip: null,
      sort: {
        sortBy: 'title',
        sortOrder: 'ASC',
      },
      titleFilter: '',
      total: 0,
    });
  });

  it('should change state when LoadTripsSuccess', () => {
    const response = {
      items: [mockTrip],
      page: 1,
      limit: 10,
      total: 0,
    };
    const result = tripReducer(
      initialState,
      TripStoreActions.LoadTripsSuccess({
        response,
      })
    );
    expect(result).toEqual({
      isLoading: false,
      trips: response.items,
      limit: 10,
      page: 1,
      selectedTrip: null,
      sort: {
        sortBy: 'title',
        sortOrder: 'ASC',
      },
      titleFilter: '',
      total: 0,
    });
  });
});
