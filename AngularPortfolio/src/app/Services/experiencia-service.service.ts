import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Experiencia } from '../models/Experiencias';

@Injectable({
  providedIn: 'root'
})
export class ExperienciaServiceService {

  constructor(
    private servicioExp:HttpClient
    ) 
{ }
//fin constructor
//variables
url='http://localhost:8080/experiencia'; //ruta+endpoint"personas""

//metodos
//lista todas las personas
    getExperiencia(){
    return this.servicioExp.get<Experiencia[]>(this.url+'/listar');
    } 
    //busca personas por ID
    getExperienciaId(id:any){
    return this.servicioExp.get<Experiencia>(this.url+'/buscar/'+id);
    }
    addExperiencia(experiencia:Experiencia){
    return this.servicioExp.post<Experiencia>(this.url+"/crear",experiencia);
    }
    //actualiza la persona
    actualizarExperiencia(experiencia:Experiencia){ 
    return this.servicioExp.put<Experiencia>(this.url+"/editar/"+experiencia.id,experiencia);
    }
    //elimina la persona.
    eliminarExperiencia(experiencia:Experiencia){
    return this.servicioExp.delete(this.url+"/eliminar/"+experiencia.id);
    }
}