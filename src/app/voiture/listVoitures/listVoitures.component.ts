import { Component, OnInit, OnDestroy, ViewEncapsulation } from '@angular/core';
import { ServiceVoitureService } from 'src/app/voiture.service';
import { VoitureIms } from 'src/app/models/voitureIms';
import { Observable, Subscription } from 'rxjs';
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
  voituresByModel: any;
  listItems: Array<any>;
  users: Array<any>
  detailsVoiture: any;
  modeles: any;
  hideList = false;
  visibleDetail = false;
  images: string[];
  url = '';
  search: string;
  hideRep = true;
  gif = ''
  // tslint:disable-next-line: max-line-length
  constructor(private voitureService: ServiceVoitureService,
              private serviceGif: GiphyService,
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
    //

    //


    this.voitureService.getVoituresAndIms();

    this.voitureService.getUsers().then((res: any) => {
      // console.log(res[0].payload.doc.data())
  });



    this.voituresAndImsSubscription = this.voitureService.voituresAndImsSubject.subscribe(
      (voitures: any) => {
        this.listItems = voitures;
      }
      );

    // fin de subscription
    this.images = [
      'cap1',
      'cap2'
    ];
    this.getModeles();

    // affiche pas de reponse
    if(this.voituresByModel !== undefined && this.voituresByModel.length === 0){
      this.hideRep = false;
    }

    // gif
    this.serviceGif.gif('audi').subscribe(
      (gif: any) => this.gif = gif
    );
  }


  getVoitureByModel(model: string) {
    this.hideList = true;
    this.search = model;
    this.voitureService.getVoituresAndImsByMdl(model);
    this.voituresAndImsByMdlSubscription = this.voitureService.voituresAndImsByMdlSubject.subscribe(
      (voitures: any) => {
        this.voituresByModel = voitures;
        console.log('voiture by modele')
        console.log(voitures.length)
        // affiche pas de reponse
    if(this.voituresByModel !== undefined && this.voituresByModel.length === 0){
      this.hideRep = false;
    } else{
      this.hideRep = true;
    }
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
    console.log(voiture)
  }

  clickFermer() {
    this.visibleDetail = false;
    this.detailsVoiture = null;
  }

  // tslint:disable-next-line: use-lifecycle-interface
  ngOnDestroy() {
    if (this.voituresAndImsSubscription) {
      this.voituresAndImsSubscription.unsubscribe();
    }
    if (this.modelesSubscription) {
      this.modelesSubscription.unsubscribe();
    }

    if(this.voituresAndImsByMdlSubscription) {
      this.voituresAndImsByMdlSubscription.unsubscribe();
    }
  }
}
