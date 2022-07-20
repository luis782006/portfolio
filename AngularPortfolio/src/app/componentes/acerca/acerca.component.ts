import { Component, OnInit } from '@angular/core';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
//Import Formularios Reactivos
import {
  FormGroup,
  FormControlName,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-acerca',
  templateUrl: './acerca.component.html',
  styleUrls: ['./acerca.component.css']
})
export class AcercaComponent implements OnInit {
//Variables
    //Iconos
      faPen = faPen;
      
    //Formulario Reactivo
    form: FormGroup;


  pathFoto:string="../../../assets/profile-photo.jpg";
  miNombre:string="Luis F Sanchez Barranco";
  descripcion:string="Lorem ipsum, dolor sit amet consectetur adipisicing elit. Praesentium, nihil debitis? Mollitia tenetur aspernatur illo corrupti cumque, quos saepe amet molestiae aliquam eum iusto voluptatum iure nihil perspiciatis fugiat dolor!"
  
 
//Constructor
  constructor(
              private modalEditAcerca:NgbModal,
              private formBuilder:FormBuilder
              ) { 

    this.buildForm();
  }


//ngOnInit
  ngOnInit(): void {
    
  }


//Metodos

//Formulario 
private buildForm() {
  this.form = this.formBuilder.group({
    id: [''],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    photo_url:['', [Validators.required]],
    path_git:[""],
    path_link:['']
  });
}


  //abrir modal de edicion AcercaDeMi 
  openEditAcerca(modalPersona){
      this.modalEditAcerca.open(modalPersona);
    }
  
  //cerrar modal de edicion AcercaDeMi
  cerrarModal(modal) {
    this.modalEditAcerca.dismissAll(modal);
  }

  //guardar imagen del input tipo file
  obtener($event:any){
    //this.base64=$event[0].base64;
    //this.form.value.photo=this.base64;


    //this.persona.photo=$event[0].base64;
    //this.form.value.photo=this.persona;
  }

  //guardar cambios acercaDeMi
  save(event:Event){
    event.preventDefault();
  }
  

}
