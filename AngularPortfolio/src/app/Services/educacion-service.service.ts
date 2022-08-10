import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Educacion } from '../models/Educacion';

@Injectable({
  providedIn: 'root'
})
export class EducacionServiceService {

  constructor(
    private servicioEducacion:HttpClient
  ) { }

  //fin constructor
//variables
url='http://localhost:8080/educacion'; //ruta+endpoint"personas""

//metodos
//lista todas educacion
getEducacion(){
  return this.servicioEducacion.get<Educacion[]>(this.url+'/listar');
  } 
  //busca personas por ID
  getEducacionId(id:any){
  return this.servicioEducacion.get<Educacion>(this.url+'/buscar/'+id);
  }
  addEducacion(educacion:Educacion){
  return this.servicioEducacion.post<Educacion>(this.url+"/crear",educacion);
  }
  //actualiza la persona
  actualizarEducacion(educacion:Educacion){ 
  return this.servicioEducacion.put<Educacion>(this.url+"/editar/"+educacion.id,educacion);
  }
  //elimina la persona.
  eliminarEducacion(educacion:Educacion){
  return this.servicioEducacion.delete(this.url+"/eliminar/"+educacion.id);
  }
}
