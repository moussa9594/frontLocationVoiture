import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { VoitureIms } from './models/voitureIms';

@Injectable({
  providedIn: 'root'
})
export class ServiceVoitureService {

    //  private url = 'http://localhost:8080/updateStockVoiture/1';
  private url = '//localhost:8080/';
  private VoitureIms = 'getVoitureIms';
  private Voiture = 'getVoiture';
  constructor(private http: HttpClient) { }

  // methode de recupértion de la liste des voitures
  // tslint:disable-next-line: ban-types
  listVoitures(): Observable<any> {
    return this.http.get(this.url + 'listVoitures');
  }

  // methode pour creer une voiture
  // tslint:disable-next-line: ban-types
  creerVoiture(newVoiture: Object): Observable<Object> {
    return this.http.post(this.url + 'creerVoiture', newVoiture);
  }

  // methode pour recupérer une voiture selon l'id
  // tslint:disable-next-line: ban-types
  // tslint:disable-next-line: variable-name
  getVoiture(id_voiture: number): Observable<any> {
    return this.http.get(this.url + 'getVoiture/' + id_voiture);
  }

  // methode pour mettre à jour le stock d'une voiture selon l'id
  // tslint:disable-next-line: ban-types
  // tslint:disable-next-line: variable-name
  updateStockVoiture(id_voiture: number, value: any): Observable<any> {
    return this.http.get(this.url + 'updateStockVoiture/' + id_voiture, value);
  }

  // methode pour recupérer une voiture selon l'id avec ses images
  // tslint:disable-next-line: ban-types
  // tslint:disable-next-line: variable-name
  getVoitureIms(id_voiture: number): Observable<any>  {
    return this.http.get(`${this.url}${this.VoitureIms}/${id_voiture}`);
  }


}


