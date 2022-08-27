import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { JwtDTO } from '../models/JwtDTO';
import { LoginUsuario } from '../models/login-usuario';
import { NuevoUsuario } from '../models/nuevo-usuario';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   url='http://localhost:8080/'; //ruta+endpoint"experiencia""
  //url='https://portfoliolfs.herokuapp.com/'
  //apibase:string=environment.api
  constructor(
    private servicioAuth:HttpClient
   ) { }
    public nuevo(nuevoUsuario:NuevoUsuario):Observable<any>{
      return this.servicioAuth.post<any>(this.url+"auth/nuevo",nuevoUsuario)
    }
    public login(loginUsuario:LoginUsuario):Observable<JwtDTO>{
      return this.servicioAuth.post<JwtDTO>(this.url+"auth/login",loginUsuario)
    }
}
