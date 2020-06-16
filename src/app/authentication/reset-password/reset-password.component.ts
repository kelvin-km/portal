import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from "@angular/forms";
import {ActivatedRoute, Router} from "@angular/router";
import {ApiService} from "../../services/api.services";

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.sass']
})
export class ResetPasswordComponent implements OnInit {
  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  show = false;
  constructor(private formBuilder: FormBuilder,
              private route: ActivatedRoute,
              private router: Router,
              public api: ApiService) { }

  ngOnInit() {
  //   const uid = this.route.snapshot.paramMap.get('uid');
  //   const token = this.route.snapshot.paramMap.get('token');
  // console.log('uid + token')
  // console.log(uid + token)
  this.loginForm = this.formBuilder.group({
      password: [null, Validators.compose([Validators.required, Validators.minLength(3)])],
    });
  }
  get f() { return this.loginForm.controls; }
  toggleShow() {
    this.show = !this.show;

  }
  onSubmit() {
    this.submitted = true;
    // stop here if form is invalid
    if (this.loginForm.valid) {
      this.api.post('api/user/reset_password_confirm/?uid=1&token=5d3-df859f5df67c224c660f', this.loginForm.value).subscribe(
        result => {
          this.api.showNotification('bg-green', result.message );
        },
        errResp => {
          this.api.showNotification('bg-red', 'Password reset failed');
        }
      );
    } else {
      this.api.showNotification('bg-red', 'Password reset failed');
    }


  }
}
