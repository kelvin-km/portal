import { Component, OnInit } from '@angular/core';
import {IAgencyInfo, User} from "../../shared/interfaces/user.model";
import {AuthService} from "../../services/auth.service";
import {ApiService} from "../../services/api.services";
import {Router} from "@angular/router";
import {DynamicScriptLoaderService} from "../../services/dynamic-script-loader.service";
declare const $: any;
declare const flatpickr: any;
@Component({
  selector: 'app-create-agency',
  templateUrl: './create-agency.component.html',
  styleUrls: ['./create-agency.component.sass']
})
export class CreateAgencyComponent implements OnInit {
  user: IAgencyInfo = new IAgencyInfo();
  currentUser: User;
  categories = [];
  // dragdrop file upload
  imagePath: any;
  message: string;
  imageData: any;
  imgURL: any;
  constructor(private dynamicScriptLoader: DynamicScriptLoaderService, public auth: AuthService , public api: ApiService, private router: Router) {
    this.auth.currentUser.subscribe(user => {
      this.currentUser = user;
    });
  }

  ngOnInit() {
    const pjdata  = JSON.parse(localStorage.getItem('agency-dup'));
    if (this.auth.agency == 1 && pjdata) {
      this.user = pjdata;
    } else {
      localStorage.removeItem('agency-dup');
    }
    this.fetchCategory();
    this.startScript();
  }
  setuser( f) {
    this.user = f.form.value;
    this.user.apikey = this.makeid(20);
    this.user.image = this.imageData;
    console.log( this.user);
    const pjdata: IAgencyInfo  = JSON.parse(localStorage.getItem('agency-dup'));
    if (this.auth.agency == 1 && pjdata) {
      this.user.id = pjdata.id;
    }
    if (this.user && this.user.id > 0 ) {
      this.api.put(`agency/create`, this.user ).subscribe(result => {
          if (result) {
            this.api.showNotification('bg-green', 'Agency updated successfully');
            this.router.navigate(['/users/agencies']);
          }
        },
        errResp => {
          this.api.showNotification('bg-red', errResp.error);
        });
    } else {
      this.api.put('agency/create', this.user).subscribe(result => {
          this.api.showNotification('bg-green', 'Agency created successfully');
          this.router.navigate(['/users/agencies']);
        },
        errResp => {
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
  fetchCategory() {
    this.api.get('categories').subscribe(result => {
        this.categories = result.categories;
      },
      errResp => {
      });
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
