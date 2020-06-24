import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { VoitureComponent } from './voiture/listVoitures/listVoitures.component';
import { FormsModule } from '@angular/forms';
import { CreerVoitureComponent } from './voiture/creer-voiture/creer-voiture.component';
import { ReservationComponent } from './reservation/reservation/reservation.component';
import { ClientComponent } from './client/client/client.component';
import {CarouselModule} from 'primeng/carousel';
import {OrderListModule} from 'primeng/orderlist';
import {ToastModule} from 'primeng/toast';
import {PanelModule} from 'primeng/panel';
import {DialogModule} from 'primeng/dialog';
import {ButtonModule} from 'primeng/button';
import {DropdownModule} from 'primeng/dropdown';
import {FileUploadModule} from 'primeng/fileupload';
import { DetailsVoitureComponent } from './voiture/details-voiture/details-voiture.component';
import { LoginComponent } from './home/login/login.component';
import { HeaderComponent } from './header/header.component';
import { FooterComponent } from './footer/footer.component';
import { AdminComponent } from './admin/admin.component';
import { GestionVoituresComponent } from './gestion-voitures/gestion-voitures.component';
import { GestionReservationsComponent } from './gestion-reservations/gestion-reservations.component';
import { ActivitesClientComponent } from './activites-client/activites-client.component';
import { ModifierVoitureComponent } from './voiture/modifier-voiture/modifier-voiture.component';
import { AngularFireModule } from '@angular/fire';
import { AngularFireStorageModule } from '@angular/fire/storage';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { AngularFirestoreModule, AngularFirestore } from 'angularfire2/firestore';
import { environment } from 'src/environments/environment';
import { NgxAuthFirebaseUIModule } from 'ngx-auth-firebaseui';
// import {MatFormFieldModule} from '@angular/material';
// import {MatTableModule} from '@angular/material/table';
import { MatPasswordStrengthModule } from '@angular-material-extensions/password-strength';
import {FlexLayoutModule, StyleUtils,StylesheetMap,MediaMarshaller,ɵMatchMedia,BreakPointRegistry,
  PrintHook,LayoutStyleBuilder,FlexStyleBuilder,ShowHideStyleBuilder,
  FlexOrderStyleBuilder,LayoutAlignStyleBuilder} from '@angular/flex-layout';
  import {MatButtonModule} from '@angular/material/button';
import {MatToolbarModule} from '@angular/material/toolbar';


@NgModule({
  declarations: [
    AppComponent,
    VoitureComponent,
    CreerVoitureComponent,
    ReservationComponent,
    ClientComponent,
    DetailsVoitureComponent,
    LoginComponent,
    HeaderComponent,
    FooterComponent,
    AdminComponent,
    GestionVoituresComponent,
    GestionReservationsComponent,
    ActivitesClientComponent,
    ModifierVoitureComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    CarouselModule,
    OrderListModule,
    ToastModule,
    PanelModule,
    ButtonModule,
    DropdownModule,
    BrowserAnimationsModule,
    FileUploadModule,
    DialogModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFirestoreModule,
    AngularFireStorageModule,
    AngularFireAuthModule,
    NgxAuthFirebaseUIModule.forRoot(environment.firebase),
    MatButtonModule,
    MatToolbarModule,
    MatPasswordStrengthModule,
    FlexLayoutModule
  ],
  providers: [
    // AngularFirestore,
    StyleUtils,
    StylesheetMap,
    MediaMarshaller,
    ɵMatchMedia,
    BreakPointRegistry,
    PrintHook,
    LayoutStyleBuilder,FlexStyleBuilder,ShowHideStyleBuilder,FlexOrderStyleBuilder,
    LayoutAlignStyleBuilder
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
