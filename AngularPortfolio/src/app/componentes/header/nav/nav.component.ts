import { Component, OnInit } from '@angular/core';
import {faGithub,faLinkedin} from '@fortawesome/free-brands-svg-icons';

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit {

  faGithub=faGithub
  faLinkedin=faLinkedin

  constructor() { }

  ngOnInit(): void {
  }

}
