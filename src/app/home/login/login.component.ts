import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceVoitureService } from 'src/app/voiture.service';
import { VoitureIms } from 'src/app/models/voitureIms';
import { Login } from 'src/app/models/login';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  listVoitures: VoitureIms[];
   @Input() showDialog: boolean;
  showLogin = true;
    username =  'sall';
    password =  'sall94';
    inscrire = '';
    adminLogin: Login = new Login();
  constructor(
              private serviceVoiture: ServiceVoitureService,
              private route: Router,
              private activeRoutre: ActivatedRoute
  ) { }

  subscriptionVoitures: Subscription;
  ngOnInit() {
      this.activeRoutre.paramMap.subscribe(param => {
        this.inscrire = param.get('inscrire');
      });
      if(this.inscrire) {
        this.showLogin = false;
      }

  }

  onLogin() {
    if ((this.adminLogin.username === this.username) &&
     (this.adminLogin.password === this.password)) {
        this.route.navigate(['/admin'])
    } else {
      alert('login ou mot de passe incorrect');
    }
  }

  ngOnDestroy() {
  }

}
