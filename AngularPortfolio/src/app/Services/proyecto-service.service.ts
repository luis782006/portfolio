import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyectos } from '../models/Proyectos';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ProyectoServiceService {

  constructor(
    private servicioProyecto:HttpClient,

  ) { }

  //'; //ruta+endpoint"experiencia""
   url='http://localhost:8080/';
  //url='https://portfoliolfs.herokuapp.com/'
  //apibase:string=environment.api
//metodos
//lista todas las personas
    getProyecto(){
    return this.servicioProyecto.get<Proyectos[]>(this.url+'proyecto/listar');
    } 
    //busca personas por ID
    getProyectoId(id:any){
    return this.servicioProyecto.get<Proyectos>(this.url+'proyecto/buscar/'+id);
    }
    addProyecto(proyecto:Proyectos){
    return this.servicioProyecto.post<Proyectos>(this.url+"proyecto/crear",proyecto);
    }
    //actualiza la persona
    actualizarProyecto(proyecto:Proyectos){ 
    return this.servicioProyecto.put<Proyectos>(this.url+"proyecto/editar/"+proyecto.id,proyecto);
    }
    //elimina la persona.
    eliminarProyecto(proyecto:Proyectos){
    return this.servicioProyecto.delete(this.url+"proyecto/eliminar/"+proyecto.id);
    }
}

