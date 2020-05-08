import { Component, OnInit, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  inscrire = 'inscrire';
  @Input() connecter;
  @Input() icon;
  @Input() inscription;
  @Input() stile;

  constructor(private activeRoute: ActivatedRoute) { }

  ngOnInit() {

  }

}
