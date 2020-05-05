import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ServiceVoitureService } from 'src/app/voiture.service';
import { VoitureIms } from 'src/app/models/voitureIms';
import { Observable, Subscription } from 'rxjs';
import { Voiture } from 'src/app/models/voiture';
import { map } from 'rxjs/operators';
import { DetailsVoitureComponent } from '../details-voiture/details-voiture.component';
import { GiphyService } from 'src/app/giphy.service';

@Component({
  selector: 'app-voiture',
  templateUrl: './listVoitures.component.html',
  styleUrls: ['./listVoitures.component.css'],
  providers: [DetailsVoitureComponent],
  encapsulation: ViewEncapsulation.None
})
export class VoitureComponent implements OnInit, OnDestroy {

  // variable pour la liste des voitures
  // tslint:disable-next-line: ban-types
  // listVoitures: Observable<VoitureIms[]>;
  responsiveOptions;
  voitures: VoitureIms[];
  voituresAndImsSubscription: Subscription;
  voituresAndImsByMdlSubscription: Subscription;
  modelesSubscription: Subscription;
  voituresByModel: VoitureIms[];
  listItems: VoitureIms[];
  detailsVoiture: any;
  modeles: any;
  hideList = false;
  visibleDetail = false;
  images: string[];
  url = '';
  image =  '<img src="" alt="logo" width="30px" style="margin-left: 17px;">';
  // tslint:disable-next-line: max-line-length
  constructor(private voitureService: ServiceVoitureService,
              ) {

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
   }

  ngOnInit() {
    // debut de subscription
    this.voitureService.getVoituresAndIms();

    this.voituresAndImsSubscription = this.voitureService.voituresAndImsSubject.subscribe(
      (voitures: VoitureIms[]) => {
        this.listItems = voitures;
      }
      );

    // fin de subscription
    this.images = [
      'voiture1',
      'voiture2',
      'voiture3',
      'voiture4'
    ];
    this.getModeles();
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    if (this.voituresAndImsSubscription) {
      this.voituresAndImsSubscription.unsubscribe();
    }
    if (this.modelesSubscription) {
      this.modelesSubscription.unsubscribe();
    }
  }

  getVoitureByModel(model: string) {
    this.hideList = true;
    console.log(model)
    this.voitureService.getVoituresAndImsByMdl(model);
    this.voituresAndImsByMdlSubscription = this.voitureService.voituresAndImsByMdlSubject.subscribe(
      (voitures: VoitureIms[]) => {
        this.voituresByModel = voitures;
        console.log('voiture by modele')
        console.log(voitures)
      });
  }

  getModeles() {
    this.voitureService.getModeles();
    this.modelesSubscription = this.voitureService.modelesSubject.subscribe(
      (modeles: any) => {
        this.modeles = modeles;
      }
    );
  }

   onSelect(voiture) {
    this.detailsVoiture = voiture;
    this.visibleDetail = true;
  }

  clickFermer() {
    this.visibleDetail = false;
    this.detailsVoiture = null;
  }

}
