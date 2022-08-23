import { Component, OnInit } from '@angular/core';
import { FormGroup, Validators,FormBuilder } from '@angular/forms';
import {faPen, faTrash,faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { faGraduationCap, faAnglesDown,faExclamationTriangle,faFilePen } from '@fortawesome/free-solid-svg-icons';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Educacion } from 'src/app/models/Educacion';
import { EducacionServiceService } from 'src/app/Services/educacion-service.service';
import { TokenService } from 'src/app/Services/token.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-educacion',
  templateUrl: './educacion.component.html',
  styleUrls: ['./educacion.component.css']
})
export class EducacionComponent implements OnInit {

  faPen=faPen
  faTrashCan=faTrashCan
  faTrash=faTrash
  faGraduationCap=faGraduationCap
  faAnglesDown=faAnglesDown
  faFilePen=faFilePen
  faExclamationTriangle=faExclamationTriangle
  educaciones:Educacion[]
  
    formEducacion:FormGroup
    editElimina:boolean=true
    //variable para manejar la imagen en base64
    imgEdu:String="";
    nombreEducacion:String;
    eduParaEliminar:Educacion
    selectedEducacion: any;
    //token
    isLogged:boolean;
    isLoginFail:boolean;
    roles: string[];
  

  constructor( 
    private servicioEducacion:EducacionServiceService,
    private formBuilder:FormBuilder,
    private mAgregarEdu:NgbModal,
    private mEditEliminarEdu:NgbModal,
    private mEliminaEdu:NgbModal,
    private tokenService: TokenService


  ) { 
    this.buildForm(); // metodo que instancia el formulario agregar Experiencia
  }

  ngOnInit(): void {
    this.servicioEducacion.getEducacion().subscribe((data) => {
      this.educaciones=data;});

      if(this.tokenService.getToken()){
        this.isLogged = true;
        this.isLoginFail = false;
        this.roles = this.tokenService.getAuthorities();
      }

  }

  buildForm(){
    this.formEducacion = this.formBuilder.group({
      id: [''],
      titulo: ['',[Validators.required]],
      institucion: [''],
      descripcion: [''],
      photo_url_educacion:['']
    });
  }

  openAgregarEdu(modal){
    this.mAgregarEdu.open(modal)
    this.formEducacion.reset()
    this.formEducacion.get('titulo').setValue("")
  }

  obtenerImgEdu($event:Event){
    event.preventDefault(); //cancela el reload.
    this.imgEdu=$event[0].base64;
    this.formEducacion.value.photo_url_educacion=this.imgEdu;
    
    
  }

  saveNuevaEducacion(event){
    event.preventDefault(); //cancela el reload.
    let insertEdu:Educacion;
    
    if (this.formEducacion.valid){
      insertEdu = this.formEducacion.value;
            
            
       // httpClient agregar.
        this.servicioEducacion.addEducacion(insertEdu)
        .subscribe(data=>{
            Swal.fire({
              title:'Educacion',
              text:'Educacion agregada',
              icon:'success',
              iconColor:'#0A0A23',
              timer:2000,
              showConfirmButton:false
            })

          this.ngOnInit();
          this.formEducacion.reset()
        
        
        })

        //httpClient fin agregar
       
    }else{
      this.formEducacion.markAllAsTouched();
      
    }
    this.mAgregarEdu.dismissAll();
  }
  
  saveEditEducacion(event){
    event.preventDefault(); //cancela el reload.
     let editEdu:Educacion;
     
    if (this.formEducacion.valid){
      
      editEdu = this.formEducacion.value;
        //httpClient agregar.
        this.servicioEducacion.actualizarEducacion(editEdu)
        .subscribe(data=>{
            Swal.fire({
              title:'Educacion',
              text:'Edicion de su certificado con exito',
              icon:'success',
              iconColor:'#0A0A23',
              timer:2000,
              showConfirmButton:false
            })

          this.ngOnInit();
          
          
        })

        //httpClient fin actualizarExperiencia
       
    }else{
      this.formEducacion.markAllAsTouched();
      
    }
    this.mEditEliminarEdu.dismissAll();
    ////////fin editar educacion
  }

  cerrarModal(modal){
    this.mAgregarEdu.dismissAll(modal);
  }

  onSelect(educacion:any): void{
    this.selectedEducacion=(this.selectedEducacion !=educacion) ? educacion : null;
  }
  editarEducacion(modal, educacion:Educacion){
      this.editElimina=true
      this.mEditEliminarEdu.open(modal)
      
      let educacionModalEdit:Educacion;
      educacionModalEdit=educacion;
      this.formEducacion.get('id').setValue(educacionModalEdit.id)
      this.formEducacion.get('titulo').setValue(educacionModalEdit.titulo)
      this.formEducacion.get('institucion').setValue(educacionModalEdit.institucion)
      this.formEducacion.get('descripcion').setValue(educacionModalEdit.descripcion)
      this.formEducacion.get('photo_url_educacion').setValue(educacionModalEdit.photo_url_educacion)
      //this.ejemplo=this.formEducacion.get('inicio_empresa').value;

  }


  eliminaEducacion(modal,educacion:Educacion){
      this.editElimina=false
      this.mEliminaEdu.open(modal)
      this.nombreEducacion=educacion.titulo
      this.eduParaEliminar=educacion
      console.log(this.eduParaEliminar);
      
  }
  eliminarEducacion(modal){
   
    console.log(this.eduParaEliminar);
    
    this.servicioEducacion.eliminarEducacion(this.eduParaEliminar)
    .subscribe(data=>{
        Swal.fire({
          title:'Experiencia eliminada',
          text:'Su experiencia a sido elimninada con exito',
          icon:'success',
          iconColor:'#0A0A23',
          timer:2000,
          showConfirmButton:false
        })
          
      this.ngOnInit();
      this.mEliminaEdu.dismissAll()
      
    })
   
   }
}
