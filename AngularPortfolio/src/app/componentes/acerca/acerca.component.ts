import { Component, OnInit } from '@angular/core';
import {faPen} from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Persona} from '../../models/Personas'
import Swal from 'sweetalert2';
//Import Formularios Reactivos
import {
  FormGroup,
  FormControlName,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AcercaServiceService } from 'src/app/Services/acerca-service.service';

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
    personas:Persona[];

    //variable para manejar la imagen en base64
    img:String="";
 
//Constructor
  constructor(
              private modalEditAcerca:NgbModal,
              private formBuilder:FormBuilder,
              private acercaService:AcercaServiceService,
             
                
              
              ) { 

    this.buildForm(); // metodo que instancia el formulario
  }


//ngOnInit
  ngOnInit(): void {
    //metodo http get
    this.acercaService.getPersonas().subscribe((data) => {
      this.personas = data;
    });
  }


//Metodos

//Formulario 
private buildForm() {
  this.form = this.formBuilder.group({
    id: [''],
    nombre: ['', [Validators.required]],
    apellido: ['', [Validators.required]],
    descripcion_acerca:['Mi descripcion'],
    photo_url:['', [Validators.required]],
    path_git:['Mi url de git'],
    path_link:['Mi url de linkedin']
  });
}


  //abrir modal de edicion AcercaDeMi 
  openEditAcerca(persona:Persona,modalPersona){
      this.modalEditAcerca.open(modalPersona);

    let personaModal:Persona;
    personaModal=persona
    this.form.get('id').setValue(personaModal.id);
    this.form.get('nombre').setValue(personaModal.nombre);
    this.form.get('apellido').setValue(personaModal.apellido);
    this.form.get('descripcion_acerca').setValue(personaModal.descripcion_acerca);
    this.form.get('path_Git').setValue(personaModal.path_git);
    this.form.get('path_link').setValue(personaModal.path_link);
    
    }
  
  //cerrar modal de edicion AcercaDeMi
  cerrarModal(modal) {
    this.modalEditAcerca.dismissAll(modal);
  }

  //guardar imagen del input tipo file
  obtener($event:any){
    //let img:String="";
    this.img=$event[0].base64;
    this.form.value.photo_url=this.img;
  }

  //guardar cambios acercaDeMi
  save(event:Event){
    event.preventDefault();
    let personaActualizada:Persona;
   
    if (this.form.valid){
      personaActualizada = this.form.value;
        //httpClient actualizar.
            this.acercaService.actualizarPersona(personaActualizada)
              .subscribe(data=>{
                Swal.fire({
                  title: 'Sweet!',
                  text: 'Modal with a custom image.',
                  imageUrl: 'https://unsplash.it/400/200',
                  imageWidth: 400,
                  imageHeight: 200,
                  imageAlt: 'Custom image',
                });
            this.ngOnInit();
            });
        //httpClient fin actualizar
        
    }else{
      this.form.markAllAsTouched();
    }
    this.modalEditAcerca.dismissAll();
  }
  

}
