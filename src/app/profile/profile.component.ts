import { Component, OnInit } from '@angular/core';
import {Ipassword, Roles, User} from '../shared/interfaces/user.model';
import {FormBuilder, FormGroup} from '@angular/forms';
import {ApiService} from '../services/api.services';
import {DynamicScriptLoaderService} from '../services/dynamic-script-loader.service';
import {AuthService} from "../services/auth.service";
import {Router} from "@angular/router";

@Component({
  selector: 'app-profile',
  templateUrl: './profile.component.html',
  styleUrls: ['./profile.component.sass']
})
export class ProfileComponent implements OnInit {
  userdata: User = new User();
  currentUser: User;
  basicForm: FormGroup;
  roleForm: FormGroup;
  role: Roles = new Roles();
  ipassword: Ipassword = new Ipassword();
  constructor( public api: ApiService,  private router: Router, private fb: FormBuilder, public auth: AuthService , private dynamicScriptLoader: DynamicScriptLoaderService) {
    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    this.userdata = this.currentUser;
  }

  ChangePass($ev, f) {
    this.ipassword = f.form.value;
    const data = {username: this.userdata.emailAddress, password : this.ipassword.old_password, newPassword : this.ipassword.new_password};
    this.api.post('employee/update_pass', data).subscribe(result => {
        this.api.showNotification('bg-green', 'Your password have been updated successfully');
        if (this.currentUser.verification == 0) {
          this.currentUser.verification = 1;
          this.auth.setCurrentUser(this.currentUser);
          this.router.navigate(['/dashboard/main']);
        }
      },
      errResp => {
        this.api.showNotification('bg-red', 'Updating your password Failed , Incorrect old password');
      });
  }


  onEditSave(form: FormGroup) {
    console.log(form.value);
  }

}
