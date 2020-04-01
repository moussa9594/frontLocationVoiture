import { Component, OnInit } from '@angular/core';
import { ServiceVoitureService } from 'src/app/voiture.service';
import { VoitureIms } from 'src/app/models/voitureIms';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-voiture',
  templateUrl: './listVoitures.component.html',
  styleUrls: ['./listVoitures.component.css']
})
export class VoitureComponent implements OnInit {

  // variable pour la liste des voitures
  // tslint:disable-next-line: ban-types
  listVoitures: Observable<VoitureIms[]>;
  constructor(private voitureService: ServiceVoitureService) { }

  ngOnInit() {
    this.laListeVoitures();
  }

  laListeVoitures() {
    this.listVoitures = this.voitureService.listVoitures();
  }

}
