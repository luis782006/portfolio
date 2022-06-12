import { Component, OnInit } from '@angular/core';
import {faPen} from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {

  faPen = faPen;

  pathFoto:string="../../../assets/profile-photo.jpg";
  miNombre:string="Luis F Sanchez Barranco";
  acerca:string="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, nihil debitis? Mollitia tenetur aspernatur illo corrupti cumque, quos saepe amet molestiae aliquam eum iusto voluptatum iure nihil perspiciatis fugiat dolor!"
  visibleAcerca:boolean=true;
  visibleEdicion:boolean=false;

  constructor() { }

  ngOnInit(): void {
  }

}
