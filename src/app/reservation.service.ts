import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private url = '//localhost:8080/';
  constructor(public http: HttpClient) { }

  // tslint:disable-next-line: ban-types
  creerReservation(newReservation: Object): Observable<Object> {
    return this.http.post(this.url + 'creerReservation', newReservation);
  }
}
