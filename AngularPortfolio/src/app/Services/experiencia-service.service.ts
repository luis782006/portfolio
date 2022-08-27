import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
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
 url='http://localhost:8080/'; //ruta+endpoint"experiencia""
//url='https://portfoliolfs.herokuapp.com/'
//apibase:string=environment.api
//metodos
//lista todas las personas
    getExperiencia(){
    return this.servicioExp.get<Experiencia[]>(this.url+'experiencia/listar');
    } 
    //busca personas por ID
    getExperienciaId(id:any){
    return this.servicioExp.get<Experiencia>(this.url+'experiencia/buscar/'+id);
    }
    addExperiencia(experiencia:Experiencia){
    return this.servicioExp.post<Experiencia>(this.url+"experiencia/crear",experiencia);
    }
    //actualiza la persona
    actualizarExperiencia(experiencia:Experiencia){ 
    return this.servicioExp.put<Experiencia>(this.url+"experiencia/editar/"+experiencia.id,experiencia);
    }
    //elimina la persona.
    eliminarExperiencia(experiencia:Experiencia){
    return this.servicioExp.delete(this.url+"experiencia/eliminar/"+experiencia.id);
    }
}