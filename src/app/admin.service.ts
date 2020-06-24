import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject, Observable } from 'rxjs';
import { map } from 'rxjs/operators';

import { environment } from 'src/environments/environment';
import { Admin } from '../app/models/login';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({ providedIn: 'root' })
export class AuthenticationService {
  private currentUserSubject: BehaviorSubject<Admin>;
  public currentUser: Observable<Admin>;

  constructor(private fire: AngularFirestore) {
    this.currentUserSubject = new BehaviorSubject<Admin>(JSON.parse(localStorage.getItem('currentUser')));
    this.currentUser = this.currentUserSubject.asObservable();
  }

  public get currentUserValue(): Admin {
    return this.currentUserSubject.value;
  }


  login(email: string) {
    return this.fire.collection('users', res => {
      return res.where('email', '==', email)
    }).valueChanges().pipe(map((admin: any) => {
      // store user details and jwt token in local storage to keep user logged in between page refreshes
      console.log('--service--')
      const adminString = JSON.stringify(admin[0]);
      localStorage.setItem('currentUser', adminString);
      console.log(adminString)
      // console.log(admin[0].email)
      console.log(admin[0].token)
      this.currentUserSubject.next(admin[0]);
      return admin;
    }));
  }

  logout() {
    // remove user from local storage to log user out
    localStorage.removeItem('currentUser');
    this.currentUserSubject.next(null);
  }
}
