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
   bannerComponent:BannerComponent

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

    let personaModal:Persona;
    personaModal=persona
    this.form.get('id').setValue(personaModal.id);
    this.form.get('nombre').setValue(personaModal.nombre);
    this.form.get('apellido').setValue(personaModal.apellido);
    this.form.get('descripcion_acerca').setValue(personaModal.descripcion_acerca);
    this.form.get('photo_url').setValue(personaModal.photo_url);
    this.form.get('path_git').setValue(personaModal.path_git);
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

  savePreview(event:Event, modalPresentacion){
    event.preventDefault();
    let personaActualizada:Persona;
    this.modalEditAcerca.dismissAll();
    this.modalEditAcerca.open(modalPresentacion)
  }
  //guardar cambios acercaDeMi
  saveLast(event:Event){
    event.preventDefault();
    let personaActualizada:Persona;
    this.modalEditAcerca.dismissAll();
     if (this.form.valid){
       personaActualizada = this.form.value;
            
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
            window. location. reload();
          })
        }  
        //httpClient fin actualizar
        else{
          this.form.markAllAsTouched();
          
        }
        this.modalEditAcerca.dismissAll();
    }
 
  

  }
