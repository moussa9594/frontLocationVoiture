import { Component, OnInit } from '@angular/core';
import { VoitureIms } from 'src/app/models/voitureIms';
import { ServiceVoitureService } from 'src/app/voiture.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Images } from 'src/app/models/images';
import { ImageService } from 'src/app/image.service';

@Component({
  selector: 'app-modifier-voiture',
  templateUrl: './modifier-voiture.component.html',
  styleUrls: ['./modifier-voiture.component.css']
})
export class ModifierVoitureComponent implements OnInit {

  marques;
  modeles;
  modifierVoiture: any;
  voitureSubscription: Subscription;
  imageSubscription: Subscription;
  // tslint:disable-next-line: variable-name
  nbre_portes;
  logos;
  // tslint:disable-next-line: variable-name
  id_voiture: number;
  new = 'new';
  showCarac = false;
  showImages = true;
  idDoc: string;

  constructor(
              private voitureService: ServiceVoitureService,
              private imageService: ImageService,
              private activatedRoute: ActivatedRoute,
              private router: Router
  ) { }

  ngOnInit() {
    // marques
    this.marques = [];
    this.marques.push({label: 'Renault', value: 'Renault' });
    this.marques.push({label: 'Peugeot', value: 'Peugeot' });
    this.marques.push({label: 'Alfa Romeo', value: 'Alfa Romeo' });
    // modeles
    this.modeles = [];
    this.modeles.push({label: 'Aston Martin', value: 'Aston Martin' });
    this.modeles.push({label: 'Audi', value: 'Audi' });
    this.modeles.push({label: 'BMW', value: 'BMW' });
    this.modeles.push({label: 'Cadillac', value: 'Cadillac' });
    this.modeles.push({label: 'Catheram', value: 'Catheram' });
    this.modeles.push({label: 'Chrysler', value: 'Chrysler' });
    this.modeles.push({label: 'Daihatsu', value: 'Daihatsu' });
    this.modeles.push({label: 'Dacia', value: 'Dacia' });
    this.modeles.push({label: 'Ferrari', value: 'Ferrari' });
    this.modeles.push({label: 'Fiat', value: 'Fiat' });
    this.modeles.push({label: 'Ford', value: 'Ford' });
    this.modeles.push({label: 'Hyundai', value: 'Hyundai' });
    this.modeles.push({label: 'Jaguar', value: 'Jaguar' });
    this.modeles.push({label: 'Autre', value: 'Autre' });
    // nbre_portes
    this.nbre_portes = [];
    this.nbre_portes.push({label: 'Deux', value : 2 });
    this.nbre_portes.push({label: 'Quatre', value: 4 });
    this.modeles.push({label: 'Autre', value: 'Autre' });
    // logos
    this.logos = [
      'BMW',
      'Audi',
      'Fiat',
      'Ford',
      'Jaguar',
      'Hondas',
      'Mercedes',
      'Renault',
      'VW',
      'Volvo',
    ];

    this.activatedRoute.paramMap.subscribe( param => {
      // tslint:disable-next-line: radix
      this.idDoc = param.get('id');
    }
    );
    //
    this.getVoitureIms();
    this.onValidForm();
  }
  // methode de recupération de la voiture
  getVoitureIms() {
    this.voitureService.getDoc(this.idDoc).subscribe(
      (voiture: any) => {
        this.modifierVoiture = voiture;
        console.log(voiture)
      }
    );
  }

  validerModifVoiture() {
    this.voitureService.updateVoiture(this.idDoc, this.modifierVoiture).then(res => {
    this.router.navigate(['/admin', this.new]);
    })
  }



  onSubmit() {
    this.validerModifVoiture();
  }

  onValidForm(): boolean {
    if(this.modifierVoiture) {
      if (this.modifierVoiture.marque == null || this.modifierVoiture.model == null || this.modifierVoiture.nbre_porte == null ||
        this.modifierVoiture.prix_jour == null || this.modifierVoiture.description === undefined ||
             this.modifierVoiture.stock == null ) {
               return true;
              } else {
                return false;
      }
    }
}

onSelectIm1(evt: any) {
  this.modifierVoiture.images.im1 = evt.currentFiles[0].name;
}
onSelectIm2(evt: any) {
  this.modifierVoiture.images.im2 = evt.currentFiles[0].name;
}
onSelectIm3(evt: any) {
  this.modifierVoiture.images.im3 = evt.currentFiles[0].name;
}

onClickAppliquer() {
this.showImages = true;
this.showCarac = false;
}

}
