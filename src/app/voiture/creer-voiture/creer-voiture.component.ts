import { Component, OnInit } from '@angular/core';
import { Voiture } from 'src/app/models/voiture';
import { ServiceVoitureService } from 'src/app/voiture.service';
import { VoitureComponent} from '../listVoitures/listVoitures.component';

@Component({
  selector: 'app-creer-voiture',
  templateUrl: './creer-voiture.component.html',
  styleUrls: ['./creer-voiture.component.css']
})
export class CreerVoitureComponent implements OnInit {

  // pour cacher le formulaire d'ajout
  cache = true;
  // Objet voiture pour le formulaire
  newVoiture: Voiture = new Voiture();
  constructor(private voitureService: ServiceVoitureService) { }

  ngOnInit() {
  }

  creer() {
    this.voitureService.creerVoiture(this.newVoiture)
    .subscribe(data => console.log(data), error => console.log(error));
    this.newVoiture = new Voiture();
  }
  // A la validation du formulaire d'jout de Voiture
  onSubmit() {
      this.creer();
      this.cache = true;
  }

  // pour montrer le formulaire d'ajout
  onClick() {
    this.cache = false;
  }

}
