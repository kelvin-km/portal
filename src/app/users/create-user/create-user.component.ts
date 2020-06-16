import { Component, OnInit } from '@angular/core';
import {DynamicScriptLoaderService} from '../../services/dynamic-script-loader.service';
import { User} from '../../shared/interfaces/user.model';
import {AuthService} from '../../services/auth.service';
import {ApiService} from '../../services/api.services';
import {Router} from '@angular/router';
declare const $: any;
declare const flatpickr: any;
@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.sass']
})
export class CreateUserComponent implements OnInit {
  user: User = new User();
  currentUser: User;
  // dragdrop file upload
  imagePath:any;
  message: string;
  imageData: any;
  imgURL: any;
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, public auth: AuthService ,
              private router: Router, public api: ApiService) {
    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }
  ngOnInit() {
    const pjdata  = JSON.parse(localStorage.getItem('user-dup'));
    if (this.auth.update == 1 && pjdata) {
      this.user = pjdata;
    } else {
      localStorage.removeItem('user-dup');
    }
    this.startScript();
  }
  setuser( f) {
    this.user = f.form.value;
    this.user.modifiedBy = this.currentUser.id;
    this.user.image = this.imageData;
    console.log( this.user);
    const pjdata: User  = JSON.parse(localStorage.getItem('user-dup'));
    if (this.auth.update == 1 && pjdata) {
      this.user.id = pjdata.id;
    }
    if (this.user && this.user.id > 0 ) {
      this.api.put(`user/create`, this.user ).subscribe(result => {
          if (result) {
            this.api.showNotification('bg-green', 'user updated successfully ');
          }
        },
        errResp => {
          this.api.showNotification('bg-red', 'Error Updating user');
        });
    } else {
      this.user.password = this.makeid(5);
      this.user.createdBy = this.currentUser.id;
      this.api.put('user/create', this.user).subscribe(result => {
          this.api.showNotification('bg-green', 'user created successfully ');
          this.router.navigate(['/users/users-list']);
        },
        errResp => {
        console.log(errResp)
          this.api.showNotification('bg-red', errResp.error);
        });
    }
  }
  makeid(length) {
    let result           = '';
    const characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz';
    const charactersLength = characters.length;
    for ( let i = 0; i < length; i++ ) {
      result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
  }
  preview(files) {
    if (files.length === 0) {
      return;
    }
    const mimeType = files[0].type;
    if (mimeType.match(/image\/*/) == null) {
      this.message = 'Only images are supported.';
      return;
    }
    const reader = new FileReader();
    this.imagePath = files[0];
    reader.readAsDataURL(files[0]);
    reader.onload = (_event) => {
      this.imgURL = reader.result;
    };
    reader.onloadend = (_event) => {
      this.imageData = reader.result;
      console.log(this.imageData);
    };

  }


  async startScript() {
    await this.dynamicScriptLoader.load('form.min').then(data => {
      this.loadData();
    }).catch(error => console.log(error));
  }

  private loadData() {
    $('select').formSelect();
  }
}
