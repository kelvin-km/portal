import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {IAgencyInfo, IFeeds, User} from '../../shared/interfaces/user.model';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ApiService} from '../../services/api.services';
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-agencies',
  templateUrl: './agencies.component.html',
  styleUrls: ['./agencies.component.sass']
})
export class AgenciesComponent implements OnInit {
  pageNumber = 0;
  count = 0;
  key = '';
  to_date = new Date();
  today = new Date();
  from_date;
  datefilter;
  @ViewChild('roleTemplate', { static: true }) roleTemplate: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  imageBlobUrl: string;
  filteredData: Array<IAgencyInfo> = new Array<IAgencyInfo>();
  data: Array<IAgencyInfo> = new Array<IAgencyInfo>();
  columns = [
    { name: 'Name' }, { name: 'Phone Number' }, { name: 'Email' }, { name: 'Category' }, { name: 'officelocation' }
  ];

  constructor( public api: ApiService,   public auth: AuthService) {


  }

  ngOnInit() {
    this.auth.agency = 0;
    this.fetch({ offset: 0, limit: 10 });
  }
  search(event) {
    const val = event.target.value;
    this.key = `&key=${val}`;
    this.fetch({ offset: 0, limit: 10 });
  }

  filterDate() {
    if (this.from_date > this.to_date) {
      this.api.showNotification('bg-red', 'To date should be greater than from date');
    } else {
      this.datefilter = `&from_date=${this.from_date}&to_date=${this.to_date}`;
      this.fetch({ offset: 0, limit: 10 });
      if (this.to_date.toString().length > 0) {
      } else {
        this.api.showNotification('bg-red', 'Select to date');
      }
    }
  }
  removeUser(row: any) {
    this.api.put(`user/remove`, {id: row.id, code: 'agency'} ).subscribe(result => {
        if (result) {
          this.data = this.arrayRemove(this.data, row.id);
          this.api.showNotification('bg-green', 'Record removed successfully ');
        }
      },
      errResp => {
        this.api.showNotification('bg-red', 'Error removing record');
      });
  }
  fetch(paginator: any) {
    const offseta = paginator.offset * paginator.limit;
    const limitz = paginator.limit;
    this.api.get(`agency/?offset=${offseta}&limit=${limitz}${this.key}${this.datefilter ? this.datefilter : ''}`).subscribe(result => {
        this.count = result.meta.total;
        this.data = result.data;
        this.filteredData = result.data;
      },
      errResp => {
        this.api.showNotification('bg-red', 'Error fetching data');

      });
  }


  add() {
    this.auth.agency = 1;
  }


  editRow(row: User) {
    this.auth.agency = 1;
    localStorage.setItem('agency-dup', JSON.stringify(row));
  }
  viewRow(row) {
    this.auth.agency = 0;
    localStorage.setItem('agency-dup', JSON.stringify(row));
  }


  arrayRemove(array, id) {
    return array.filter (function(element) {
      return element.id !== id;
    });

  }



  filterDatatable(event) {
    // get the value of the key pressed and make it lowercase
    const val = event.target.value.toLowerCase();
    // get the amount of columns in the table
    const colsAmt = this.columns.length;
    // get the key names of each column in the dataset
    const keys = Object.keys(this.filteredData[0]);
    // assign filtered matches to the active datatable
    // this.subcategories = this.categories.filter(element => element.id == $ev)[0].subcategory;
    this.data = this.filteredData.filter(item => {
      console.log(item);
      // iterate through each row's column data
      for (let i = 0; i < colsAmt; i++) {
        // check for a match
        if (item[keys[i]].toString().toLowerCase().indexOf(val) !== -1 || !val) {
          // found match, return true to add to result set
          return true;
        }
      }
    });
    // whenever the filter changes, always go back to the first page
    this.table.offset = 0;
  }

}

