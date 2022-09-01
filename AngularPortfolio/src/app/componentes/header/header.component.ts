import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { TokenService } from 'src/app/Services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  textLogin:string="Login";
  roles:string[];
  isLogged:boolean=false;
  constructor(
    private route:Router,
    private tokenService: TokenService
  ) { }

  ngOnInit() {
  
    this.roles = this.tokenService.getAuthorities();
      this.roles.forEach(rol => {

        if (rol=== 'ROLE_ADMIN'){
          this.textLogin="Admin Logeado"  
          this.isLogged=true;
  
        // }else{
        //   if(rol==='ROLE_USER'){
        //     this.textLogin="Usuario Logeado" 
        //     this.isLogged=true; 
        //   }
         }
      });
    
  }

 irLogin(){
  if (this.isLogged) {
    this.tokenService.logOut();
    window.location.reload();
    this.route.navigate([' '])
  } else {

    this.route.navigate(['login'])
  }
  
 
 }

}
