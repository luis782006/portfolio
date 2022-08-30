import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { HardSoftSkill } from '../models/HardSoftSkill';

@Injectable({
  providedIn: 'root'
})
export class HardSoftServiceService {

  constructor(
    private servicioHardSoft:HttpClient

  ) { }
  //fin constructor
//variables
//url='http://localhost:8080/'; //ruta+endpoint"hardsoft""
//url='https://portfoliolfs.herokuapp.com/'
url:string=environment.api
    //metodos
//lista todas las personas
getHardSoftSkills(){
  return this.servicioHardSoft.get<HardSoftSkill[]>(this.url+'hardsoft/listar');
  } 
  //busca personas por ID
  getHardSoftSkillsId(id:any){
  return this.servicioHardSoft.get<HardSoftSkill>(this.url+'hardsoft/buscar/'+id);
  }
  addHardSoftSkills(hardSoftSkill:HardSoftSkill){
  return this.servicioHardSoft.post<HardSoftSkill>(this.url+"hardsoft/crear",hardSoftSkill);
  }
  //actualiza la persona
  actualizarHardSoftSkills(hardSoftSkill:HardSoftSkill){ 
  return this.servicioHardSoft.put<HardSoftSkill>(this.url+"hardsoft/editar/"+hardSoftSkill.id,hardSoftSkill);
  }
  //elimina la persona.
  eliminarHardSoftSkills(hardSoftSkill:HardSoftSkill){
  return this.servicioHardSoft.delete(this.url+"hardsoft/eliminar/"+hardSoftSkill.id);
  }
}


