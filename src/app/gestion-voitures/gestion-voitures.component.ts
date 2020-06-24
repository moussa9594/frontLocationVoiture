import { Component, OnInit, Input } from '@angular/core';
import { ServiceVoitureService } from '../voiture.service';
import { Subscription } from 'rxjs';
import { VoitureIms } from '../models/voitureIms';
import { map } from 'rxjs/operators';

@Component({
  selector: 'app-gestion-voitures',
  templateUrl: './gestion-voitures.component.html',
  styleUrls: ['./gestion-voitures.component.css']
})
export class GestionVoituresComponent implements OnInit {

  @Input() showVoiture = false;
  showModifier = false;
  visibleDetail = false;
  showList = false;
  voitureSubsription: Subscription;
  voitureByMdlSubsription: Subscription;
  modeleSubsription: Subscription;
  voitures: Array<any>;
  modifierVoiture: VoitureIms;
  voituresByModele: Array<any>;
  detailsVoiture: any;
  modeles: any;
  url = ''
  constructor(private serviceVoiture: ServiceVoitureService) { }

  ngOnInit() {
    // voitures
    this.serviceVoiture.getVoituresAndIms();
    this.serviceVoiture.voituresAndImsSubject.subscribe(
      (voitures: VoitureIms[]) => {
        this.voitures = voitures;
      }
    );
    // modeles
    this.serviceVoiture.getModeles();
    this.modeleSubsription = this.serviceVoiture.modelesSubject.subscribe(
      (modeles: any) => {
        this.modeles = modeles;
      }
    );
    // actualisation de la liste des voitures
    // tslint:disable-next-line: no-unused-expression
    this.voitures;
  }

  getVoitureByModel(modele: string) {
    this.serviceVoiture.getVoituresAndImsByMdl(modele);
    this.voitureByMdlSubsription = this.serviceVoiture.voituresAndImsByMdlSubject.subscribe(
      voitures => {
        this.voituresByModele = voitures
        this.showList = true
      }
    );
  }

  onSelect(voiture) {
    this.detailsVoiture = voiture;
    this.visibleDetail = true;
  }
  clickFermer() {
    this.detailsVoiture = null;
    this.visibleDetail = false;
  }

  onClickModifier(voiture: VoitureIms) {
    this.modifierVoiture = voiture;
    this.showModifier = false;
    this.showVoiture = false;
    this.visibleDetail = false;
  }

}
