import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'AngularPortfolio';
  @Input() editAcercaVisible:boolean;

  // ngOnInit(){
  //   setTimeout(() => {console.log("Seccion expirada");
    
      
  //   }, 5000);
  // }

 
}
