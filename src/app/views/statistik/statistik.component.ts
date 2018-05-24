import { Component, OnInit } from '@angular/core';
import {LumaraService} from "../../service/lumara_service";

@Component({
  selector: 'app-statistik',
  templateUrl: './statistik.component.html',
  styles: []
})
export class StatistikComponent implements OnInit {

  constructor(private lumaraService: LumaraService) {
    lumaraService.setHeadline('Statistik');
  }

  ngOnInit() {
  }

}
