import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {faPen, faTrash,faExclamationTriangle,faFilePen,faTrashCan,faQuestion} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Proyectos } from 'src/app/models/Proyectos';
import { ProyectoServiceService } from 'src/app/Services/proyecto-service.service';
import { TokenService } from 'src/app/Services/token.service';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-proyecto',
  templateUrl: './proyecto.component.html',
  styleUrls: ['./proyecto.component.css']
})
export class ProyectoComponent implements OnInit {

  faTrash=faTrash
  faPen=faPen
  faTrashCan=faTrashCan
  faExclamationTriangle=faExclamationTriangle

  proyectos:Proyectos[];
  formProyecto:FormGroup;
  img:String="";
  nombreProyectoEliminar:String
  poryectoParaEliminar:Proyectos
    //tokenService
    isLogged:boolean;
    isLoginFail:boolean;
    roles: string[];

  constructor(
    private proyectoService:ProyectoServiceService,
    private modalAgregarProyecto:NgbModal,
    private formBuilder:FormBuilder,
    private modalEditarProyecto:NgbModal,
    private modalEliminarProyecto:NgbModal,
    private tokenService: TokenService

  ) { 
    this.buildForm(); // metodo que instancia el formulario agregar Proyecto

  }
  private buildForm() {
    this.formProyecto = this.formBuilder.group({
      id: [''],
      nombre_proyecto: ['',[Validators.required,Validators.maxLength(50)]],
      descripcion_proyecto:['',[Validators.required,Validators.maxLength(350)]],
      photo_url:[''],
      link_url:[''],
    });
  }

  ngOnInit(): void {
    this.proyectoService.getProyecto().subscribe((data) => {
      this.proyectos=data;});

      if(this.tokenService.getToken()){
        this.isLogged = true;
        this.isLoginFail = false;
        this.roles = this.tokenService.getAuthorities();
       }

  }

  openAgregarProyecto(modal){
    this.modalAgregarProyecto.open(modal);
    this.formProyecto.get('nombre_proyecto').setValue("")
    this.formProyecto.get('descripcion_proyecto').setValue("")

  }
  obtenerImgProyecto($event:Event){
    event.preventDefault(); //cancela el reload.
    this.img=$event[0].base64;
    this.formProyecto.value.photo_url=this.img;
  }
  saveNuevaProyecto(event:Event){
    event.preventDefault();
    let insertProyecto:Proyectos;
    
    if (this.formProyecto.valid){
      insertProyecto = this.formProyecto.value;
            
        //httpClient agregar.
        this.proyectoService.addProyecto(insertProyecto)
        .subscribe(data=>{
            Swal.fire({
              title:'Proyectos',
              text:'Proyectos agregado',
              icon:'success',
              iconColor:'#0A0A23',
              timer:2000,
              showConfirmButton:false
            })

          this.ngOnInit();
          // this.formAgregarExp.reset()
          this.formProyecto.get('nombre_proyecto').setValue("")
          this.formProyecto.get('descripcion_proyecto').setValue("")
          
        })

        //httpClient fin agregar
       
    }else{
      this.formProyecto.markAllAsTouched();
      
    }
    this.modalAgregarProyecto.dismissAll();
  }
  
 

  cerrarModal(modal){
    this.modalAgregarProyecto.dismissAll(modal)
    this.formProyecto.get('nombre_proyecto').setValue("")
    this.formProyecto.get('descripcion_proyecto').setValue("")
    this.formProyecto.reset();
  }
  openEditProyecto(proyecto:Proyectos,modal){
    this.modalEditarProyecto.open(modal);
    let proyectoModal:Proyectos;
    proyectoModal=proyecto;
    this.formProyecto.get('id').setValue(proyectoModal.id)
    this.formProyecto.get('nombre_proyecto').setValue(proyectoModal.nombre_proyecto)
    this.formProyecto.get('descripcion_proyecto').setValue(proyectoModal.descripcion_proyecto)
    this.formProyecto.get('photo_url').setValue(proyectoModal.photo_url)
    this.formProyecto.get('link_url').setValue(proyectoModal.link_url)
  }
  saveEditProyecto(event){
    event.preventDefault(); //cancela el reload.
    let editProyecto:Proyectos;
    if (this.formProyecto.valid){
      editProyecto=this.formProyecto.value
      
       //httpClient inicio actualizarProyecto

      this.proyectoService. actualizarProyecto(editProyecto)
        .subscribe(data=>{
            Swal.fire({
              title:'Proyectos',
              text:'Edicion de su proyecto con exito',
              icon:'success',
              iconColor:'#0A0A23',
              timer:2000,
              showConfirmButton:false
            })

          this.ngOnInit();
          
          
        })

        //httpClient fin actualizarProyecto
       
      }else{
        this.formProyecto.markAllAsTouched();
        
      }
    this.modalEditarProyecto.dismissAll();
    }

    openEliminarProyecto(proyecto:Proyectos,modal){
      this.modalEliminarProyecto.open(modal)
      this.nombreProyectoEliminar=proyecto.nombre_proyecto
      this.poryectoParaEliminar=proyecto
     
    }
    eliminarProyecto(modal){
      this.proyectoService.eliminarProyecto(this.poryectoParaEliminar)
    .subscribe(data=>{
        Swal.fire({
          title:'Proyecto eliminado',
          text:'Su proyecto ha sido elimninado con exito',
          icon:'success',
          iconColor:'#0A0A23',
          timer:2000,
          showConfirmButton:false
        })
          
      this.ngOnInit();
      this.modalEliminarProyecto.dismissAll()
      
    })
    }
  
  //fin bloque
}
