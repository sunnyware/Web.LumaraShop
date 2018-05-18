import {Component, OnInit} from '@angular/core';
import {LumaraService} from './service/lumara_service';

@Component({
  selector: 'app-user-data',
  templateUrl: './user-data.component.html',
  styles: []
})
export class UserDataComponent implements OnInit {
  password = '';

  constructor(private lumaraService: LumaraService) {
    lumaraService.setHeadline('Stammdaten');
  }

  ngOnInit() {
  }

  checkComparison() {

  }

  onFormSubmit($event) {

  }
}
