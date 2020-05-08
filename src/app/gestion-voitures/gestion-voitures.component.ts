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

  @Input() showVoiture: boolean;
  showModifier = false;
  visibleDetail = false;
  voitureSubsription: Subscription;
  modeleSubsription: Subscription;
  voitures: VoitureIms[];
  modifierVoiture: VoitureIms;
  voituresByModele: VoitureIms[];
  detailsVoiture: VoitureIms;
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
    this.serviceVoiture.modelesSubject.subscribe(
      (modeles: any) => {
        this.modeles = modeles;
      }
    );
    // actualisation de la liste des voitures
    // tslint:disable-next-line: no-unused-expression
    this.voitures;
  }

  getVoitureByModel(modele: string) {
    this.serviceVoiture.voituresAndImsSubject.pipe(
      map(
        (voitures: VoitureIms[]) => {
          voitures.filter(
            (voiture: VoitureIms) => voiture.model === modele
          );
        }
      )
    ).subscribe(
      (voituresByModele: any) => {
        this.voituresByModele = voituresByModele;
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
