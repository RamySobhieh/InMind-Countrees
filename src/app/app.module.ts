import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AuthPageComponent } from './auth-page/auth-page.component';
import { LoginComponent } from './login/login.component';
import { SignUpComponent } from './sign-up/sign-up.component';
import { SearchPageComponent } from './search-page/search-page.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HttpClientModule } from '@angular/common/http';
import { CountryCardComponent } from './country-card/country-card.component';
import { FilterComponent } from './filter/filter.component';
import { DisplayPageComponent } from './display-page/display-page.component';
import { ImageSliderComponent } from './image-slider/image-slider.component';
import { LoadingComponent } from './loading/loading.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthPageComponent,
    LoginComponent,
    SignUpComponent,
    SearchPageComponent,
    SearchBarComponent,
    CountryCardComponent,
    FilterComponent,
    DisplayPageComponent,
    ImageSliderComponent,
    LoadingComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
