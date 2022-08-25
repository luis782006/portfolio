import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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
url='http://localhost:8080/'; //ruta+endpoint"personas""
//url='https://portfoliolfs.herokuapp.com/'
//apibase:string=environment.api
//metodos
//lista todas educacion
getEducacion(){
  return this.servicioEducacion.get<Educacion[]>(this.url+'educacion/listar');
  } 
  //busca personas por ID
  getEducacionId(id:any){
  return this.servicioEducacion.get<Educacion>(this.url+'educacion/buscar/'+id);
  }
  addEducacion(educacion:Educacion){
  return this.servicioEducacion.post<Educacion>(this.url+"educacion/crear",educacion);
  }
  //actualiza la persona
  actualizarEducacion(educacion:Educacion){ 
  return this.servicioEducacion.put<Educacion>(this.url+"educacion/editar/"+educacion.id,educacion);
  }
  //elimina la persona.
  eliminarEducacion(educacion:Educacion){
  return this.servicioEducacion.delete(this.url+"educacion/eliminar/"+educacion.id);
  }
}
