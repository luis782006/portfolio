import { Component, OnInit } from '@angular/core';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {

  faPen = faPen;

  pathFoto:string="../../../assets/profile-photo.jpg";
  miNombre:string="Luis F Sanchez Barranco";
  descripcion:string="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, nihil debitis? Mollitia tenetur aspernatur illo corrupti cumque, quos saepe amet molestiae aliquam eum iusto voluptatum iure nihil perspiciatis fugiat dolor!"
  
 

  constructor(private modalPersona:NgbModal) { }

  ngOnInit(): void {
    
  }
  openEditAcerca(modalPersona){
   
    this.modalPersona.open(modalPersona);
  }
  cambioEditVisible(e){ // e de evento. obejto que se recibe.desde el output.component hijo.
    //this.editAcercaVisible=e;
    //this.acercaVisible=true;
  }


}
