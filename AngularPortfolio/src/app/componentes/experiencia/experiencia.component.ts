
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import {faPen, faTrash,faExclamationTriangle,faFilePen,faTrashCan,faQuestion} from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { ExperienciaServiceService } from 'src/app/Services/experiencia-service.service';
import {Experiencia} from '../../models/Experiencias'
import Swal from 'sweetalert2';
import { TokenService } from 'src/app/Services/token.service';
import * as Aos from 'aos';
import { AOS } from 'dist/angular-portfolio/scripts.9ccc2a1c86c359d3';

@Component({
  selector: 'app-experiencia',
  templateUrl: './experiencia.component.html',
  styleUrls: ['./experiencia.component.css']
})
export class ExperienciaComponent implements OnInit {
  //creando el element script
  mAgregarExp:HTMLScriptElement;

  expe:number;
  faPen=faPen;
  faTrashCan=faTrashCan
  faTrash=faTrash;
  faQuestion=faQuestion
  faExclamationTriangle=faExclamationTriangle;
  experiencias:Experiencia[];
  faFilePen=faFilePen;
  
  nombreEmpresaEliminar:String
  idEmpresaEliminar:number
  expeParaEliminar:any

  fechaDisplayIn:boolean=false;
  fechaDisplayOut:boolean=false;
  auxFechanIn:string
  auxFechaOut:string

  fechaFinalIn:String
  fechaFinalOut:String
  fechaIn:String
  fechaOut:String
   ejemplo:String
  //formulario
  formAgregarExp:FormGroup
//token
isLogged:boolean;
isLoginFail:boolean;
roles: string[];
  //variable para manejar la imagen en base64
  img:String="";

  constructor(  
    //injeciones
    private experienciaService:ExperienciaServiceService,
    private modalAgregarExp:NgbModal,
    private formBuilder:FormBuilder,
    private modalEditarExp:NgbModal,
    private modalEliminarExp:NgbModal,
    private tokenService:TokenService
   //fin de injeciones
    ) { 
      
      this.buildForm(); // metodo que instancia el formulario agregar Experiencia

      
    }

  ngOnInit(): void {
      //metodo http get
    
      this.experienciaService.getExperiencia().subscribe((data) => {
        this.experiencias=data;});

        if(this.tokenService.getToken()){
          this.isLogged = true;
          this.isLoginFail = false;
          this.roles = this.tokenService.getAuthorities();
        }
       // AOS.init();
       
  }  
  
  //metodo para armar el formulario
  private buildForm() {
    this.formAgregarExp = this.formBuilder.group({
      id: [''],
      nombre_empresa: ['',[Validators.required,Validators.maxLength(50)]],
      inicio_empresa: [''],
      fin_empresa: [''],
      descripcion_empresa:['',[Validators.required,Validators.maxLength(350)]],
      photo_url_empresa:[''],
      
    });
  }

  //obtener imagen Empresa
  obtenerImgEmp($event:Event){
    event.preventDefault(); //cancela el reload.
    this.img=$event[0].base64;
    this.formAgregarExp.value.photo_url_empresa=this.img;
  }

  //abrir modal Agregar Expe
  openAgregarExp(modal){
    this.modalAgregarExp.open(modal)
    this.formAgregarExp.reset()
    this.formAgregarExp.get('nombre_empresa').setValue("")
    this.formAgregarExp.get('descripcion_empresa').setValue("")
  }

  saveNuevaEmpresa(event:Event){
    event.preventDefault(); //cancela el reload.
    let insertExpe:Experiencia;
    
    if (this.formAgregarExp.valid){
      insertExpe = this.formAgregarExp.value;
            
        //httpClient agregar.
        this.experienciaService.addExperiencia(insertExpe)
        .subscribe(data=>{
            Swal.fire({
              title:'Experiencia',
              text:'Experiencia agregada',
              icon:'success',
              iconColor:'#0A0A23',
              timer:2000,
              showConfirmButton:false
            })

          this.ngOnInit();
          // this.formAgregarExp.reset()
          this.formAgregarExp.get('nombre_empresa').setValue("")
          this.formAgregarExp.get('descripcion_empresa').setValue("")
          this.fechaDisplayIn=false;
          this.fechaDisplayOut=false;
        })

        //httpClient fin agregar
       
    }else{
      this.formAgregarExp.markAllAsTouched();
      
    }
    this.modalAgregarExp.dismissAll();
  }
  
  cerrarModal(modal){
    this.modalAgregarExp.dismissAll(modal);
  }
  

  openEditExpe(experiencia:Experiencia,modal){
      this.modalEditarExp.open(modal)
      let experienciaModal:Experiencia;
      experienciaModal=experiencia;
      this.formAgregarExp.get('id').setValue(experienciaModal.id)
      this.formAgregarExp.get('nombre_empresa').setValue(experienciaModal.nombre_empresa)
      this.formAgregarExp.get('descripcion_empresa').setValue(experienciaModal.descripcion_empresa)
      this.formAgregarExp.get('photo_url_empresa').setValue(experienciaModal.photo_url_empresa)
     
      this.formAgregarExp.get('inicio_empresa').setValue(experienciaModal.inicio_empresa)
      this.formAgregarExp.get('fin_empresa').setValue(experienciaModal.inicio_empresa)
      //this.ejemplo=this.formAgregarExp.get('inicio_empresa').value;
      
      
      let fechaNoFormatIn=experienciaModal.inicio_empresa
      if (fechaNoFormatIn!=null) {
        //formateo de fecha In
        let fechaFormatIn:any[]=fechaNoFormatIn.split('-')  
        this.fechaIn=""   
        for (let i=fechaFormatIn.length-1; i>=0; i--) {
            this.fechaIn=this.fechaIn.concat('/',fechaFormatIn[i])
        }
            this.fechaIn=this.fechaIn.slice(1,this.fechaIn.length);
            this.fechaFinalIn=this.fechaIn
        // fin formateo fecha in 
      }


      let fechaNoFormatOut=experienciaModal.fin_empresa
      if (fechaNoFormatOut!=null) {
        //formateo fecha out
      
      let fechaFormatOut:any[]=fechaNoFormatOut.split('-')  
      this.fechaOut=""
      for (let i=fechaFormatOut.length-1; i>=0; i--) {
        this.fechaOut=this.fechaOut.concat('/',fechaFormatOut[i])
    } 
         this.fechaOut=this.fechaOut.slice(1,this.fechaOut.length);  
     
      //fin formateo fecha out
      this.fechaFinalOut=this.fechaOut
      //transfiero fechas formateadas
      }

  }l
 
  public toogleFechaDisplayIn(value:boolean){
    console.log(this.fechaDisplayIn = value);
    if (value){
      this.formAgregarExp.get('inicio_empresa').setValue("")
      this.formAgregarExp.get('fin_empresa').setValue("")

    }
}
// public toogleFechaDisplayOut(value:boolean,fechaIn:string,fechaOut:string){
//   console.log(this.fechaDisplayOut = value);
//   console.log("Hola1"+ value)
//   this.formAgregarExp.get('inicio_empresa').setValue(fechaIn)
//   this.formAgregarExp.get('fin_empresa').setValue(fechaOut)
//   console.log("Despues de cancelar"+ fechaIn + "fechaout "+fechaOut)

// }
//Actualiza experiencia con el servicio http actualizarExperiencia
  saveEditEmpresa(event){
    event.preventDefault(); //cancela el reload.
   
    let editExpe:Experiencia;
    this.fechaDisplayIn=false
    this.fechaDisplayOut=false
   
    if (this.formAgregarExp.valid){
      
      editExpe = this.formAgregarExp.value;
      ////////////////////////////////////////////
    let fechaNoFormatIn=editExpe.inicio_empresa

    if (fechaNoFormatIn!=null) {
      //formateo de fecha In
      let fechaFormatIn:any[]=fechaNoFormatIn.split('-')  
      this.fechaIn=""   
      for (let i=fechaFormatIn.length-1; i>=0; i--) {
          this.fechaIn=this.fechaIn.concat('/',fechaFormatIn[i])
      }
          this.fechaIn=this.fechaIn.slice(1,this.fechaIn.length);
          this.fechaFinalIn=this.fechaIn
      // fin formateo fecha in 
    }


    let fechaNoFormatOut=editExpe.fin_empresa
    if (fechaNoFormatOut!=null) {
      //formateo fecha out
    
    let fechaFormatOut:any[]=fechaNoFormatOut.split('-')  
    this.fechaOut=""
    for (let i=fechaFormatOut.length-1; i>=0; i--) {
      this.fechaOut=this.fechaOut.concat('/',fechaFormatOut[i])
  }
       this.fechaOut=this.fechaOut.slice(1,this.fechaOut.length);  
   
    //fin formateo fecha out
    this.fechaFinalOut=this.fechaOut
    //transfiero fechas formateadas
    }
//////////////////////////////
      editExpe.inicio_empresa=this.fechaFinalIn
      editExpe.fin_empresa=this.fechaFinalOut
         
        //httpClient agregar.
        this.experienciaService. actualizarExperiencia(editExpe)
        .subscribe(data=>{
            Swal.fire({
              title:'Experiencia',
              text:'Edicion de su experiencia con exito',
              icon:'success',
              iconColor:'#0A0A23',
              timer:2000,
              showConfirmButton:false
            })

          this.ngOnInit();
          
          
        })

        //httpClient fin actualizarExperiencia
       
    }else{
      this.formAgregarExp.markAllAsTouched();
      
    }
    this.modalAgregarExp.dismissAll();
  }
  openELiminarExp(modal,experiencia:Experiencia){
    this.modalEliminarExp.open(modal);
     this.nombreEmpresaEliminar=experiencia.nombre_empresa
    //console.log(experiencia.nombre_empresa);
    this.expeParaEliminar=experiencia
    //console.log(this.expeParaEliminar);
    
  }
 
eliminarExp(modal){

    this.experienciaService.eliminarExperiencia(this.expeParaEliminar)
    .subscribe(data=>{
        Swal.fire({
          title:'Experiencia eliminada',
          text:'Su experiencia ha sido elimninada con exito',
          icon:'success',
          iconColor:'#0A0A23',
          timer:2000,
          showConfirmButton:false
        })
          
      this.ngOnInit();
      this.modalEliminarExp.dismissAll()
      
    })
}
//fin bloque
}
