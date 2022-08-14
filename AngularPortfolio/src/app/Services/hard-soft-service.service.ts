import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
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
url='http://localhost:8080/hardsoft'; //ruta+endpoint"hardsoft""

    //metodos
//lista todas las personas
getHardSoftSkills(){
  return this.servicioHardSoft.get<HardSoftSkill[]>(this.url+'/listar');
  } 
  //busca personas por ID
  getHardSoftSkillsId(id:any){
  return this.servicioHardSoft.get<HardSoftSkill>(this.url+'/buscar/'+id);
  }
  addHardSoftSkills(hardSoftSkill:HardSoftSkill){
  return this.servicioHardSoft.post<HardSoftSkill>(this.url+"/crear",hardSoftSkill);
  }
  //actualiza la persona
  actualizarHardSoftSkills(hardSoftSkill:HardSoftSkill){ 
  return this.servicioHardSoft.put<HardSoftSkill>(this.url+"/editar/"+hardSoftSkill.id,hardSoftSkill);
  }
  //elimina la persona.
  eliminarHardSoftSkills(hardSoftSkill:HardSoftSkill){
  return this.servicioHardSoft.delete(this.url+"/eliminar/"+hardSoftSkill.id);
  }
}


