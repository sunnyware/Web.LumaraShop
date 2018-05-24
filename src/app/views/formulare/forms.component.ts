import { Component, OnInit } from '@angular/core';
import {LumaraService} from "../../service/lumara_service";

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styles: []
})
export class FormsComponent implements OnInit {

  constructor(private lumaraService: LumaraService) {
    lumaraService.setHeadline('Formulare');
  }

  ngOnInit() {
  }

}
