import { HttpErrorResponse } from '@angular/common/http';
import {
  HttpClientTestingModule,
  HttpTestingController,
} from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { getLoadOptions, mockTrip, PagedResponse, Trip } from '../../../shared';
import { TRIP_BASE_URL, TripService } from './trip-service';

describe('TripService', () => {
  let tripService: TripService;
  let httpTestingController: HttpTestingController;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [
        TripService,
        {
          provide: TRIP_BASE_URL,
          useValue:
            'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips/',
        },
      ],
    });
    tripService = TestBed.inject(TripService);
    httpTestingController = TestBed.inject(HttpTestingController);
  });

  afterEach(() => {
    httpTestingController.verify();
  });

  it('should be created', () => {
    expect(tripService).toBeDefined();
  });

  describe('getTrips', () => {
    it('should return a list of trips', () => {
      let trips: PagedResponse<Trip> | undefined;
      tripService.getTrips(getLoadOptions()).subscribe((response) => {
        trips = response;
      });

      const req = httpTestingController.expectOne(
        'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips/?page=1&limit=10'
      );
      const mockTrips: PagedResponse<Trip> = {
        items: [mockTrip],
        page: 1,
        limit: 10,
        total: 0,
      };
      req.flush(mockTrips);
      expect(trips).toBe(mockTrips);
    });

    it('should use the right REST method', () => {
      let trips: PagedResponse<Trip> | undefined;
      tripService.getTrips(getLoadOptions()).subscribe((response) => {
        trips = response;
      });

      const req = httpTestingController.expectOne(
        'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips/?page=1&limit=10'
      );
      const mockTrips: PagedResponse<Trip> = {
        items: [mockTrip],
        page: 1,
        limit: 10,
        total: 0,
      };
      req.flush(mockTrips);
      expect(req.request.method).toBe('GET');
    });

    it('should use the right query parameters', () => {
      let trips: PagedResponse<Trip> | undefined;
      tripService.getTrips(getLoadOptions()).subscribe((response) => {
        trips = response;
      });

      const req = httpTestingController.expectOne(
        'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips/?page=1&limit=10'
      );
      const mockTrips: PagedResponse<Trip> = {
        items: [mockTrip],
        page: 1,
        limit: 10,
        total: 0,
      };
      req.flush(mockTrips);
      expect(req.request.url).toContain('page=1');
      expect(req.request.url).toContain('limit=10');
    });

    it('should throw an error if the request fails', () => {
      let actualError: HttpErrorResponse | undefined;
      tripService.getTrips(getLoadOptions()).subscribe({
        next: () => {
          fail('Success should not be called');
        },
        error: (err) => {
          actualError = err;
        },
      });

      const req = httpTestingController.expectOne(
        'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips/?page=1&limit=10'
      );

      req.flush('Server error', {
        status: 500,
        statusText: 'Internal Server Error',
      });

      if (!actualError) {
        throw new Error('Error is not defined');
      }

      expect(actualError).toBeInstanceOf(Error);
    });
  });

  describe('getTripById', () => {
    it('should return a trip', () => {
      let trip: Trip | undefined;
      tripService.getTripById('1').subscribe((response) => {
        trip = response;
      });

      const req = httpTestingController.expectOne(
        'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips/1'
      );
      req.flush(mockTrip);
      expect(trip).toBe(mockTrip);
    });

    it('should use the right REST method', () => {
      let trip: Trip | undefined;
      tripService.getTripById('1').subscribe((response) => {
        trip = response;
      });

      const req = httpTestingController.expectOne(
        'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips/1'
      );
      req.flush(mockTrip);
      expect(req.request.method).toBe('GET');
    });

    it('should throw an error if the request fails', () => {
      let actualError: HttpErrorResponse | undefined;
      tripService.getTripById('1').subscribe({
        next: () => {
          fail('Success should not be called');
        },
        error: (err) => {
          actualError = err;
        },
      });

      const req = httpTestingController.expectOne(
        'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips/1'
      );

      req.flush('Server error', {
        status: 500,
        statusText: 'Internal Server Error',
      });

      if (!actualError) {
        throw new Error('Error is not defined');
      }

      expect(actualError).toBeInstanceOf(Error);
    });
  });

  describe('getRandomTrip', () => {
    it('should return a random trip', () => {
      let trip: Trip | undefined;
      tripService.getRandomTrip().subscribe((response) => {
        trip = response;
      });

      const req = httpTestingController.expectOne(
        'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips/random/trip-of-the-day'
      );
      req.flush(mockTrip);
      expect(trip).toBe(mockTrip);
    });

    it('should use the right REST method', () => {
      let trip: Trip | undefined;
      tripService.getRandomTrip().subscribe((response) => {
        trip = response;
      });

      const req = httpTestingController.expectOne(
        'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips/random/trip-of-the-day'
      );
      req.flush(mockTrip);
      expect(req.request.method).toBe('GET');
    });

    it('should throw an error if the request fails', () => {
      let actualError: HttpErrorResponse | undefined;
      tripService.getRandomTrip().subscribe({
        next: () => {
          fail('Success should not be called');
        },
        error: (err) => {
          actualError = err;
        },
      });

      const req = httpTestingController.expectOne(
        'https://iy3ipnv3uc.execute-api.eu-west-1.amazonaws.com/Prod/v1/trips/random/trip-of-the-day'
      );

      req.flush('Server error', {
        status: 500,
        statusText: 'Internal Server Error',
      });

      if (!actualError) {
        throw new Error('Error is not defined');
      }

      expect(actualError).toBeInstanceOf(Error);
    });
  });
});
