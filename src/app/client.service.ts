import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './models/client';
import { AngularFirestore } from '@angular/fire/firestore';
import { ReservationService } from './reservation.service';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  // creerClient = 'creerClient';
  leClientById = 'getClient';
  leClientByTel = 'getClientByTel';
  private url = '//locationvoiture.cfapps.io/';
  // teste = 'http://localhost:8080/getClientByTel/yt';
  constructor(private http: HttpClient,
              private baseFire: AngularFirestore,
              public serviceReservation: ReservationService) { }

  // methode pour enregistrer un client qui a commander
  // tslint:disable-next-line: ban-types
  // enregistrerClient(client: any): Observable<any> {
  //   return this.http.post(`${this.url}${this.creerClient}`, client );
  // }

  // tslint:disable-next-line: variable-name
  getClient(id_client: number): Observable<any>  {
    return this.http.get(`${this.url}${this.leClientById}/${id_client}`);
  }

  // tslint:disable-next-line: variable-name
  getClientByTel(tel: any){
    return this.baseFire.collection('client', ref => {
      return ref.where('telephone', '==', tel)
    }).snapshotChanges()
  }

  insererReservation(reservation, voiture, client){
    this.serviceReservation.creerReservation(reservation, voiture, client).then(res => {})
  }

  creerClient(newClient: any){
    return this.baseFire.collection('client').add({
      prenom: newClient.prenom,
      nom: newClient.nom,
      sexe: newClient.sexe,
      telephone: newClient.telephone,
      date_naissance: newClient.date_naissance,
    })
}

}
