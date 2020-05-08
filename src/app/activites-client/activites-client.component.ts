import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-activites-client',
  templateUrl: './activites-client.component.html',
  styleUrls: ['./activites-client.component.css']
})
export class ActivitesClientComponent implements OnInit {

  constructor() { }

  @Input() showClient: boolean;
  ngOnInit() {
  }

}
