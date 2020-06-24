import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { VoitureComponent } from './voiture/listVoitures/listVoitures.component';
import { CreerVoitureComponent } from './voiture/creer-voiture/creer-voiture.component';
import { ReservationComponent } from './reservation/reservation/reservation.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './home/login/login.component';
import { AppComponent } from './app.component';
import { AdminComponent } from './admin/admin.component';
import { ModifierVoitureComponent } from './voiture/modifier-voiture/modifier-voiture.component';
import { AuthGuard } from './helpers/auth.guard';

const routes: Routes = [
  {path: '' , component: VoitureComponent},
  {path: 'login' , component: LoginComponent},
  {path: 'admin' , component: AdminComponent, canActivate: [AuthGuard]},
  {path: 'admin/:new' , component: AdminComponent},
  {path: 'login/:inscrire' , component: LoginComponent},
  {path: 'creerVoiture' , component: CreerVoitureComponent},
  {path: 'modifierVoiture/:id' , component: ModifierVoitureComponent},
  {path: 'reservation/:id' , component: ReservationComponent},
  { path: '**', redirectTo: '' }
];
@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
