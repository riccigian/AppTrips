import { HttpErrorResponse } from '@angular/common/http';
import { TripStoreActions } from '.';
import { mockTrip, PagedResponse, Trip } from '../../shared';

describe('TripStoreActions', () => {
  describe('LoadTripsRequest', () => {
    it('should create an action to load trips', () => {
      const expectedAction = {
        type: TripStoreActions.LoadTripsRequest.type,
      };
      const action = TripStoreActions.LoadTripsRequest();
      expect(action).toEqual(expectedAction);
    });
  });

  describe('LoadTripsSuccess', () => {
    it('should create an action to load trips successfully', () => {
      const response: PagedResponse<Trip> = {
        items: [mockTrip],
        page: 1,
        limit: 10,
        total: 0,
      };
      const expectedAction = {
        type: TripStoreActions.LoadTripsSuccess.type,
        response,
      };
      const action = TripStoreActions.LoadTripsSuccess({
        response,
      });
      expect(action).toEqual(expectedAction);
    });
  });

  describe('LoadTripRequest', () => {
    it('should create an action to load a trip', () => {
      const id = '1';
      const expectedAction = {
        type: TripStoreActions.LoadTripRequest.type,
        id,
      };
      const action = TripStoreActions.LoadTripRequest({ id });
      expect(action).toEqual(expectedAction);
    });
  });

  describe('LoadTripSuccess', () => {
    it('should create an action to load a trip successfully', () => {
      const expectedAction = {
        type: TripStoreActions.LoadTripSuccess.type,
        trip: mockTrip,
      };
      const action = TripStoreActions.LoadTripSuccess({ trip: mockTrip });
      expect(action).toEqual(expectedAction);
    });
  });

  describe('LoadTodayTripRequest', () => {
    it('should create an action to load today trip', () => {
      const expectedAction = {
        type: TripStoreActions.LoadTodayTripRequest.type,
      };
      const action = TripStoreActions.LoadTodayTripRequest();
      expect(action).toEqual(expectedAction);
    });
  });

  describe('LoadTripsError', () => {
    it('should create an action to handle error', () => {
      const error = new HttpErrorResponse({
        error: 'Server error',
        status: 500,
        statusText: 'Internal Server Error',
      });
      const expectedAction = {
        type: TripStoreActions.TripsError.type,
        payload: { error },
      };
      const action = TripStoreActions.TripsError({ payload: { error } });
      expect(action).toEqual(expectedAction);
    });
  });
});
