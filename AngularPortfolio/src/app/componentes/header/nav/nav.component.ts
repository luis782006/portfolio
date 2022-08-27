import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import {faGithub,faLinkedin} from '@fortawesome/free-brands-svg-icons';
import { Persona } from 'src/app/models/Personas';
import { AcercaServiceService } from 'src/app/Services/acerca-service.service';


@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {
  

 

  faGithub=faGithub
  faLinkedin=faLinkedin

  persona:Persona[];
  path_git:String;
  path_link:String;
 
   constructor(
    private acercaService:AcercaServiceService

  ) { }


  reloadPerson(){
    this.acercaService.getPersonas().subscribe((data) => {
      this.persona= data;
      if (this.persona.length!=0) 
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
