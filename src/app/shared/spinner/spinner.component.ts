import { ChangeDetectorRef, Component, OnInit } from '@angular/core';
import { SpinnerService } from './service/spinner.service';

@Component({
  selector: 'app-spinner',
  templateUrl: './spinner.component.html',
  styleUrls: ['./spinner.component.scss']
})
export class SpinnerComponent implements OnInit {
  showSpinner = false;
  constructor(private spinnerService: SpinnerService, private cdRef: ChangeDetectorRef) { }

  ngOnInit(): void {
    this.spinnerService.getSpinnerObserver().subscribe((status) => {
      this.showSpinner = (status === 'start');
      //In some cases, the api will not detect the change detection so we call it manually 
      this.cdRef.detectChanges();
    });
  }

}
