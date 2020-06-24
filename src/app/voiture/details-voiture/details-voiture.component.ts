import { Component, OnInit, Input } from '@angular/core';
import { VoitureIms } from 'src/app/models/voitureIms';
import { GiphyService } from 'src/app/giphy.service';

@Component({
  selector: 'app-details-voiture',
  templateUrl: './details-voiture.component.html',
  styleUrls: ['./details-voiture.component.css']

})
export class DetailsVoitureComponent implements OnInit {

  @Input() detailsVoiture: any;
  visibleDetail= false;
  @Input() url = '';
  constructor(private giphyService: GiphyService) { }

  ngOnInit() {
    if(this.detailsVoiture) {
      this.visibleDetail = true;
      this.giphyService.gif(this.detailsVoiture.model).subscribe(data => {
        this.url = data, console.log('l\'url est' + this.url)
      }
        );
    } else {
      this.url = '';
    }
  }


}
