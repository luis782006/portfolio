import { Component,  OnInit } from '@angular/core';
import { Router } from '@angular/router';


@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {
  
  

  visible:boolean=false;
  constructor(
    private route:Router
  ) { }

  ngOnInit(): void {
    
  }
 loginVisible(){
  this.route.navigate(['login'])
 // this.visible=!this.visible;
 }

}
