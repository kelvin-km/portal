import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { Router } from '@angular/router';
import {User} from '../shared/interfaces/user.model';

@Injectable()
export class AuthService {

  storageKey = 'tkn';
  cuk = 'bup';
  updateproject = 0;
  updateuser = 0;
  update = 0;
  customer = 0;
  agency = 0;
  isaform = 0;

  private currentUserSubject: BehaviorSubject<User>;
  public currentUser: Observable<User>;


  constructor(private router: Router) {
    const bup = localStorage.getItem(this.cuk) ? localStorage.getItem(this.cuk) : '{}';
    this.currentUserSubject = new BehaviorSubject<User>(JSON.parse(bup));
    this.currentUser = this.currentUserSubject.asObservable();

  }

  public get currentUserValue(): User {
    return this.currentUserSubject.value;
  }

  setToken(token: string) {
    localStorage.setItem(this.storageKey, token);
  }

  setCurrentUser(userProfile: User) {
    localStorage.setItem(this.cuk, JSON.stringify(userProfile));
    this.currentUserSubject.next(userProfile);
  }

  getToken() {
    return localStorage.getItem(this.storageKey);
  }

  isLoggedIn() {
    return this.getToken() !== null;
  }

  logout() {
    localStorage.clear();
  }

}
