import { Component, OnInit, Inject } from '@angular/core';
import { Router, ActivatedRoute  } from '@angular/router';
import { Location } from '@angular/common';


@Component({
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css']
})
export class AdminComponent implements OnInit {

  showVoiture = true;
  showReservation = false;
  showClient = false;
  newCar = null;
  constructor(
              private route: Router,
              private activedRoute: ActivatedRoute,
              private location: Location
  ) { }

  ngOnInit() {
    this.activedRoute.paramMap.subscribe(param => {
      if (param.get('new') && param.get('new').length > 1 ) {
        this.location.replaceState('/admin')
        location.reload();
        this.newCar = null;
      }
    });
  }

}

