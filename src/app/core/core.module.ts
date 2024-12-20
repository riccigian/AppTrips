import { CommonModule } from '@angular/common';
import { HttpClientJsonpModule, HttpClientModule } from '@angular/common/http';
import { ModuleWithProviders, NgModule } from '@angular/core';
import { environment } from '../../environments/environment';
import { TRIP_BASE_URL, TripService } from './api/trip-service';

@NgModule({
  imports: [CommonModule, HttpClientModule, HttpClientJsonpModule],
})
export class CoreModule {
  static forRoot(): ModuleWithProviders<any> {
    return {
      ngModule: CoreModule,
      providers: [
        TripService,
        {
          provide: TRIP_BASE_URL,
          useValue: environment.tripBaseUrl,
        },
      ],
    };
  }
}
