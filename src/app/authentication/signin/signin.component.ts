import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {Roles, User} from '../../shared/interfaces/user.model';
import {ApiService} from '../../services/api.services';
import {AuthService} from '../../services/auth.service';

declare const $: any;

@Component({
    selector: 'app-signin',
    templateUrl: './signin.component.html',
    styleUrls: ['./signin.component.scss']
})
export class SigninComponent implements OnInit {

  loginForm: FormGroup;
  submitted = false;
  returnUrl: string;
  username: string;
  password: string;
  user: User;
  role: Roles = new Roles();
  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    public api: ApiService,
    public auth: AuthService
  ) {}

  ngOnInit() {
    localStorage.setItem('menu_option', 'menu_dark');
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });

    // get return url from route parameters or default to '/'
    this.returnUrl = this.route.snapshot.queryParams.returnUrl || '/';

    //    [Focus input] * /
    $('.input100').each(function() {
      $(this).on('blur', function() {
        if (
          $(this)
            .val()
            .trim() != ''
        ) {
          $(this).addClass('has-val');
        } else {
          $(this).removeClass('has-val');
        }
      });
    });
  }
  get f() {
    return this.loginForm.controls;
  }

  onSubmit() {
    this.submitted = true;

    // stop here if form is invalid
    if (this.loginForm.invalid) {
      return;
    } else {
      this.validateUser(this.loginForm.value);
    }
  }

  validateUser(payload: any) {
    this.api.post('user/authenticate', payload).subscribe(
      result => {
        this.auth.setToken(result.user.token);
        this.auth.setCurrentUser(result.user);
        this.router.navigate(['/dashboard/main']);
      },
      errResp => {
        console.log(errResp);
        this.api.showNotification('bg-red', 'Invalid username or password');
      }
    );
  }

}
