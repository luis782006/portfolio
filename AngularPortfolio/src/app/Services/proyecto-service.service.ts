import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Proyectos } from '../models/Proyectos';

@Injectable({
  providedIn: 'root'
})
export class ProyectoServiceService {

  constructor(
    private servicioProyecto:HttpClient
  ) { }

  url='http://localhost:8080/proyecto'; //ruta+endpoint"experiencia""

//metodos
//lista todas las personas
    getProyecto(){
    return this.servicioProyecto.get<Proyectos[]>(this.url+'/listar');
    } 
    //busca personas por ID
    getProyectoId(id:any){
    return this.servicioProyecto.get<Proyectos>(this.url+'/buscar/'+id);
    }
    addProyecto(proyecto:Proyectos){
    return this.servicioProyecto.post<Proyectos>(this.url+"/crear",proyecto);
    }
    //actualiza la persona
    actualizarProyecto(proyecto:Proyectos){ 
    return this.servicioProyecto.put<Proyectos>(this.url+"/editar/"+proyecto.id,proyecto);
    }
    //elimina la persona.
    eliminarProyecto(proyecto:Proyectos){
    return this.servicioProyecto.delete(this.url+"/eliminar/"+proyecto.id);
    }
}

