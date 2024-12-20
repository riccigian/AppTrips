import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { DetailPageComponent } from '.';
import { UiModule } from '../../shared/ui/ui.module';
import { DetailPageRoutingModule } from './detail-page-routing.module';

@NgModule({
  declarations: [DetailPageComponent],
  imports: [CommonModule, DetailPageRoutingModule, UiModule],
  providers: [],
})
export class DetailPageModule {}
