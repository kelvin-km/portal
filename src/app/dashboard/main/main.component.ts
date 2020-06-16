import {Component, OnInit} from '@angular/core';
import {ApiService} from '../../services/api.services';
import {
 Ivictim, MohnitorGenderSummarry,
  MohnitoSummarry,
   TopMohnitorContactsSummary
} from '../../shared/interfaces/user.model';
import {formatCurrency} from '@angular/common';
import {DateFormat} from '../shared/DateFormat';
declare const $: any;
declare let L;
import * as L1 from 'leaflet.markercluster';
@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.scss']
})
export class MainComponent implements OnInit {
  data: MohnitoSummarry = new MohnitoSummarry();
  datamap: Array<Ivictim> = new Array<Ivictim>();
  genderdata: Array<MohnitorGenderSummarry> = new Array<MohnitorGenderSummarry>();
  topSpreader: Array<TopMohnitorContactsSummary> = new Array<TopMohnitorContactsSummary>();
  // area chart start
  public areaChartData = [{data: [], label: ''}];
  public areaChartOptions = {
    responsive: true,
    tooltips: {
      mode: 'index',
      titleFontSize: 12,
      titleFontColor: '#000',
      bodyFontColor: '#000',
      backgroundColor: '#e72626',
      cornerRadius: 3,
      intersect: false,
    },
    legend: {
      display: false,
      labels: {
        usePointStyle: true,
      },
    },
    scales: {
      xAxes: [{
        display: true,
        gridLines: {
          display: false,
          drawBorder: false
        },
        scaleLabel: {
          display: false,
          labelString: 'Gender'
        },
        ticks: {
          fontColor: '#343be8', // Font Color
        }

      }],
      yAxes: [{
        display: true,
        gridLines: {
          display: false,
          drawBorder: false
        },
        scaleLabel: {
          display: true,
          labelString: 'Value'

        },
        ticks: {
          fontColor: 'rgba(172,19,15,0.72)', // Font Color
        }
      }]
    },
    title: {
      display: false,
      text: 'Normal Legend'
    }
  };
  public areaChartLabels = [];

  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    plugins: {
      fontWeight: 'bold',
      datalabels: {
        formatter(value, context) {
          return  value + ' Contacts';
        },
        anchor: 'end',
        align: 'end',
      }
    },
    scales: {
      yAxes: [{
        ticks: {
          callback(label, index, labels) {
            const formattedNumber = formatCurrency(label, 'en-US', ' ', 'USD');
            return formattedNumber;
          }
        },
        scaleLabel: {
          display: true,
          labelString: 'Contacts  Count'
        }
      }],
      xAxes: [{
        scaleLabel: {
          display: true,
          labelString: ' Subjects Name'
        }
      }]
    },
    tooltips: {
      enabled: true,
      mode: 'single',
      callbacks: {
        label(tooltipItem, data) {
          const label = data.labels[tooltipItem.index]; // xAxes value
          const datasetLabel = data.datasets[tooltipItem.datasetIndex].data[tooltipItem.index]; // yAxes value
          // const formattedNumber = formatCurrency(datasetLabel, 'en-US', 'KES ', 'USD');
          return 'Total Contacts' + ': ' + ' ' + datasetLabel;
        }
      }
    }
  };
  public barChartLabels = [];
  public barChartData = [{data: [], label: ''}];
  public barChartType = 'bar';
  public barChartLegend = false;
  public barChartColors: Array<any> = [
    {
      backgroundColor: 'rgb(231,38,38)',
      borderColor: 'rgb(10,137,254)',
      pointBackgroundColor: 'rgb(211,171,72)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(231,38,38,0.8)'
    }

  ];
  show = false;
  key = '';
  invoicetatus;
  datefilter = '';
  rows = [];
  count = 0;
  pageNumber = 0;
  fromdate: any;
  todate: any;
  // end bar chart
  map: any;
  tiles: any;
  center: any;
  constructor(public api: ApiService) {
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
        this.datamap = result.data;
        this.datamap.forEach((victim: Ivictim, index) => {
          const m = this.mapPopup(victim);
          markers.addLayer(m);
        });

      },
      errResp => {
        this.api.showNotification('bg-red', 'Error fetching data');

      });

    this.fetch();
    // this.fetchorder();
    this.fetchGenderSummarry();
    this.fetchInvoiceAmountSummary();

    // this.fetchInvoiceAmountSummary();
    $(function() {


      $('#chat-conversation').slimscroll({
        height: '264px',
        size: '5px'
      });

      $('#sparkline').sparkline([5, 6, 7, 2, 0, -4, -2, 4], {
        type: 'bar'
      });
      $('#sparkline2').sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
        type: 'line'
      });
      $('#sparkline3').sparkline([5, 6, 7, 9, 9, 5, 3, 2, 2, 4, 6, 7], {
        type: 'line'
      });
      $('#sparkline4').sparkline([4, 6, 7, 7, 4, 3, 2, 1, 4, 4], {
        type: 'discrete'
      });
      $('#sparkline5').sparkline([1, 1, 2], {
        type: 'pie'
      });
      $('#sparkline6').sparkline([2, -4, 5, 2, 0, 4, -2, 4], {
        type: 'bar'
      });
    });


  }

  fetch() {
    this.api.get('mohnitor_summarry').subscribe(result => {
        this.data = result.summary;
      },
      errResp => {
        this.api.showNotification('bg-red', 'Error fetching data');
        this.data = new MohnitoSummarry();
      });
  }
  fetchGenderSummarry() {
    this.api.get('getGenderMohnitorSummary').subscribe(result => {
        this.genderdata = result.summary;
        let label = '';
        const graphData = [];
        const labelData = [];
        // this.ininvoiceStats
        this.genderdata.forEach((gender) => {
          label = gender.gender == 'F' ? 'Female' : 'Male';
          labelData.push(label);
          graphData.push(gender.total);
        });
        this.areaChartLabels = [...labelData];
        this.areaChartData = [{data: [...graphData], label: 'Total Subjects'}];



      },
      errResp => {
        this.api.showNotification('bg-red', 'Error fetching data');
        this.genderdata = new Array<MohnitorGenderSummarry>();
      });
  }

  fetchInvoiceAmountSummary() {
    this.api.get('getToContactMohnitorSummary').subscribe(result => {
        this.topSpreader = result.summary;
        let label = '';
        const graphData = [];
        const labelData = [];
        this.topSpreader.forEach((contact) => {
            label = contact.firstName;
            labelData.push(label);
            graphData.push(contact.total);

        });
        this.barChartLabels = [...labelData];
        this.barChartData = [{data: [...graphData], label: 'Total Contacts'}];
      },
      errResp => {
        this.api.showNotification('bg-red', 'Error fetching data');
        this.topSpreader = new Array<TopMohnitorContactsSummary>();
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
                          <strong>Violations:</strong> <span><span/><strong style="color: red">${occurrenceData.violations}</strong></div> <br/>
                          <strong>GENDER:</strong> <span><span/><a  style="color: #0b8793">${occurrenceData.gender}</a></div>`);
    return m;
  }

  getStyledStationIcon(priority) {
    const styles = this.getStyles(priority);
    return L.divIcon({
      className: 'leaf-red.png',
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
