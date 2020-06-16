import {Component, OnInit, ViewChild, TemplateRef} from '@angular/core';
import {DatatableComponent} from '@swimlane/ngx-datatable';
import {ApiService} from '../../services/api.services';
import {Roles, User} from '../../shared/interfaces/user.model';
import {AuthService} from '../../services/auth.service';

declare const $: any;
declare const M: any;
declare const flatpickr: any;
@Component({
  selector: 'app-manage-users',
  templateUrl: './manage-users.component.html',
  styleUrls: ['./manage-users.component.sass']
})
export class ManageUsersComponent implements OnInit {
  @ViewChild('roleTemplate', { static: true }) roleTemplate: TemplateRef<any>;
  @ViewChild(DatatableComponent, { static: false }) table: DatatableComponent;
  filteredData: Array<User> = new Array<User>();
  data: Array<User> = new Array<User>();
  selectedUser: User = new User();
  columns = [
    { name: 'First Name' },  { name: 'Middle Name' },  { name: 'Surname' }, { name: 'Phone' }, { name: 'Email' }, { name: 'Role' }
  ];
  count = 0;
  pageNumber = 0;

  constructor( public api: ApiService,   public auth: AuthService) {
  }

  ngOnInit() {
    this.auth.update = 0;
    this.fetch({ offset: 0, limit: 10 });
  }
  fetch(paginator: any) {
    const offseta = paginator.offset * paginator.limit;
    const limitz = paginator.limit;
    this.api.get(`users?offset=${offseta}&limit=${limitz}`).subscribe(result => {
        this.data = result.data;
        this.count = result.meta.total;
        this.filteredData = result.data;
      },
      errResp => {
        this.api.showNotification('bg-red', 'Error fetching data');

      });
  }
// /user/remove
  add() {
    this.auth.update = 1;
  }
  delete(row: User ) {
    this.selectedUser =  row;
  }
removeUser() {
  this.api.put(`user/remove`, {id: this.selectedUser.id, code: 'tbl_users'} ).subscribe(result => {
      if (result) {
        $('#editModal').modal('hide');
        this.data = this.arrayRemove(this.data, this.selectedUser.id);
        this.api.showNotification('bg-green', 'user removed successfully ');
      }
    },
    errResp => {
      this.api.showNotification('bg-red', 'Error removing record');
    });
}

  editRow(row: User) {
    this.auth.update = 1;
    localStorage.setItem('user-dup', JSON.stringify(row));
  }
  viewRow(row) {
    this.auth.update = 0;
    localStorage.setItem('user-dup', JSON.stringify(row));
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

