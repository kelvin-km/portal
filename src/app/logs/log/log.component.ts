import {Component, OnInit, TemplateRef, ViewChild} from '@angular/core';
import {User} from "../../shared/interfaces/user.model";
import {DatatableComponent} from "@swimlane/ngx-datatable";
import {County, Link} from "../../shared/interfaces/IWards";
import {ILog, IProjects} from "../../shared/interfaces/project";
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ApiService} from "../../services/api.services";
import {AuthService} from '../../services/auth.service';

@Component({
  selector: 'app-log',
  templateUrl: './log.component.html',
  styleUrls: ['./log.component.sass']
})
export class LogComponent implements OnInit {

  currentUser: User;
  @ViewChild('roleTemplate', {static: true}) roleTemplate: TemplateRef<any>;
  @ViewChild(DatatableComponent, {static: false}) table: DatatableComponent;
  show = false;
  rows = [];
  selectedRowData: County = new County();
  newUserImg = 'assets/images/user.png';
  count = 0;
  page_size = 0;
  data: Array<ILog> = new Array<ILog>();
  filteredData: Array<ILog> = new Array<ILog>();
  links: Array<Link> = new Array<Link>();
  columns = [
    {name: 'File'}, {name: 'Ward Name'}, {name: 'User Name'}, {name: 'Upload Date'}
  ];

  constructor(private fb: FormBuilder, public api: ApiService, public auth: AuthService) {

    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.auth.updateproject = 0;
    // this.fetch();
  }
  viewRoles(row) {
    this.auth.updateproject = 0;
    localStorage.setItem('project', JSON.stringify(row));
  }

  fetch() {
    this.api.get('/upload/').subscribe(result => {
        // this.count = result.count;
        // this.page_size = result.page_size;
        this.data = result;
        this.filteredData = result;
      },
      errResp => {
        this.api.showNotification('bg-red', 'Error fetching data');

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

