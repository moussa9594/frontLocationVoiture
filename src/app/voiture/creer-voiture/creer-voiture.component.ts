import { Component, OnInit } from '@angular/core';
import { Voiture } from 'src/app/models/voiture';
import { ServiceVoitureService } from 'src/app/voiture.service';
import { ImageService } from 'src/app/image.service';
import { VoitureComponent} from '../listVoitures/listVoitures.component';
import {SelectItem} from 'primeng/api';
import {MessageService} from 'primeng/api';
import { Images } from 'src/app/models/images';
import { map } from 'rxjs/operators';
import { Router } from '@angular/router';

@Component({
  selector: 'app-creer-voiture',
  templateUrl: './creer-voiture.component.html',
  styleUrls: ['./creer-voiture.component.css'],
  providers: [MessageService]
})
export class CreerVoitureComponent implements OnInit {

   marques: SelectItem[];
   modeles: SelectItem[];
   // tslint:disable-next-line: variable-name
   nbre_portes: SelectItem[];
   logos: string[] = [];
   files: any;
   uploadedFiles: any[] = [];
  // pour cacher le formulaire d'ajout
  cache = true;
  validForm = true;
  new = 'new'
  // Objet voiture pour le formulaire
  newVoiture: Voiture = new Voiture();
  // Objet Images pour le formulaire
  newImages: Images = new Images();
  constructor(private voitureService: ServiceVoitureService,
              private messageService: MessageService,
              private imageService: ImageService,
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

    this.onValidForm();
  }

  // action sur les selections des images
  onSelect(evt: any) {
    this.files = evt.currentFiles;
    if (this.files[0] !== undefined && this.files[1] !== undefined && this.files[2] === undefined) {
      this.newImages.image1 = this.files[0].name;
      this.newImages.image2 = this.files[1].name;
      this.messageService.add({severity: 'info', summary: 'La troisième image sera le logo', detail: ''});
    }
    if ( this.files[2] !== undefined) {
      this.newImages.image3 = this.files[2].name;
    }
  }

  // action quand on supprime une image
  onRemove(event) {
      this.newImages.image3 = undefined;
      this.onValidForm();
  }

  // methode de création de la voiture
  creerVoiture() {
    this.voitureService.creerVoiture(this.newVoiture).pipe(
      map(
        (voiture: Voiture) =>
          voiture
        )
    )
    .subscribe(
      (voiture: Voiture) => {
        this.newImages.voiture = voiture;
        this.creerImages();

      },
          );
            }
  // methode de création des images
  creerImages() {
    this.imageService.creerImages(this.newImages)
    .subscribe(data => console.log(data), error => console.log(error));
  }

  // A la validation du formulaire d'jout de Voiture
  onSubmit() {
      this.creerVoiture();
      this.cache = true;
      this.router.navigate(['/admin', this.new]);
  }
  onValidForm(): boolean {
      if (this.newVoiture.marque == null || this.newVoiture.model == null || this.newVoiture.nbre_porte == null ||
        this.newVoiture.prix_jour == null || this.newVoiture.description === undefined ||
         this.newImages.image3 === undefined || this.newVoiture.stock == null ) {
       return true;
      } else {
        return false;
      }
  }

  // pour montrer le formulaire d'ajout
  onClick() {
    this.cache = false;
  }




}
