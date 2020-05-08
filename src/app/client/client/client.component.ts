import { Component, OnInit } from '@angular/core';
import { Client } from 'src/app/models/client';
import { Reservation } from 'src/app/models/reservation';
import { Router } from '@angular/router';
import { ClientService } from 'src/app/client.service';
import { ReservationComponent } from 'src/app/reservation/reservation/reservation.component';
import { ServiceVoitureService } from 'src/app/voiture.service';
import { ReservationService } from 'src/app/reservation.service';
import { Observable, Subscription } from 'rxjs';
import { Voiture } from 'src/app/models/voiture';
import { VoitureIms } from 'src/app/models/voitureIms';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers: [MessageService]
})
export class ClientComponent implements OnInit {

  newClient: Client = new Client();
  id_voiture: number;
  // id_clientReserver: number;
  newReservation: Reservation = new Reservation();
  voitureSubscription: Subscription;
  voitureAndImsSubscription: Subscription;
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
  bool = true;
  testeClientNum: Client;
  showBtnSuccess = false;
  success = '';

  constructor(
    private routeClient: Router,
    private clientService: ClientService,
    private messageService: MessageService,
    private voitureService: ServiceVoitureService,
    private reservationService: ReservationService,
    private reservationComponent: ReservationComponent,
    ) { }

  ngOnInit() {
    // recupération de l'id_voiture dépuis le compononet reservationComponent
    this.reservationComponent.activeRoute.paramMap.subscribe(
      // tslint:disable-next-line: radix
      params => this.id_voiture = parseInt(params.get('id_voiture')));
      this.getVoitureAndIms();

  }

   // recupération de la voiture avec l'id_voiture et ses images
   getVoitureAndIms() {
    this.voitureService.getVoitureAndIms(this.id_voiture);
    this.voitureAndImsSubscription = this.voitureService.voitureAndImsSubject.subscribe(
      (voiture: VoitureIms) => {
        this.voitureReserver = voiture;
        this.prixJourVoitureReserver = this.voitureReserver.prix_jour;
        this.newReservation.voiture = this.voitureReserver;
      }
    );
   }
  ifExistNumClient() {
    this.telephoneClient = this.newClient.telephone.toString();
    this.clientService.getClientByTel(this.telephoneClient).subscribe(
      data => {
        if(data == null) {
          this.enregistrerClient();
        }
      }
    );
  }

  updateStockVoiture() {
    this.voitureReserver.stock = this.voitureReserver.stock - 1;
    this.voitureService.creerVoiture(this.voitureReserver)
      .subscribe(data => console.log(data), error => console.log(error));
  }

  enregistrerClient() {
    if (this.newClient.sexe == null) {
      this.newClient.sexe = 'm';
    }
    this.clientService.enregistrerClient(this.newClient)
      .subscribe(data => {
        this.clientReserver = data;
        this.newReservation.client = this.clientReserver;
        console.log('le client enregistrer: ');
        console.log(this.clientReserver);
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
    const moisFin = parseInt(dateFin[1]);
    const anneeDebut = parseInt(dateDebut[0]);
    const anneeFin = parseInt(dateFin[0]);
    // comparer les années et les mois
    if ((anneeDebut !== anneeFin) || (moisDebut !== moisFin)) {
      // tslint:disable-next-line: max-line-length
      this.messageService.add({severity: 'error', life: 5000, summary: 'La réservation doit se faire dans le même mois de l\'année.', detail: ''});
    } else if (jourDebut > jourFin) {
      // tslint:disable-next-line: max-line-length
      this.messageService.add({severity: 'error', life: 5000, summary: 'La date de début de la réservation doit être en dessous de celle de la fin de réservation.', detail: ''});
    } else if ((jourFin - jourDebut) < 1) {
      this.messageService.add({severity: 'error', life: 5000, summary: 'La réservation doit se faire au moins 24h.', detail: ''});
    } else {
      // // Enregistrement du client et recupèration selon le numéro de tel de neWClient
      this.ifExistNumClient();
      // enregistrement de la reservation
      this.enregistrerReservation();
      this.updateStockVoiture();
      this.success = 'Votre reservation a été prise en compte. Rendez-vous au plutard demain à 16h pour finaliser'
       + ' et recevoir votre voiture. Passer ce délai la voiture pourra être réserver par un autre client.'
      + 'Sall&Frère Location vous remercie de votre fidélité.';
      this.showBtnSuccess = true;
    }
  }

  onClickBtnSuccess() {
    this.routeClient.navigate(['']);
  }

  enregistrerReservation() {
    // this.clientRecuperer();
    this.reservationService.creerReservation(this.newReservation)
      .subscribe(data => {
        console.log('methode enregistrer reservation')
        console.log(data);
      });
  }
  // action à faire à la validation du formulaire de client
  onSubmitClient() {
    console.log('valeur retourner..')
    this.ifExistNumClient();
    // this.enregistrerClient();
    if ((this.newClient.prenom.length <= 0) || (this.newClient.telephone == null)
      || (this.newClient.date_naissance.toString().length <= 0) || (this.newClient.nom.length <= 0)) {
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
    // tslint:disable-next-line: radix
    // Calcul du nbre de jour de reservation
    this.nbreJourReservation = this.fin - this.debut;
    // calcul du prix total
    this.prixTotal = this.nbreJourReservation * this.prixJourVoitureReserver;
    console.log(this.newReservation.prix_total)
    console.log(this.newReservation.chauffeur)
    if (this.newReservation.chauffeur != null) {
      this.newReservation.prix_total = this.prixTotal + 5000;
    } else {
      this.newReservation.prix_total = this.prixTotal;
    }
    // controle des dates
    this.controleDate(this.newReservation.debut_reservation, this.newReservation.fin_reservation);

  }

}
