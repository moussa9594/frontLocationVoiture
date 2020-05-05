import { Component, OnInit } from '@angular/core';
import { Location } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {

  connecter = '';
  icon = '';
  inscription = '';
  stile = '';
  constructor(
              private location: Location,
              private router: Router,
              ) {
  }
  ngOnInit(): void {
    console.log(this.location.path())
    if(this.location.path() === '/admin') {
      this.connecter = 'Se déconnecter';
      this.icon = 'pi pi-unlock';
      this.inscription = '';
      this.stile = 'ui-button-danger col-lg-10';
    }
    if(this.location.path() !== '/admin') {
      this.connecter = 'Se connecter';
      this.inscription = 'S\'inscrire ?';
      this.icon = 'pi pi-lock';
      this.stile = 'ui-button-success col-lg-10';
    }
  }


}
