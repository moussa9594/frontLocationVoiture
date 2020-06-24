import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, Subject, Subscription } from 'rxjs';
import { Reservation } from './models/reservation';
import { AngularFirestore } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root'
})
export class ReservationService {

  // tslint:disable-next-line: no-unused-expression
  reservationsSubject = new Subject<Reservation[]>();
  clientsSubject = new Subject<any>();
  voituresSubject = new Subject<any>();
  reservations: Reservation[];
  client: any
  clients = new Array<any>()
  voitures = new Array<any>()
  voiture: any
  emitClients() {
    this.clientsSubject.next(this.clients)
  }
  emitVoitures() {
    this.voituresSubject.next(this.voitures)
  }
  emitVoiture() {
    this.voituresSubject.next(this.voiture)
  }
  emitReservation() {
    this.reservationsSubject.next(this.reservations);
  }
  constructor(public http: HttpClient,
              private baseFire:AngularFirestore) { }

  // tslint:disable-next-line: ban-types
  // creerReservation(newReservation: Object): Observable<any> {
  //   return this.http.post(this.url + 'creerReservation', newReservation);
  // }

  getReservations() {
    this.baseFire.collection('reservation').snapshotChanges().subscribe(
      (reservations: Array<any>) => {
        this.reservations = reservations;
        reservations.forEach(elt => {
          this.getDocClient('client/' + elt.payload.doc.data().docClient)
          this.getVoiture('voiture/' + elt.payload.doc.data().docVoiture)
        });
        this.emitReservation();
      }
    );
  }

  getDocClient(docClient) {
    this.baseFire.doc(docClient).snapshotChanges().subscribe((client: any) => {
        this.clients.push(client)
        this.emitClients()
    })
  }
  getVoiture(docVoiture) {
    this.baseFire.doc(docVoiture).valueChanges().subscribe((voiture: any) => {
        this.voitures.push(voiture)
        this.emitVoitures()
    })
  }
  getDocVoiture(docVoiture) {
    this.baseFire.doc(docVoiture).snapshotChanges().subscribe((voiture: any) => {
      this.voiture = voiture
      this.emitVoiture()
    })
  }

  creerReservation(newReservation: any, voiture: any, client: any){
    return this.baseFire.collection('reservation').add({
      client: {
        prenom: client.prenom,
        nom: client.nom,
        sexe: client.sexe,
        telephone: client.telephone,
        date_naissance: client.date_naissance,
      },
      voiture: {
        model: voiture.model,
        marque: voiture.marque,
        nbre_porte: voiture.nbre_porte,
        description: voiture.description,
        prix_jour: voiture.prix_jour,
        stock: voiture.stock,
        images: {
          im1: voiture.images.im1,
          im2: voiture.images.im2,
          im3: voiture.images.im3
        }
      },
      debut_reservation: newReservation.debut_reservation,
      fin_reservation: newReservation.fin_reservation,
      prix_total: newReservation.prix_total,
      chauffeur: newReservation.chauffeur,
    }).then(function(docRef){
      console.log("Document reservation written with ID: ", docRef.id);
    })
}

}
