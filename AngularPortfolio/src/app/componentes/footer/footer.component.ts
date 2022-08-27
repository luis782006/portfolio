import { Component, OnInit } from '@angular/core';
import { faYoutube,faGithub,faLinkedin} from '@fortawesome/free-brands-svg-icons';
import { Persona } from 'src/app/models/Personas';
import { AcercaServiceService } from 'src/app/Services/acerca-service.service';

@Component({
  selector: 'app-footer',
  templateUrl: './footer.component.html',
  styleUrls: ['./footer.component.css']
})
export class FooterComponent implements OnInit {

  faYoutube= faYoutube;
  faGithub= faGithub;
  faLinkedin=faLinkedin;
  persona:Persona[];
  nombre:String;
  apellido:String;
  path_git:String;
  path_link:String
  constructor(
    private acercaService:AcercaServiceService
  ) { } 

  reloadPerson(){
    this.acercaService.getPersonas().subscribe((data) => {
      this.persona= data;
      if (this.persona.length!=0) 
      this.nombre=this.persona[0].nombre;
      this.apellido=this.persona[0].apellido;
      this.path_git=this.persona[0].path_git;
      this.path_link=this.persona[0].path_link;
   });
  }

  ngOnInit(): void {
      this.reloadPerson();
      this.acercaService.getRefresh().subscribe((value) => {
        if (value){
          this.reloadPerson();
        }
      })
  }

}
