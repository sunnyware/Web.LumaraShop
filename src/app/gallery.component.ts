import { Component, OnInit } from '@angular/core';
import {LumaraService} from "./service/lumara_service";

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styles: []
})
export class GalleryComponent implements OnInit {

  constructor(private lumaraService: LumaraService) {
    lumaraService.setHeadline('Foto-Galerie');
  }

  ngOnInit() {
  }

}
