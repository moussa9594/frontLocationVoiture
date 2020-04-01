import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { Reservation } from 'src/app/models/reservation';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/client.service';
import { ReservationComponent } from 'src/app/reservation/reservation/reservation.component';
import { ServiceVoitureService } from 'src/app/voiture.service';
import { ReservationService } from 'src/app/reservation.service';
import { Observable } from 'rxjs';
import { Voiture } from 'src/app/models/voiture';

@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css']
})
export class ClientComponent implements OnInit {

  newClient: Client = new Client();
  id_voiture: number;
  // id_clientReserver: number;
  newReservation: Reservation = new Reservation();
  voitureReserver: Voiture;
  clientReserver: Client;
  prixJourVoitureReserver: number;
  nbreJourReservation: number;
  prixTotal: number;
  telephoneClient: string;
  voiture: number;
  debut: any;
  fin: any;
  cache = true;
  cacheForm = false;
  bool= true;
  testeClientNum: Client;

  constructor( private router: Router ,
               private clientService: ClientService,
               private reservationService: ReservationService,
               private voitureService: ServiceVoitureService,
               private reservationComponent: ReservationComponent ) { }

  ngOnInit() {
    // recupération de l'id_voiture dépuis le compononet reservationComponent
    this.reservationComponent.route.paramMap.subscribe(
      // tslint:disable-next-line: radix
      params => this.id_voiture = parseInt(params.get('id_voiture')));
    this.voitureService.getVoiture(this.id_voiture)
    .subscribe(data => {
      this.voitureReserver = data;
      this.voiture = this.voitureReserver.id_voiture;
      this.newReservation.voiture = this.voiture;
      console.log('la voiture recupérer')
      console.log(this.voitureReserver);
      console.log('l\'id du voiture reserver:');
      console.log(this.newReservation.voiture)
      // recupération du prix de la location par jour
      this.prixJourVoitureReserver =  this.voitureReserver.prix_jour;
      // console.log(this.prixJourVoitureReserver);
    });
  }

  // methode vérifiant si le numéro de telephone existe deja ds la base
  ifExistNumClient() {
     this.clientService.getClientByTel(this.newClient.telephone).subscribe(
      data  => {
        if(!data) {
          this.enregistrerClient();
        } else {
          console.log('le client existe déja');
        }
      }
      )
  }
  updateStockVoiture() {
    this.voitureReserver.stock = this.voitureReserver.stock - 1;
    this.voitureService.creerVoiture(this.voitureReserver)
    .subscribe(data => console.log(data), error => console.log(error));
  }

  enregistrerClient() {
    if(this.newClient.sexe == null) {
      this.newClient.sexe = 'm';
    }
    this.clientService.enregistrerClient(this.newClient)
    .subscribe(data =>{
      // this.newReservation.client = data;
      console.log('le client enregistrer: ');
    });
  }

  // fonction pour controler les dates
  controleDate(debut: Date, fin: Date) {
    const dateDebut = debut.toString().split('-');
    const dateFin = fin.toString().split('-');
    // recupération des jour en nombre pour les dates, de l'années et du mois en chaine
    // tslint:disable-next-line: radix
    const jourDebut = parseInt(dateDebut[2]);
    // tslint:disable-next-line: radix
    const jourFin = parseInt(dateFin[2]);
    const moisDebut = parseInt(dateDebut[1]);
    const moisFin =  parseInt(dateFin[1]);
    const anneeDebut = parseInt(dateDebut[0]);
    const anneeFin = parseInt(dateFin[0]);
    // comparer les années et les mois
    if ((anneeDebut !== anneeFin) || (moisDebut !== moisFin)) {
        alert('La réservation doit se faire dans le même mois de l\'année.')
    } else if (jourDebut > jourFin) {
        alert('La date de début de la réservation doit être en dessous de celle de la fin de réservation.')
  } else if ((jourFin - jourDebut) < 1) {
      alert('La réservation doit se faire au moins 24h.')
} else {
  // // Enregistrement du client et recupèration selon le numéro de tel de neWClient
  this.ifExistNumClient();
  // enregistrement de la reservation
  this.enregistrerReservation();
  this.updateStockVoiture();
  alert('Votre reservation a été prise en compte. Rendez-vous au plutard demain à 16h pour finaliser'
          + ' et recevoir votre voiture. Passer ce délai la voiture pourra être réserver par un autre client.'
          + '\nSall&Frère Location vous remercie de votre fidélité.');
  this.router.navigate(['']);
}
  }

  enregistrerReservation() {
    // this.clientRecuperer();
    this.reservationService.creerReservation(this.newReservation)
    .subscribe(data => {
      console.log(data);

    });
    // this.newClient = new Client();
  }
  // action à faire à la validation du formulaire de client
  onSubmitClient() {
    console.log('valeur retourner..')
    this.ifExistNumClient();
    // this.enregistrerClient();
    if((this.newClient.prenom.length <=0) || (this.newClient.telephone  == null)
      || (this.newClient.date_naissance.toString().length <=0) || (this.newClient.nom.length <=0)) {
      alert('Tous les champs sont obligatoires.')
    } else {
      this.cache = false;
      this.cacheForm = true;
    }
  }
  // action à faire à la validation du formulaire de reservation
  onSubmit() {
    // tslint:disable-next-line: radix
    this.debut = parseInt(this.newReservation.debut_reservation.toString().split('-')[2]);
    // tslint:disable-next-line: radix
    this.fin = parseInt(this.newReservation.fin_reservation.toString().split('-')[2]);
    this.newReservation.telephoneClient = this.newClient.telephone ;
    // tslint:disable-next-line: radix
    // Calcul du nbre de jour de reservation
    this.nbreJourReservation = this.fin - this.debut;
    // calcul du prix total
    this.prixTotal = this.nbreJourReservation * this.prixJourVoitureReserver;
    if (this.newReservation.chauffeur != null) {
      this.newReservation.prix_total = this.prixTotal + 5000;
    } else {
      this.newReservation.prix_total = this.prixTotal;
    }
    // controle des dates
    this.controleDate(this.newReservation.debut_reservation, this.newReservation.fin_reservation);

  }

}
