import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Client } from './models/client';

@Injectable({
  providedIn: 'root'
})
export class ClientService {

  creerClient = 'creerClient';
  leClientById = 'getClient';
  leClientByTel = 'getClientByTel';
  private url = '//localhost:8080/';
  // teste = 'http://localhost:8080/getClientByTel/yt';
  constructor(private http: HttpClient) { }

  // methode pour enregistrer un client qui a commander
  // tslint:disable-next-line: ban-types
  enregistrerClient(client: any): Observable<any> {
    return this.http.post(`${this.url}${this.creerClient}`, client );
  }

  // tslint:disable-next-line: variable-name
  getClient(id_client: number): Observable<any>  {
    return this.http.get(`${this.url}${this.leClientById}/${id_client}`);
  }

  // tslint:disable-next-line: variable-name
  getClientByTel(tel: any): Observable<any>  {
    return this.http.get(`${this.url}${this.leClientByTel}/${tel}`);
  }

}
