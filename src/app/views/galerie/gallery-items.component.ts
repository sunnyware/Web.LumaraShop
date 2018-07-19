import { Component, OnInit } from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {HttpClient} from '@angular/common/http';
import { LumaraGalleryItem } from '../../models/gallery';

@Component({
  selector: 'app-gallery-items',
  templateUrl: './gallery-items.component.html',
  styles: []
})

export class GalleryItemsComponent implements OnInit {
  private currentRoute: any;
  public galleryID = '';
  thumbnails: LumaraGalleryItem[];

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) {

  }

  ngOnInit() {
    this.currentRoute = this.route.params.subscribe(params => {
      this.galleryID = params['term'];
      this.reloadThumbnails();
    });
  }

  reloadThumbnails() {
    if (this.galleryID === '') {
      return;
    }
      // const url = 'https://portal.lumara.de/forms/forms.json';
      const url = 'http://localhost:8990/images/gallery/' + this.galleryID + '/gallery.json';
      this.http.get<LumaraGalleryItem[]>(url).subscribe(data => {
        // console.log(data);
        this.thumbnails = data;
      });
  }
}
