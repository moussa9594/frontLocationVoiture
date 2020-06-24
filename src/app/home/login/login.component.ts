import { Component, OnInit, OnDestroy, Input } from '@angular/core';
import { Subscription } from 'rxjs';
import { ServiceVoitureService } from 'src/app/voiture.service';
import { VoitureIms } from 'src/app/models/voitureIms';
import { Router, ActivatedRoute } from '@angular/router';
import { AuthenticationService } from 'src/app/admin.service';
import { first } from 'rxjs/operators';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit, OnDestroy {

  listVoitures: VoitureIms[];
   @Input() showDialog: boolean;
  showLogin = true;

    inscrire = '';

    email: any;
  returnUrl: any;
  constructor(
              private serviceVoiture: ServiceVoitureService,
              private adminService: AuthenticationService,
              private route: ActivatedRoute,
              private router: Router,
  ) {
    if (this.adminService.currentUserValue) {
      // this.router.navigate(['/admin']);
  }
  }

  subscriptionVoitures: Subscription;
  ngOnInit() {
      this.route.paramMap.subscribe(param => {
        this.inscrire = param.get('inscrire');
      });
      if(this.inscrire) {
        this.showLogin = false;
      }
      this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/admin';
  }

  onSuccess(value: any){
    this.adminService.login(value.email).subscribe(res =>{
      this.router.navigate([this.returnUrl]);
    })
  }
  ngOnDestroy() {
  }

}
