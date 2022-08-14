import { Component, OnInit } from '@angular/core';
import {faPen, faTrash,faExclamationTriangle,faFilePen,faTrashCan} from '@fortawesome/free-solid-svg-icons';
import { NgCircleProgressModule } from 'ng-circle-progress';
import { HardSoftSkill } from 'src/app/models/HardSoftSkill';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { HardSoftServiceService } from 'src/app/Services/hard-soft-service.service';

@Component({
  selector: 'app-hard-soft-skill',
  templateUrl: './hard-soft-skill.component.html',
  styleUrls: ['./hard-soft-skill.component.css']
})
export class HardSoftSkillComponent implements OnInit {

  faPen=faPen
  faTrash=faTrash
  faExclamationTriangle=faExclamationTriangle
  faFilePen=faFilePen
  faTrashCan=faTrashCan

  hardSoftSkills:HardSoftSkill[];
  formAgregarHardSoft:FormGroup
  nombreHabilidadEliminar:String
  hardSoftParaEliminar:HardSoftSkill
  

  constructor(
    private modalAgregarHardSoft:NgbModal,
    private modalEditHardSoft:NgbModal,
    private modalEliminarHardSoft:NgbModal,
    private formBuilder:FormBuilder,
    private servicioHardSoft:HardSoftServiceService
  ) { 
    this.buildForm(); // metodo que instancia el formulario agregar HardSoft
  }

  ngOnInit(): void {
    this.servicioHardSoft.getHardSoftSkills().subscribe((data) => {
      this.hardSoftSkills=data;});

  }
  private buildForm() {
    this.formAgregarHardSoft = this.formBuilder.group({
      id: [''],
      tipo_habilidad: ['',[Validators.required,Validators.maxLength(50)]],
      nivel:['',[Validators.min(10)]]

    });
  }

  openAgregarHardSoft(modal){
    this.modalAgregarHardSoft.open(modal)
    this.formAgregarHardSoft.reset()
    this.formAgregarHardSoft.get('tipo_habilidad').setValue("")
    this.formAgregarHardSoft.get('nivel').setValue(0)
  }
  saveNuevaHardSoft(event:Event){
    event.preventDefault(); //cancela el reload.
    let insertHardSoft:HardSoftSkill;
    
    if (this.formAgregarHardSoft.valid){
      insertHardSoft = this.formAgregarHardSoft.value;
           
            
       // httpClient agregar.
        this.servicioHardSoft.addHardSoftSkills(insertHardSoft)
        .subscribe(data=>{
            Swal.fire({
              title:'Hard &Soft Skills',
              text:'Habilidad agregada',
              icon:'success',
              iconColor:'#0A0A23',
              timer:2000,
              showConfirmButton:false
            })

          this.ngOnInit();
          // this.formAgregarExp.reset()
          this.formAgregarHardSoft.get('tipo_habilidad').setValue("")
        
        })

        //httpClient fin agregar
       
    }else{
      this.formAgregarHardSoft.markAllAsTouched();
      
    }
    this.modalAgregarHardSoft.dismissAll()
  }

  cerrarModal(event){
    this.modalAgregarHardSoft.dismissAll()
  }
  openEditHardSoft(modal,hardSoftSkills:HardSoftSkill){
    this.modalEditHardSoft.open(modal);
    let hardSoftModal:HardSoftSkill;
    hardSoftModal=hardSoftSkills;
    this.formAgregarHardSoft.get('id').setValue(hardSoftModal.id)
    this.formAgregarHardSoft.get('tipo_habilidad').setValue(hardSoftModal.tipo_habilidad)
    this.formAgregarHardSoft.get('nivel').setValue(hardSoftModal.nivel)
  }
  saveEditHardSoft(event){
    event.preventDefault(); //cancela el reload.
   
    let editHardSoft:HardSoftSkill;
    
    if (this.formAgregarHardSoft.valid){
      
      editHardSoft = this.formAgregarHardSoft.value;
      
        //httpClient agregar.
        this.servicioHardSoft.actualizarHardSoftSkills(editHardSoft)
        .subscribe(data=>{
            Swal.fire({
              title:'Hard & Soft Skills',
              text:'Edicion de sus habilidades con exito',
              icon:'success',
              iconColor:'#0A0A23',
              timer:2000,
              showConfirmButton:false
            })

          this.ngOnInit();
          
          
        })

        //httpClient fin actualizarExperiencia
       
    }else{
      this.formAgregarHardSoft.markAllAsTouched();
      
    }
    this.modalEditHardSoft.dismissAll();
  }
  openEliminarHardSoft(modal,hardSoftSkills:HardSoftSkill){
    this.modalEliminarHardSoft.open(modal)
    this.nombreHabilidadEliminar=hardSoftSkills.tipo_habilidad
    this.hardSoftParaEliminar=hardSoftSkills
  }
  eliminarHardSoft(event){

    this.servicioHardSoft.eliminarHardSoftSkills(this.hardSoftParaEliminar)
    .subscribe(data=>{
        Swal.fire({
          title:'Habilidad eliminada',
          text:'Su habilidad a sido elimninada con exito',
          icon:'success',
          iconColor:'#0A0A23',
          timer:2000,
          showConfirmButton:false
        })
          
      this.ngOnInit();
      this.modalEliminarHardSoft.dismissAll()
      
    })
  }
  //fin de clase
}
