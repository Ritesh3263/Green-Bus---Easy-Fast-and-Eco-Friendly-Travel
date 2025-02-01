import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule } from '@angular/forms';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule } from '@angular/common/http';
import { FontAwesomeModule, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { fas } from '@fortawesome/free-solid-svg-icons';
import { far } from '@fortawesome/free-regular-svg-icons';
import { fab } from '@fortawesome/free-brands-svg-icons';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { SearchComponent } from './pages/search/search.component';
import { BookingComponent } from './pages/booking/booking.component';
import { CdkOverlayOrigin } from '@angular/cdk/overlay';
import { JourneyTimePipe } from './pipes/pipes';
import { BookingConfirmedComponent } from './pages/booking-confirmed/booking-confirmed.component';
import { SeparatePipe } from 'src/app/pipes/seperate.pipes';
import { LoaderComponent } from './pages/loader/loader.component';
import { AuthModule } from '@auth0/auth0-angular';

@NgModule({
  declarations: [
    AppComponent,
    SearchComponent,
    BookingComponent,
    JourneyTimePipe,
    BookingConfirmedComponent,
    SeparatePipe,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    MatAutocompleteModule,
    BrowserAnimationsModule,
    FontAwesomeModule,
    HttpClientModule,
    CdkOverlayOrigin,
    MatInputModule,
    MatSelectModule,
    AuthModule.forRoot({
      domain: 'dev-ukakag62bxor6pme.us.auth0.com', // Replace with your Auth0 domain
      clientId: 'B8s3PpaeS8XKLwZSXnx7gq6rB9DKwYnM', // Replace with your Auth0 client ID
      authorizationParams: {
        redirect_uri: window.location.origin, // Redirect after login
      }
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { 
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas, far, fab);
  }
}
