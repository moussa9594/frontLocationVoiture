import { Component, OnInit, Input, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReservationService } from '../reservation.service';
import { ImageService } from '../image.service';
import { Reservation } from '../models/reservation';
import { Images } from '../models/images';

@Component({
  selector: 'app-gestion-reservations',
  templateUrl: './gestion-reservations.component.html',
  styleUrls: ['./gestion-reservations.component.css']
})
export class GestionReservationsComponent implements OnInit, OnDestroy {

  constructor(
              private reservationService: ReservationService,
              private imageService: ImageService
  ) { }

  @Input() showReservation: boolean;
  cacheDetail = false;
  reservationsSubscription: Subscription;
  imageSubscription: Subscription;
  image: Images;
  reservations: Reservation[];
  detailReservation: Reservation;
  clients
  voitures: Array<any>
  ngOnInit() {
    // init getResrvations
    console.log('init')
    console.log(this.detailReservation)
    this.reservationService.getReservations();
    this.getResrvations();
    this.getClients()
    this.getVoitures()
      this.getImage();
  }
  getResrvations() {
    this.reservationsSubscription = this.reservationService.reservationsSubject.subscribe(
      (reservations: Array<any>) => {
        this.reservations = reservations;
      }
    );
  }

  getClients() {
    this.reservationService.clientsSubject.subscribe(
      (clients: Array<any>) => {
        this.clients = clients

      }
    )
  }
  getVoitures() {
    this.reservationService.voituresSubject.subscribe(
      (voitures: Array<any>) => {
        this.voitures = voitures
      }
    )
  }

  getImage() {
    this.imageSubscription = this.imageService.imageSubject.subscribe(
      (image: Images) => {
        this.image = image

      }
    );
  }
  onClick(reservation) {
    this.detailReservation = reservation;
    this.cacheDetail = true;
      // a venir
    // this.imageService.getImages(this.detailReservation.voiture.id_voiture);
  }

  ngOnDestroy() {
    if(this.reservationsSubscription) {
      this.reservationsSubscription.unsubscribe();
    }
  }

}
