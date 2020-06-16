import { Injectable } from '@angular/core';

import { HttpClient, HttpParams, HttpHeaders, HttpErrorResponse } from '@angular/common/http';
import { Observable, throwError } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';


import { AuthService } from './auth.service';
import {environment} from '../../environments/environment';
declare const $: any;
@Injectable()
export class ApiService {

  private baseUrl = environment.apiUrl;

  constructor(
    private _httpClient: HttpClient,
    private auth: AuthService) { }

  get(url: string) {
    return this.request(url, 'GET');
  }

  post(url: string, body: Object) {
    return this.request(url, 'POST', body);
  }

  put(url: string, body: Object) {
    return this.request(url, 'PUT', body);
  }

  patch(url: string, body: Object) {
    return this.request(url, 'PATCH', body);
  }

  delete(url: string) {
    return this.request(url, 'DELETE');
  }

  request(reqUrl: string, method: string, body?: Object): Observable<any> {
    const url = `${this.baseUrl}/${reqUrl}`;

    let headers = new HttpHeaders();
    // if (this.auth.isaform == 1)
    // {       headers = headers.set('Content-Type', 'multipart/form-data');
    // }
    // else {
    headers = headers.set('Content-Type', 'application/json');
    // }


    if (this.auth.getToken()) {
      headers = headers.set('Authorization', 'Token ' + this.auth.getToken());

    }


    // const at = this.auth.getToken();
    const params = new HttpParams();
    // params = params.set('Authorization', 'Token' + this.auth.getToken());
    // params = params.set('Authorization', 'Token 5f3e92df8f973ccbbae3ef7fc0a3231322ceb87e');

    const reqOpt = {
      body: body ? body : {},
      headers
    };

    if (body) { } else {
      delete reqOpt.body;
    }
    // if (at) { } else {
    //   delete reqOpt.params;
    // }
    return this._httpClient.request<any>(method, url, reqOpt)
      .pipe(
        tap(data => {
          // console.log('server data:', data);
        }),
        catchError(this.handleError(url))
      );
  }

  private handleError(operation: string) {
    return (err: any) => {
      let errResp = {};
      if (err instanceof HttpErrorResponse) {
        errResp = {
          op: operation,
          status: err.status,
          statusText: err.statusText,
          error: err.error.error
        };
      }
      if (err.status === 401) {
        this.auth.logout();
      }
      return throwError(errResp);
    };
  }

  showNotification(colorName, text, placementFrom = 'top', placementAlign= 'right', animateEnter = 'animated fadeInRight', animateExit = 'animated fadeOutRight') {
    if (colorName === null || colorName === '') {
      colorName = 'bg-black';
    }
    if (text === null || text === '') {
      text = 'Turning standard Bootstrap alerts';
    }
    if (animateEnter === null || animateEnter === '') {
      animateEnter = 'animated fadeInDown';
    }
    if (animateExit === null || animateExit === '') {
      animateExit = 'animated fadeOutUp';
    }
    const allowDismiss = true;

    $.notify(
      {
        message: text
      },
      {
        type: colorName,
        allow_dismiss: allowDismiss,
        newest_on_top: true,
        timer: 1000,
        placement: {
          from: placementFrom,
          align: placementAlign
        },
        animate: {
          enter: animateEnter,
          exit: animateExit
        },
        template:
          '<div data-notify="container" class="bootstrap-notify-container alert alert-dismissible {0} ' +
          (allowDismiss ? 'p-r-35' : '') +
          '" role="alert">' +
          '<span data-notify="icon"></span> ' +
          '<span data-notify="title">{1}</span> ' +
          '<span data-notify="message">{2}</span>' +
          '<div class="progress" data-notify="progressbar">' +
          '<div class="progress-bar progress-bar-{0}" role="progressbar" aria-valuenow="0" aria-valuemin="0" aria-valuemax="100" style="width: 0%;"></div>' +
          '</div>' +
          '<a href="{3}" target="{4}" data-notify="url"></a>' +
          '</div>'
      }
    );
  }
}
