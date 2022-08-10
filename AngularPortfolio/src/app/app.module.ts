//basicos
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
//componentes
import { AppComponent } from './app.component';
import { HeaderComponent } from './componentes/header/header.component';
import { NavComponent } from './componentes/header/nav/nav.component';
import { LogoComponent } from './componentes/header/logo/logo.component';
import { LoginComponent } from './componentes/login/login.component';
import { BannerComponent } from './componentes/banner/banner.component';
import { AcercaComponent } from './componentes/acerca/acerca.component';
import { EditAcercaComponent } from './componentes/edit-acerca/edit-acerca.component';
// importaciones de terceros


//librerias externas npm
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

//Import necesarios para el crud
import { HttpClientModule } from '@angular/common/http';
import { ReactiveFormsModule } from '@angular/forms';
import { AlifeFileToBase64Module } from 'alife-file-to-base64';
import { ExperienciaComponent } from './componentes/experiencia/experiencia.component';
import { EducacionComponent } from './componentes/educacion/educacion.component';
import { HardSoftSkillComponent } from './componentes/hard-soft-skill/hard-soft-skill.component';


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
    ExperienciaComponent,
    EducacionComponent,
    HardSoftSkillComponent
  ],

  imports: [
    BrowserModule,
    AppRoutingModule,
    FontAwesomeModule,
    HttpClientModule,
    NgbModule,
    AlifeFileToBase64Module,
    ReactiveFormsModule,
 
  ],
  providers: [
  

  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
