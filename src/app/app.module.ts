import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoitureComponent } from './voiture/listVoitures/listVoitures.component';
import { RouterModule } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { CreerVoitureComponent } from './voiture/creer-voiture/creer-voiture.component';
import { ReservationComponent } from './reservation/reservation/reservation.component';
import { ClientComponent } from './client/client/client.component';

@NgModule({
  declarations: [
    AppComponent,
    VoitureComponent,
    CreerVoitureComponent,
    ReservationComponent,
    ClientComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    RouterModule.forRoot(
      [
        {path: '' , component: VoitureComponent},
        {path: 'creerVoiture' , component: CreerVoitureComponent},
        {path: 'reservation/:id_voiture' , component: ReservationComponent}
      ]
    )
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
