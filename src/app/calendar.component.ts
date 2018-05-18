import { Component, OnInit } from '@angular/core';
import {LumaraService} from "./service/lumara_service";

@Component({
  selector: 'app-calendar',
  templateUrl: './calendar.component.html',
  styles: []
})
export class CalendarComponent implements OnInit {

  constructor(private lumaraService: LumaraService) {
    lumaraService.setHeadline('Backtermine');
  }

  ngOnInit() {
  }

}
