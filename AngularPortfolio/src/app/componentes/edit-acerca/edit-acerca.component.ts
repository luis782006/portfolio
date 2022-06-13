import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import {faUser} from '@fortawesome/free-solid-svg-icons';
@Component({
  selector: 'app-edit-acerca',
  templateUrl: './edit-acerca.component.html',
  styleUrls: ['./edit-acerca.component.css']
})
export class EditAcercaComponent implements OnInit {
  faUser=faUser;
  
  @Output() enviarAcercaEdit=new EventEmitter();
  
  constructor() { }

  ngOnInit(): void {
  }
  
  onCierreEditAcerca(){
    this.enviarAcercaEdit.emit();
  }
}
