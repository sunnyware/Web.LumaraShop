import {Component, OnInit} from '@angular/core';
import {LumaraService} from "./service/lumara_service";

@Component({
  selector: 'app-artikelliste',
  templateUrl: './artikelliste.component.html',
  styles: []
})
export class ArtikellisteComponent implements OnInit {

  constructor(private lumaraService: LumaraService) {
    lumaraService.setHeadline('Artikeldaten');
  }

  ngOnInit() {
  }

}
