import { HttpClient } from '@angular/common/http';
import { Inject, Injectable, InjectionToken } from '@angular/core';
import { catchError, Observable } from 'rxjs';
import { LoadOptions, PagedResponse, Trip } from '../../../shared';

export const TRIP_BASE_URL = new InjectionToken<string>('TRIP_BASE_URL');

/**
 * Service to handle trip-related operations.
 */
@Injectable()
export class TripService {
  private http: HttpClient;
  private baseUrl: string;

  /**
   * Constructor for TripService.
   * @param http - The HttpClient instance to make HTTP requests.
   * @param baseUrl - The base URL for the trip API.
   */
  constructor(
    @Inject(HttpClient) http: HttpClient,
    @Inject(TRIP_BASE_URL) baseUrl: string
  ) {
    this.http = http;
    this.baseUrl = baseUrl;
  }

  /**
   * Fetches all trips.
   * @returns An Observable of an array of ITrip objects.
   * @throws Will throw an error if the request fails.
   */
  getTrips(loadOptions: LoadOptions): Observable<PagedResponse<Trip>> {
    let url = this.baseUrl + '?';
    //#region Query Params
    const { sortBy, sortOrder, page, limit, titleFilter } = loadOptions;
    if (!!sortBy) url += 'sortBy=' + encodeURIComponent('' + sortBy) + '&';
    if (!!sortOrder)
      url += 'sortOrder=' + encodeURIComponent('' + sortOrder) + '&';
    if (!!page) url += 'page=' + encodeURIComponent('' + page) + '&';
    if (!!limit) url += 'limit=' + encodeURIComponent('' + limit) + '&';
    if (!!titleFilter)
      url += 'titleFilter=' + encodeURIComponent('' + titleFilter) + '&';
    url = url.replace(/[?&]$/, '');
    //#endregion

    return this.http.request<PagedResponse<Trip>>('get', url).pipe(
      catchError((error) => {
        throw new Error('Error fetching trips', error);
      })
    );
  }

  /**
   * Fetches a trip by its ID.
   * @param id - The ID of the trip to fetch.
   * @returns An Observable of an ITrip object.
   * @throws Will throw an error if the ID is not provided.
   */
  getTripById(id: string): Observable<Trip> {
    if (!id) {
      throw new Error('Id is required');
    }
    return this.http.request<Trip>('get', this.baseUrl + id).pipe(
      catchError((error) => {
        throw new Error('Error fetching trip', error);
      })
    );
  }

  /**
   * Fetches a random trip.
   * @returns An Observable of an ITrip object.
   * @throws Will throw an error if the request fails.
   */
  getRandomTrip(): Observable<Trip> {
    return this.http
      .request<Trip>('get', this.baseUrl + 'random/trip-of-the-day')
      .pipe(
        catchError((error) => {
          throw new Error('Error fetching random trip', error);
        })
      );
  }
}
