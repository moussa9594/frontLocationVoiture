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
  ngOnInit() {
    // init getResrvations
    console.log('init')
    console.log(this.detailReservation)
    this.reservationService.getReservations();
    this.getResrvations();
      this.getImage();
  }
  getResrvations() {
    this.reservationsSubscription = this.reservationService.reservationsSubject.subscribe(
      (reservations: Reservation[]) => {
        this.reservations = reservations;
      }
    );
  }

  getImage() {
    this.imageSubscription = this.imageService.imageSubject.subscribe(
      (image: Images) => {
        this.image = image
        console.log('image')
        console.log(this.image)
      }
    );
  }
  onClick(reservation) {
    this.detailReservation = reservation;
    this.cacheDetail = true;
    this.imageService.getImages(this.detailReservation.voiture.id_voiture);
  }

  ngOnDestroy() {
    if(this.reservationsSubscription) {
      this.reservationsSubscription.unsubscribe();
    }
  }

}
