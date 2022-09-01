import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http'
import { Persona } from '../models/Personas';
import { BehaviorSubject, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

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
   //url='http://localhost:8080/'; //ruta+endpoint"personas""
    //url='https://portfoliolfs.herokuapp.com/'
    url:string=environment.api ///////////esto hacelo en todos los services.
    //metodos
    //lista todas las personas
    
    
    getRefresh(): Observable<boolean>{ // devuelve el valor del Observable
      return this.refresh.asObservable()
    } 
    setRefresh(value:boolean):void { // se le pasa el valor al Observable
      this.refresh.next(value);
    }
  getPersonas(){
    return this.servicio.get<Persona[]>(this.url+'personas/listar');

  } 
  //busca personas por ID
  getPersonaId(id:any){
    return this.servicio.get<Persona>(this.url+'personas/buscar/'+id);
  }
  addPersona(persona:Persona){
    return this.servicio.post<Persona>(this.url+"personas/crear",persona);
  }
  //actualiza la persona
  actualizarPersona(persona:Persona){ 
    return this.servicio.put<Persona>(this.url+"personas/editar/"+persona.id,persona);
  }
  //elimina la persona.
  eliminarPersona(persona:Persona){
    return this.servicio.delete(this.url+"personas/eliminar/"+persona.id);
  }


  }
