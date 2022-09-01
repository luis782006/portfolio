import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerServiceService } from 'src/app/Services/spinner-service.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.css']
})
export class SpinnerComponent implements OnInit {
  showSpinner:boolean=true

  constructor(private spinnerService:SpinnerServiceService, private cdRef: ChangeDetectorRef) {

  }

  ngOnInit() {
    this.init();
  }
  init() {

    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = (status === 'start');
      this.cdRef.detectChanges();
    });
  }

}
