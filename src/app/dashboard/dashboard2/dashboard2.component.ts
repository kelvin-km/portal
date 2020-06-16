import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {Ivictim, User} from '../../shared/interfaces/user.model';
import {IUserOrder} from '../../shared/interfaces/products';
import {ApiService} from '../../services/api.services';
import {AuthService} from '../../services/auth.service';
import {DynamicScriptLoaderService} from '../../services/dynamic-script-loader.service';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {DateFormat} from '../shared/DateFormat';
declare let L;
import * as L1 from 'leaflet.markercluster';
declare const $: any;
@Component({
    selector: 'app-dashboard2',
    templateUrl: './dashboard2.component.html',
    styleUrls: ['./dashboard2.component.scss']
})
export class Dashboard2Component implements OnInit {
  currentUser: User;
  @ViewChild('roleTemplate', {static: true}) roleTemplate: TemplateRef<any>;
  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;
  show = false;
  key = '';
  invoicetatus;
  datefilter = '';
  rows = [];
  count = 0;
  pageNumber = 0;
  fromdate: any;
  todate: any;
  public legend = [];
  data: Array<Ivictim> = new Array<Ivictim>();
  orderDetail: Array<IUserOrder> = new Array<IUserOrder>();
  columns = [
    {name: 'First Name'}, {name: 'Surname'}, {name: 'Phone'}, {name: 'Country'}, {name: 'Quarantine Location'}
  ];
  map: any;
  tiles: any;
  center: any;
  constructor( public api: ApiService, public auth: AuthService, private dynamicScriptLoader: DynamicScriptLoaderService) {
    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

    ngOnInit() {
      this.tiles = L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        maxZoom: 14,
        attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      });
      this.center = new L.LatLng(-0.4, 37.23459000);
      // this.center = new L.LatLng(0.053543, 37.648399);

      this.map = L.map('map', {center: this.center, zoom: 6.5, layers: [this.tiles]});
      this.tiles.addTo(this.map);

 // getting data from db
      const markers = new L1.MarkerClusterGroup();
      // markers.addLayer(L.marker([-1.9457558575631295, 37.383729410689085]));

      this.map.addLayer(markers);
      const offseta = 0;
      const limitz = 10000000000;
      this.api.get(`victims/?offset=${offseta}&limit=${limitz}${this.key ? this.key : ''}${this.invoicetatus ? this.invoicetatus : ''}${this.datefilter ? this.datefilter : ''}`).subscribe(result => {
          this.count = result.meta.total;
          this.data = result.data;
          this.data.forEach((victim: Ivictim, index) => {
            const m = this.mapPopup(victim);
            markers.addLayer(m);
            console.log('idex: ', index);
          });

        },
        errResp => {
          this.api.showNotification('bg-red', 'Error fetching data');

        });
    }



  getLatLng(victim: Ivictim) {
    return new L.LatLng(victim.latitude, victim.longitude);
  }

  mapPopup(occurrenceData: Ivictim) {
    const m = new L.Marker(this.getLatLng(occurrenceData), {icon: this.getStyledStationIcon(occurrenceData.colors)});
    m.bindPopup(`<div><strong>SUBJECT NAME:</strong> <span>${occurrenceData.firstName + ' ' + occurrenceData.surname}</span> <br/>
                          <strong>INFECTION MODE:</strong> <span><span/><strong >${occurrenceData.infectionMode}</strong></div> <br/>
                          <strong>QUARANTINE LOCATION:</strong> <span><span/><strong >${occurrenceData.location}</strong></div> <br/>
                          <strong>START DATE:</strong> <span><span/><strong style="color: red">${DateFormat.formatDate(occurrenceData.createdDate)}</strong></div> <br/>
                          <strong>Violations:</strong> <span><span/><strong style="color: red">${DateFormat.formatDate(occurrenceData.violations)}</strong></div> <br/>
                          <strong>GENDER:</strong> <span><span/><a  style="color: #0b8793">${occurrenceData.gender}</a></div>`);
    return m;
  }

  getStyledStationIcon(priority) {
    const styles = this.getStyles(priority);
    return L.divIcon({
      className: 'leaf-green.png',
      src: '',
      iconAnchor: [0, 24],
      labelAnchor: [-6, 0],
      popupAnchor: [0, -36],
      html: `<span style="${styles}" />`
    });
  }

  getStyles(color) {
    return `background-color: ${color};
              width: 1.9rem;
              height: 2.0rem;
              display: block;
              left: -1.5rem;
              top: -1.5rem;
              position: relative;
              border-radius: 3rem 3rem 0;
              transform: rotate(0deg);
            `;
  }

}
