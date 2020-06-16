import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {ApiService} from '../../services/api.services';

declare const $: any;

@Component({
    selector: 'app-forgot-password',
    templateUrl: './forgot-password.component.html',
    styleUrls: ['./forgot-password.component.scss']
})
export class ForgotPasswordComponent implements OnInit {

    loginForm: FormGroup;
    submitted = false;
    returnUrl: string;

    constructor(private formBuilder: FormBuilder,
                private route: ActivatedRoute,
                private router: Router,
                public api: ApiService) { }

    ngOnInit() {
        this.loginForm = this.formBuilder.group({
          email: [null, Validators.compose([Validators.required, Validators.email])],
        });

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';

        //    [Focus input] * /
        $('.input100').each(function () {
            $(this).on('blur', function () {
                if ($(this).val().trim() != "") {
                    $(this).addClass('has-val');
                }
                else {
                    $(this).removeClass('has-val');
                }
            });
        });
    }
    get f() { return this.loginForm.controls; }

    onSubmit() {
        this.submitted = true;
        // stop here if form is invalid
        if (this.loginForm.valid) {
          this.api.post('api/user/reset_password/', this.loginForm.value).subscribe(
            result => {
              this.api.showNotification('bg-green', result.message );
            },
            errResp => {
              this.api.showNotification('bg-red', 'Invalid Email address');
            }
          );
        } else {
          this.api.showNotification('bg-red', 'Invalid Email address');
        }


    }
}
