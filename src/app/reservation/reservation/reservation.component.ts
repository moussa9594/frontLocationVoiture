import { Component, OnInit } from '@angular/core';
import { ServiceVoitureService } from 'src/app/voiture.service';
import { ActivatedRoute } from '@angular/router';
import { VoitureIms } from 'src/app/models/voitureIms';
import { Observable } from 'rxjs';
import { GiphyService } from 'src/app/giphy.service';

@Component({
  selector: 'app-reservation',
  templateUrl: './reservation.component.html',
  styleUrls: ['./reservation.component.css']
})
export class ReservationComponent implements OnInit {
  voitureReserver: Observable<VoitureIms[]>;
  voiture: Array<VoitureIms>;
  url: Observable<any[]>;
  id_voiture: number;
  constructor(private serviceVoiture: ServiceVoitureService,
              public route: ActivatedRoute, private giphyService: GiphyService
             ) { }

  ngOnInit() {
    this.route.paramMap.subscribe(params => {
      // tslint:disable-next-line: no-string-literal
       // tslint:disable-next-line: radix
       this.serviceVoiture.getVoitureIms(parseInt(params.get('id_voiture')))
      .subscribe(
        data => {
          this.voitureReserver = data;
          this.voiture = data;
          this.id_voiture = data.id_voiture;
          // tslint:disable-next-line: no-shadowed-variable
          // console.log(this.voitureReserver[0].model);
          this.giphyService.gif(this.voitureReserver[0].model).subscribe( data => this.url = data);
        });

      });
  }

  getIdVoiture() {
    return this.id_voiture;
  }

}
