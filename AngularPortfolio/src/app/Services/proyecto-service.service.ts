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
  apiLocal='https://portfoliolfs.herokuapp.com/proyecto'
//metodos
//lista todas las personas
    getProyecto(){
    return this.servicioProyecto.get<Proyectos[]>(this.apiLocal+'/listar');
    } 
    //busca personas por ID
    getProyectoId(id:any){
    return this.servicioProyecto.get<Proyectos>(this.apiLocal+'/buscar/'+id);
    }
    addProyecto(proyecto:Proyectos){
    return this.servicioProyecto.post<Proyectos>(this.apiLocal+"/crear",proyecto);
    }
    //actualiza la persona
    actualizarProyecto(proyecto:Proyectos){ 
    return this.servicioProyecto.put<Proyectos>(this.apiLocal+"/editar/"+proyecto.id,proyecto);
    }
    //elimina la persona.
    eliminarProyecto(proyecto:Proyectos){
    return this.servicioProyecto.delete(this.apiLocal+"/eliminar/"+proyecto.id);
    }
}

