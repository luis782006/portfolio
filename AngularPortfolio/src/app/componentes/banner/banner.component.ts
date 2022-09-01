import { Component, OnInit } from '@angular/core';
import { Persona } from 'src/app/models/Personas';
import { AcercaServiceService } from 'src/app/Services/acerca-service.service';

@Component({
  selector: 'app-banner',
  templateUrl: './banner.component.html',
  styleUrls: ['./banner.component.css']
})
export class BannerComponent implements OnInit {

  persona:Persona[];
  nombre:String;
  apellido:String;

  constructor(private acercaService:AcercaServiceService) { }


  reloadPerson(){
    this.acercaService.getPersonas().subscribe((data) => {
      this.persona= data;
      if (this.persona.length!=0) 
      this.nombre=this.persona[0].nombre;
      this.apellido=this.persona[0].apellido;
    
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
