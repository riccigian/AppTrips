import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LandingPageComponent } from '.';
import { UiModule } from '../../shared/ui/ui.module';
import { TripListComponent } from './components/trip-list';
import { LandingPageRoutingModule } from './landing-page-routing.module';

@NgModule({
  declarations: [LandingPageComponent, TripListComponent],
  imports: [CommonModule, LandingPageRoutingModule, UiModule],
})
export class LandingPageModule {}
