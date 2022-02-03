import { Component, OnInit } from '@angular/core';
import { Maps, Marker, MapsTooltip } from '@syncfusion/ej2-angular-maps';
import { Geolocation } from '@ionic-native/geolocation';

Maps.Inject(Marker);
Maps.Inject(MapsTooltip);

@Component({
  selector: 'app-map',
  templateUrl: './map.page.html',
  styleUrls: ['./map.page.scss'],
})
export class MapPage implements OnInit {
  public layerType: string;
  public bingMapType: string;
  public key: string;
  public zoomSettings: object;
  public centerPosition: object;
  public markerSettings: object;
  public bubbleSettings: object;
  public tooltipSettings: object;

  constructor(private geo: Geolocation) { }

  ngOnInit() {
    this.geo.getCurrentPosition().then((resp) => {
      this.centerPosition = {
        latitude: resp.coords.latitude,
        longitude: resp.coords.longitude
      };
    });
    this.layerType = 'OSM';
    this.bingMapType = 'CanvasLight';
    this.key = 'Asxhad3ltEDcek30rqfGoqqFCKLERD3I1Xy7RAPZxe_3L-P_WVRCdZupTEdO8m1U';
    this.zoomSettings = {
      enable: true,
      zoomFactor: 13,
      maxZoom: 25,
    };

    this.markerSettings = [{
      dataSource: [
        {
          latitude: 41.111111,
          longitude: 20.805134,
          name: 'Ohrid store 1'
        },
        {
          latitude: 41.114048,
          longitude: 20.798484,
          name: 'Ohrid store 2'
        },
        {
          latitude: 41.114937,
          longitude: 20.803247,
          name: 'Ohrid store 3'
        },
        {
          latitude: 41.118043,
          longitude: 20.800573,
          name: 'Ohrid store 4'
        },
      ],
      visible: true,
      shape: 'Circle',
      fill: 'white',
      width: 8,
      animationDuration: 0,
      border: {width: 5, color: 'red'},
      tooltipSettings: {
        visible: true,
        valuePath: 'name',
        tooltipDisplayMode: 'Click'

      }
    }];
    this.tooltipSettings = {
      visible: true,
      valuePath: 'name',
      tooltipDisplayMode: 'Click'
    };
  }
}
