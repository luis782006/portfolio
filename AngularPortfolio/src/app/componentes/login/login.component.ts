import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { LoginUsuario } from 'src/app/models/login-usuario';
import { AuthService } from 'src/app/Services/auth.service';
import { TokenService } from 'src/app/Services/token.service';
import {faEye,faEyeSlash} from '@fortawesome/free-solid-svg-icons';
import Swal from 'sweetalert2';
import { faThinkPeaks } from '@fortawesome/free-brands-svg-icons';
@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  isLogged= false;
  isLoginFail= false;
  loginUsuario: LoginUsuario;
  nombreUsuario: string;
  password: string;
  roles: string[] = [];
  errMsj: string;
  faEye=faEye
  faEyeSlash=faEyeSlash
  ocultar:boolean=true;
  ojitoAbierto:boolean=false;
  ojitoCerrado:boolean=true;
  constructor(private tokenService: TokenService,private authService: AuthService,private router: Router,private toastr: ToastrService) { }

  ngOnInit() {
    if(this.tokenService.getToken()){
      this.isLogged = true;
      this.isLoginFail = false;
      this.roles = this.tokenService.getAuthorities();
    }
  }

    mostrarOcultar(){
      this.ocultar=!this.ocultar;
    if (this.ocultar) {
      this.ojitoCerrado=true
        this.ojitoAbierto=false

    }else{
      this.ojitoAbierto=true
      this.ojitoCerrado=false

    }
  }

  onLogin(): void{
    this.loginUsuario = new LoginUsuario(this.nombreUsuario, this.password);
    this.authService.login(this.loginUsuario).subscribe(
      data => {
        this.isLogged = true;

        this.tokenService.setToken(data.token);
        this.tokenService.setUserName(data.nombreUsuario);
        this.tokenService.setAuthorities(data.authorities);
        this.roles = data.authorities;
         
            const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
            })

            Toast.fire({
            icon: 'success',
            iconColor:'#0A0A23',
            title: 'Bienvenido'
            })
        
        this.router.navigate(['']);
      },
      err => {
        this.isLogged = false;
        //this.isLoginFail = true;

        this.errMsj = err.error.mensaje;
                
        if (this.errMsj=="campos mal puestos"){
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
            })
    
            Toast.fire({
            icon: 'error',
            iconColor:'#0A0A23',
            title: 'Error de credenciales'
            })
        }else{
          const Toast = Swal.mixin({
            toast: true,
            position: 'top',
            showConfirmButton: false,
            timer: 3000,
            timerProgressBar: true,
            didOpen: (toast) => {
            toast.addEventListener('mouseenter', Swal.stopTimer)
            toast.addEventListener('mouseleave', Swal.resumeTimer)
            }
            })
          Toast.fire({
            icon: 'error',
            iconColor:'#0A0A23',
            title: 'Error de credenciales'
            })
        }
       // this.toastr.error(this.errMsj, 'Fail', {
          //timeOut: 9000,  positionClass: 'toast-top-center',
       // });
       
      }
    );
  }

  password_show_hide() {
    // var x = document.getElementById("password") as HTMLFormElement;
    // var show_eye = document.getElementById("show_eye");
    // var hide_eye = document.getElementById("hide_eye");
    // hide_eye.classList.remove("d-none");
    
    
    // if (x. === "password") {
    //   x.type = "text";
    //   show_eye.style.display = "none";
    //   hide_eye.style.display = "block";
    // } else {
    //   x.type = "password";
    //   show_eye.style.display = "block";
    //   hide_eye.style.display = "none";
    // }
  }
}
