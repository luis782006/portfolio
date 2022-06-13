import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { HeaderComponent } from './componentes/header/header.component';
import { NavComponent } from './componentes/header/nav/nav.component';
import { LogoComponent } from './componentes/header/logo/logo.component';
import { LoginComponent } from './componentes/login/login.component';
import { BannerComponent } from './componentes/banner/banner.component';
import { AcercaComponent } from './componentes/acerca/acerca.component';
import { EditAcercaComponent } from './componentes/edit-acerca/edit-acerca.component';




@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    NavComponent,
    LogoComponent,
    LoginComponent,
    BannerComponent,
    AcercaComponent,
    EditAcercaComponent,
  
  
   
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
