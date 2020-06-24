import { Injectable, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, Subject } from 'rxjs';
import { VoitureIms } from './models/voitureIms';
import { catchError, map, tap, retry, filter } from 'rxjs/operators';
import { AngularFirestore, AngularFirestoreDocument, AngularFirestoreCollection } from '@angular/fire/firestore';
import { isNullOrUndefined } from 'util';
import { resolve } from 'url';

@Injectable({
  providedIn: 'root'
})
export class ServiceVoitureService {

    //  private url = 'http://localhost:8080/updateStockVoiture/1';
  // private url = '//locationvoiture.cfapps.io/';s
  private url = '';
  private VoitureIms = 'getVoitureIms';
  private Voiture = 'getVoiture';
  voituresAndIms: any;
  voituresAndImsByMdl: Array<any>;
  voitureAndIms: VoitureIms;
  voitures: VoitureIms[];
  voiture: VoitureIms;
  carsLastId: VoitureIms;
  modeles: any;
  carsFire: any;
  voituresAndImsSubject = new Subject<any>();
  carsFireSubject = new Subject<any>();
  voituresAndImsByMdlSubject = new Subject<VoitureIms[]>();
  voitureAndImsSubject = new Subject<VoitureIms>();
  voitureSubject = new Subject<VoitureIms>();
  carLastIdSubject = new Subject<VoitureIms>();
  modelesSubject = new Subject<any>();
  lastId: number;
  newVoiture: VoitureIms = new VoitureIms();

  test

  constructor(private http: HttpClient,
    private baseFire: AngularFirestore) { }

  emitVoiture() {
    this.voitureSubject.next(this.voiture);
  }
  emitCarsLastId() {
    this.carLastIdSubject.next(this.carsLastId);
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
          // teste avec firebase
          getUsers(){
            return new Promise<any>((resolve, reject) => {
              this.baseFire.collection('/voiture').snapshotChanges()
              .subscribe(snapshots => {
                resolve(snapshots)
              })
            })
          }

   // debut subject avec voitures
   // tslint:disable-next-line: variable-name
   getVoiture(id_voiture: number) {
    this.http.get<VoitureIms>(this.url + 'voiture/' + id_voiture).subscribe(
     (voiture: VoitureIms) => {
       this.voiture = voiture;
       this.emitVoiture();
     },
     (error: VoitureIms) => {
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
     new Promise<any>((resolve, reject) => {
      this.baseFire.collection('voiture').snapshotChanges().subscribe(
        (voiture: any) => {
          resolve(voiture)
          this.voituresAndIms = voiture;
          this.emitVoituresAndIms();
        },
        (error: VoitureIms[]) => {
          console.log(error);
        },
        () => {
        }
      );
     })
 }
// fin subject
   // debut subject avec voitures
   // tslint:disable-next-line: variable-name
   getVoituresAndImsByMdl(model: string) {
     new Promise<any>((resolve, reject) => {

      this.baseFire.collection('voiture', res => {
        return res.where('model', '==', model)
      }).snapshotChanges()
      .subscribe( (voiture: any) =>
       {
         resolve(voiture)
         this.voituresAndImsByMdl = voiture;
         this.emitVoituresAndImsByMdl();
       },
       (error: VoitureIms[]) => {
         console.log(error);
       },
       () => {
       }
     );
     })
 }
// fin subject
   // debut subject avec voitures
   // tslint:disable-next-line: variable-name

// fin subject
  // debut subject avec modeles
      getModeles() {
       this.baseFire.collection('modele').valueChanges().subscribe(
         (modeles: any) => {
           this.modeles = modeles
           this.emitModeles();
         }
       );
    }
  // fin subject

  // methode pour creer une voiture
  // tslint:disable-next-line: ban-types
  creerVoiture(newVoiture: VoitureIms, images: any){
      return this.baseFire.collection('voiture'). add({
        model: newVoiture.model,
        marque: newVoiture.marque,
        nbre_porte: newVoiture.nbre_porte,
        description: newVoiture.description,
        prix_jour: newVoiture.prix_jour,
        stock: newVoiture.stock,
        images: {
          im1: images.im1,
          im2: images.im2,
          im3: images.im3
        }
      }).then(function(docRef){
        console.log("Document written with ID: ", docRef.id);
      })
  }

  updateVoiture(doc: any, updateVoiture: VoitureIms){
    return this.baseFire.doc('voiture/' + doc).update({
      model: updateVoiture.model,
      marque: updateVoiture.marque,
      nbre_porte: updateVoiture.nbre_porte,
      description: updateVoiture.description,
      prix_jour: updateVoiture.prix_jour,
      stock: updateVoiture.stock,
      images: {
        im1: updateVoiture.images.im1,
        im2: updateVoiture.images.im2,
        im3: updateVoiture.images.im3
      }
    })
}
  // methode pour enregistrer un modele
  // tslint:disable-next-line: ban-types
  saveModele(modele: any, logo: any){
    return this.baseFire.collection('modele').add({
      model: modele,
      logo: logo
    })
}

getDoc(idDoc){
  return this.baseFire.doc('voiture/' + idDoc).valueChanges();
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
  updateStockVoiture(document, voitureReserver){
    return this.baseFire.doc('voiture/' + document).update({
      model: voitureReserver.model,
      marque: voitureReserver.marque,
      nbre_porte: voitureReserver.nbre_porte,
      description: voitureReserver.description,
      prix_jour: voitureReserver.prix_jour,
      stock: voitureReserver.stock -1 ,
      images: {
        im1: voitureReserver.images.im1,
        im2: voitureReserver.images.im2,
        im3: voitureReserver.images.im3
      }

    })
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


