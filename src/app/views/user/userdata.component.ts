import { Component, OnInit } from '@angular/core';
import {LumaraService} from '../../service/lumara_service';

@Component({
  selector: 'app-userdata',
  templateUrl: './userdata.component.html',
  styles: []
})
export class UserdataComponent implements OnInit {

  constructor(private lumaraService: LumaraService) {
    lumaraService.setHeadline('meine Daten');
  }

  ngOnInit() {
  }

}
