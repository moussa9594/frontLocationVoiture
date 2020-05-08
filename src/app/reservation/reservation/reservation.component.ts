import { Component, OnInit } from '@angular/core';
import { ServiceVoitureService } from 'src/app/voiture.service';
import { ActivatedRoute } from '@angular/router';
import { VoitureIms } from 'src/app/models/voitureIms';
import { Observable, Subscription } from 'rxjs';
import { GiphyService } from 'src/app/giphy.service';
import { Voiture } from 'src/app/models/voiture';
import { Client } from 'src/app/models/client';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  voitureAndImsSubscription: Subscription;
  voituresAndImsSubscription: Subscription;
  voitureReserver: VoitureIms;
  clientSubscription: Subscription;
  clientReserver: Client;
  voitures: VoitureIms[];
  url: Observable<any[]>;
  listVoitures: VoitureIms[];
  id_voiture: number;
  responsiveOptions;
  constructor(private serviceVoiture: ServiceVoitureService,
              public activeRoute: ActivatedRoute, private giphyService: GiphyService,
              private voitureService: ServiceVoitureService
             ) { }

  ngOnInit() {
    this.activeRoute.paramMap.subscribe(param => {
        // tslint:disable-next-line: radix
        this.id_voiture = parseInt( param.get('id_voiture') );
      });

    this.responsiveOptions = [
        {
            breakpoint: '1024px',
            numVisible: 3,
            numScroll: 3
        },
        {
            breakpoint: '768px',
            numVisible: 2,
            numScroll: 2
        },
        {
            breakpoint: '560px',
            numVisible: 1,
            numScroll: 1
        }
    ];
    // init liste voiture
    this.getVoituresAndIms();
    // init voiture reserver
    this.voitureService.getVoitureAndIms(this.id_voiture);
    this.voitureAndImsSubscription = this.voitureService.voitureAndImsSubject.subscribe(
      (voiture: VoitureIms) => {
        this.voitureReserver = voiture;
      }
    );
  }
   // recupération des voitures avec leurs images
   getVoituresAndIms() {
    this.voitureService.getVoituresAndIms();
    this.voituresAndImsSubscription = this.voitureService.voituresAndImsSubject.subscribe(
      (voitures: VoitureIms[]) => {
        this.voitures = voitures;
      }
    );
   }

}
