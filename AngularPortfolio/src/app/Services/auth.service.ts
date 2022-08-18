import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { JwtDTO } from '../models/JwtDTO';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario } from '../models/nuevo-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  url='http://localhost:8080/auth'; //ruta+endpoint"experiencia""
  constructor(
    private servicioAuth:HttpClient
   ) { }
    public nuevo(nuevoUsuario:NuevoUsuario):Observable<any>{
      return this.servicioAuth.post<any>(this.url+"/nuevo",nuevoUsuario)
    }
    public login(loginUsuario:LoginUsuario):Observable<JwtDTO>{
      return this.servicioAuth.post<JwtDTO>(this.url+"/login",loginUsuario)
    }
}
