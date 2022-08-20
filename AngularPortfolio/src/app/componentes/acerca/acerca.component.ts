import { Component, OnInit } from '@angular/core';
import {faPen,faQuestionCircle,faFilePen} from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Persona} from '../../models/Personas'
import {BannerComponent} from '../banner/banner.component';
//importaciones de terceros
import Swal from 'sweetalert2';

//Import Formularios Reactivos
import {
  FormGroup,
  FormBuilder,
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
      faQuestionCircle=faQuestionCircle;
      faFilePen=faFilePen;
    //Formulario Reactivo
    form: FormGroup;
    personas:Persona[];

    //variable para manejar la imagen en base64
    img:String="";
    imagenMostrar:String;

  
//Constructor
  constructor(
              private modalEditAcerca:NgbModal,
              private formBuilder:FormBuilder,
              private acercaService:AcercaServiceService
              ) { 

    this.buildForm(); // metodo que instancia el formulario
  }


//ngOnInit
  ngOnInit() {
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
    nombre: ['',Validators.required],
    apellido: ['',Validators.required],
    descripcion_acerca: [''],
    photo_url:['',Validators.required],
    path_git:[''],
    path_link:['']
  });
}

  //abrir modal de edicion AcercaDeMi 
  openEditAcerca(persona:Persona,modalPersona){
    this.modalEditAcerca.open(modalPersona);

    this.form.get('id').setValue(persona.id);
    this.form.get('nombre').setValue(persona.nombre);
    this.form.get('apellido').setValue(persona.apellido);
    this.form.get('descripcion_acerca').setValue(persona.descripcion_acerca);
    this.form.get('photo_url').setValue(persona.photo_url);
    this.form.get('path_git').setValue(persona.path_git);
    this.form.get('path_link').setValue(persona.path_link);   
   
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

  savePreview(event:Event, modalPresentacion){
    event.preventDefault();
    let personaActualizada:Persona;
    personaActualizada=this.form.value
    this.modalEditAcerca.dismissAll();
    this.modalEditAcerca.open(modalPresentacion)
    personaActualizada.photo_url=this.img
   // this.form.value.photo_url=this.img;
    console.log(this.form.value);
    this.imagenMostrar=personaActualizada.photo_url
  }
  //guardar cambios acercaDeMi
  saveLast(event:Event){
    event.preventDefault();
    this.form.value.photo_url=this.img;
    let personaActualizada:Persona;
    console.log(this.form.value);
  
    this.modalEditAcerca.dismissAll();
    
     if (this.form.valid){
      personaActualizada=this.form.value;
    //    //httpClient actualizar.
   
          this.acercaService.actualizarPersona(personaActualizada)
          .subscribe(data=>{
            
              Swal.fire({
                title:'Usuario actualizado',
                text:'Bienvenido '+ personaActualizada.nombre,
                icon:'success',
                iconColor:'#0A0A23',
                timer:2000,
                showConfirmButton:false
              })
            this.ngOnInit();
          
            //this.bannerComponent.refresBanner();
            //window. location. reload();
          })
        }  
        //httpClient fin actualizar
        else{
          this.form.markAllAsTouched();
          
        }
        this.modalEditAcerca.dismissAll();
    }
 
  

  }
