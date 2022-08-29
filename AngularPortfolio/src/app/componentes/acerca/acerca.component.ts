import { Component, OnInit } from '@angular/core';
import {faPen,faQuestionCircle,faFilePen} from '@fortawesome/free-solid-svg-icons';
import { NgbActiveModal, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import {Persona} from '../../models/Personas'
import {BannerComponent} from '../banner/banner.component';
//importaciones de terceros
import Swal from 'sweetalert2';
import * as AOS from 'aos';

//Import Formularios Reactivos
import {
  FormGroup,
  FormControlName,
  FormBuilder,
  FormControl,
  Validators,
} from '@angular/forms';
import { AcercaServiceService } from 'src/app/Services/acerca-service.service';
import { TokenService } from 'src/app/Services/token.service';


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
    mostrarCargaFoto:boolean=false;
    auxPhoto_url:string;
    checkboxMostraFoto:boolean
    //control token
    roles:string[];
    logged:string[]=[]
    isNotLogged:boolean=false
  
//Constructor
  constructor(
              private modalEditAcerca:NgbModal,
              private formBuilder:FormBuilder,
              private acercaService:AcercaServiceService,
              private tokenService: TokenService
              ) { 

    this.buildForm(); // metodo que instancia el formulario
  }


//ngOnInit



  ngOnInit(): void {
    //metodo http get
    
    this.acercaService.getPersonas().subscribe((data) => {
      this.personas = data;
    
    });

    this.logged=this.tokenService.getAuthorities()
    if (this.logged.length==0) {
      this.isNotLogged=true
    }
    
    AOS.init();
  }

//Metodos

//Formulario 
private buildForm() {
  this.form = this.formBuilder.group({
    id: [''],
    nombre: ['',Validators.required],
    apellido: ['',Validators.required],
    descripcion_acerca: ['',[,Validators.required,Validators.maxLength(350)]],
    photo_url:['',Validators.required],
    path_git:[''],
    path_link:['']
  });
}


  //abrir modal de edicion AcercaDeMi 
  openEditAcerca(persona:Persona,modalPersona){
     
    if (this.isNotLogged) {
      Swal.fire({
        title:'Actualizar Usuario',
        titleText:'Lo sentimos. No posee permiso para modificar: ',
        text: ''+persona.nombre,
        icon:'error',
        iconColor:'#0A0A23',
        timer:5000,
        showConfirmButton:false
      })
    } else {
    this.modalEditAcerca.open(modalPersona);
    console.log(this.isNotLogged);
   
    let personaModal:Persona;
    personaModal=persona
    this.form.get('id').setValue(personaModal.id);
    this.form.get('nombre').setValue(personaModal.nombre);
    this.form.get('apellido').setValue(personaModal.apellido);
    this.form.get('descripcion_acerca').setValue(personaModal.descripcion_acerca);
    this.form.get('photo_url').setValue(personaModal.photo_url);
    this.form.get('path_git').setValue(personaModal.path_git);
    this.form.get('path_link').setValue(personaModal.path_link);
    this.auxPhoto_url=this.form.get('photo_url').value
    }
    
    
    }
    toggleMostrarCargaFoto(){

       this.mostrarCargaFoto=!this.mostrarCargaFoto
       if (this.mostrarCargaFoto) {
        this.form.get('photo_url').setValue("")    
       } else {
        this.form.value.photo_url=this.auxPhoto_url
        this.form.get('photo_url').setValue(this.auxPhoto_url);
       }
    }

  //cerrar modal de edicion AcercaDeMi
  cerrarModal(modal) {
    this.modalEditAcerca.dismissAll(modal);
    this.mostrarCargaFoto=false
    this.auxPhoto_url=this.form.get('photo_url').value
  }

  //guardar imagen del input tipo file
  obtener($event:any){
    //let img:String="";
    this.img=$event[0].base64;
    this.form.get('photo_url').setValue(this.img);
    this.mostrarCargaFoto=false
    this.checkboxMostraFoto=false 
  }

  savePreview(event:Event, modalPresentacion){
    event.preventDefault();
    let personaActualizada:Persona;
    this.modalEditAcerca.dismissAll();
    this.modalEditAcerca.open(modalPresentacion)
    if (this.mostrarCargaFoto){
      this.img=this.auxPhoto_url
    }else{
      this.img=this.form.get('photo_url').value

    }
    
  
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
            this.acercaService.setRefresh(true);
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
