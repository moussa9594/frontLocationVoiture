import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject } from 'rxjs';
import { Reservation } from './models/reservation';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  private url = '//localhost:8080/';

  // tslint:disable-next-line: no-unused-expression
  reservationsSubject = new Subject<Reservation[]>();
  reservations: Reservation[];
  emitReservation() {
    this.reservationsSubject.next(this.reservations);
  }
  constructor(public http: HttpClient) { }

  // tslint:disable-next-line: ban-types
  creerReservation(newReservation: Object): Observable<any> {
    return this.http.post(this.url + 'creerReservation', newReservation);
  }

  getReservations() {
    this.http.get<Reservation[]>(this.url + 'listReservations').subscribe(
      (reservations: Reservation[]) => {
        this.reservations = reservations;
        this.emitReservation();
      }
    );
  }
}
