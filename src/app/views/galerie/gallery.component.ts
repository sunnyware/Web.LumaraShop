import { Component, OnInit } from '@angular/core';
import {LumaraService} from '../../service/lumara_service';
import {LumaraFormGroup} from '../../models/forms';
import {LumaraGalleryListItem} from '../../models/gallery';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-gallery',
  templateUrl: './gallery.component.html',
  styles: []
})
export class GalleryComponent implements OnInit {
  galleries: LumaraGalleryListItem[];
  constructor(private lumaraService: LumaraService, private http: HttpClient) {
    lumaraService.setHeadline('Foto-Galerie');
  }

  ngOnInit() {
    this.reloadGalleries();
  }

  reloadGalleries() {
    // const url = 'https://portal.lumara.de/forms/forms.json';
    const url = 'http://localhost:8990/images/gallery/gallery_list.json';
    this.http.get<LumaraGalleryListItem[]>(url).subscribe(data => {
      // console.log(data);
      this.galleries = data;
    });
  }

}
