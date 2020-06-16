import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Ipassword, Roles, User} from '../../shared/interfaces/user.model';
import {ApiService} from '../../services/api.services';
import {DynamicScriptLoaderService} from '../../services/dynamic-script-loader.service';
@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.sass']
})
export class UserDetailComponent implements OnInit {
  userdata: User = new User();
  basicForm: FormGroup;
  roleForm: FormGroup;
  role: Roles = new Roles();
  ipassword: Ipassword = new Ipassword();
  constructor( public api: ApiService, private fb: FormBuilder, private dynamicScriptLoader: DynamicScriptLoaderService) { }

  ngOnInit() {
    this.userdata = JSON.parse(localStorage.getItem('user-dup'));
  }

  ChangePass($ev, f) {
    this.ipassword = f.form.value;
    const data = {username: this.userdata.emailAddress, password : this.ipassword.old_password, newPassword : this.ipassword.new_password};
    this.api.post('employee/update_pass', data).subscribe(result => {
        this.api.showNotification('bg-green', 'Your password have been updated successfully');
      },
      errResp => {
        this.api.showNotification('bg-red', 'Updating your password Failed , Incorrect old password');
      });
  }


  onEditSave(form: FormGroup) {
console.log(form.value);
  }

}
