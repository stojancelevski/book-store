import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { MapPageRoutingModule } from './map-routing.module';

import { MapPage } from './map.page';
import {
  AnnotationsService, BubbleService,
  DataLabelService,
  LegendService,
  MapsModule,
  MapsTooltipService,
  MarkerService, NavigationLineService,
  SelectionService,
  ZoomService
} from '@syncfusion/ej2-angular-maps';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    MapsModule,
    MapPageRoutingModule,
  ],
  declarations: [MapPage],
  providers: [
    LegendService,
    MarkerService,
    MapsTooltipService,
    DataLabelService,
    BubbleService,
    SelectionService,
    NavigationLineService,
    AnnotationsService,
    ZoomService]
})
export class MapPageModule {
}

