import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { VoitureIms } from './models/voitureIms';
import { catchError, map, tap, retry, filter } from 'rxjs/operators';
import { Voiture } from './models/voiture';

@Injectable({
  providedIn: 'root'
})
export class ServiceVoitureService {

    //  private url = 'http://localhost:8080/updateStockVoiture/1';
  private url = '//localhost:8080/';
  private VoitureIms = 'getVoitureIms';
  private Voiture = 'getVoiture';
  voituresAndIms: VoitureIms[];
  voituresAndImsByMdl: VoitureIms[];
  voitureAndIms: VoitureIms;
  voitures: Voiture[];
  voiture: Voiture;
  modeles: any;
  voituresAndImsSubject = new Subject<VoitureIms[]>();
  voituresAndImsByMdlSubject = new Subject<VoitureIms[]>();
  voitureAndImsSubject = new Subject<VoitureIms>();
  voitureSubject = new Subject<Voiture>();
  modelesSubject = new Subject<any>();

  emitVoiture() {
    this.voitureSubject.next(this.voiture);
  }
  emitVoituresAndIms() {
    this.voituresAndImsSubject.next(this.voituresAndIms);
  }
  emitVoituresAndImsByMdl() {
    this.voituresAndImsByMdlSubject.next(this.voituresAndImsByMdl);
  }
  emitVoitureAndIms() {
    this.voitureAndImsSubject.next(this.voitureAndIms);
  }
  emitModeles() {
    this.modelesSubject.next(this.modeles);
  }

  constructor(private http: HttpClient) { }

   // debut subject avec voitures
   // tslint:disable-next-line: variable-name
   getVoiture(id_voiture: number) {
    this.http.get<Voiture>(this.url + 'voiture/' + id_voiture).subscribe(
     (voiture: Voiture) => {
       this.voiture = voiture;
       this.emitVoiture();
     },
     (error: Voiture) => {
       console.log(error);
     },
     () => {
     }
   );
 }
// fin subject
   // debut subject avec voitures
   // tslint:disable-next-line: variable-name
   getVoituresAndIms() {
    this.http.get<any>(this.url + 'voituresAndIms/').subscribe(
     (voiture: VoitureIms[]) => {
       this.voituresAndIms = voiture;
       this.emitVoituresAndIms();
     },
     (error: VoitureIms[]) => {
       console.log(error);
     },
     () => {
     }
   );
 }
// fin subject
   // debut subject avec voitures
   // tslint:disable-next-line: variable-name
   getVoituresAndImsByMdl(model: string) {
    this.http.get<any>(this.url + 'voituresAndIms/').pipe(
      map(
        (voitures: VoitureIms[]) => voitures.filter(
          (voiture: VoitureIms) => voiture.model === model
        )
      )
    )
    .subscribe(
     (voiture: VoitureIms[]) => {
       this.voituresAndImsByMdl = voiture;
       this.emitVoituresAndImsByMdl();
     },
     (error: VoitureIms[]) => {
       console.log(error);
     },
     () => {
     }
   );
 }
// fin subject
   // debut subject avec voitures
   // tslint:disable-next-line: variable-name
   getVoitureAndIms(id_voiture: number) {
    this.http.get<any>(this.url + 'voitureAndIms/' + id_voiture).subscribe(
     (voiture: VoitureIms) => {
       this.voitureAndIms = voiture;
       this.emitVoitureAndIms();
     },
     (error: VoitureIms) => {
       console.log(error);
     },
     () => {
     }
   );
 }
// fin subject
  // debut subject avec modeles
      getModeles() {
       this.http.get<any>(this.url + 'getModeles').subscribe(
        (modeles: any) => {
          this.modeles = modeles;
          this.emitModeles();
        },
        (error: any) => {
          console.log(error);
        },
        () => {
        }
      );
    }
  // fin subject

  // methode pour creer une voiture
  // tslint:disable-next-line: ban-types
  creerVoiture(newVoiture: Object): Observable<Object> {
    return this.http.post(this.url + 'creerVoiture', newVoiture);
  }

  // methode pour recupérer une voiture selon l'id
  // tslint:disable-next-line: ban-types
  // tslint:disable-next-line: variable-name
  // getVoiture(id_voiture: number): Observable<any> {
  //   return this.http.get(this.url + 'getVoiture/' + id_voiture);
  // }

  // methode pour mettre à jour le stock d'une voiture selon l'id
  // tslint:disable-next-line: ban-types
  // tslint:disable-next-line: variable-name
  updateStockVoiture(id_voiture: number, value: any): Observable<any> {
    return this.http.get(this.url + 'updateStockVoiture/' + id_voiture, value);
  }

  // methode pour recupérer une voiture selon l'id avec ses images
  // tslint:disable-next-line: ban-types
  // tslint:disable-next-line: variable-name
  // getVoitureIms(id_voiture: number): Observable<any>  {
  //   return this.http.get(`${this.url}${this.VoitureIms}/${id_voiture}`);
  // }


  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }
}


