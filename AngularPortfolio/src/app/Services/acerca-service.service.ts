import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Persona } from '../models/Personas';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AcercaServiceService {
private refresh:BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false);
  //constructor
  constructor(
            private servicio:HttpClient
            ) 
  { }
  //fin constructor
 //variables
    url='http://localhost:8080/personas'; //ruta+endpoint"personas""

    //metodos
    //lista todas las personas
  
    getRefresh(): Observable<boolean>{ // devuelve el valor del Observable
      return this.refresh.asObservable()
    } 
    setRefresh(value:boolean):void { // se le pasa el valor al Observable
      this.refresh.next(value);
    }
  getPersonas(){
    return this.servicio.get<Persona[]>(this.url+'/listar');

  } 
  //busca personas por ID
  getPersonaId(id:any){
    return this.servicio.get<Persona>(this.url+'/buscar/'+id);
  }
  addPersona(persona:Persona){
    return this.servicio.post<Persona>(this.url+"/crear",persona);
  }
  //actualiza la persona
  actualizarPersona(persona:Persona){ 
    return this.servicio.put<Persona>(this.url+"/editar/"+persona.id,persona);
  }
  //elimina la persona.
  eliminarPersona(persona:Persona){
    return this.servicio.delete(this.url+"/eliminar/"+persona.id);
  }


  }
