import { Component, OnInit } from '@angular/core';
import { LumaraGalleryItem } from '../../models/gallery';
import { Router, ActivatedRoute } from '@angular/router';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  templateUrl: './test.component.html',
  styleUrls: ['./test.component.css']
})
export class TestComponent implements OnInit {
  thumbnails: LumaraGalleryItem[];
  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.reloadThumbnails();
  }

  reloadThumbnails() {
      // const url = 'https://portal.lumara.de/forms/forms.json';
      const url = 'https://portal.lumara.de/images/gallery/2018-07/gallery.json';
      this.http.get<LumaraGalleryItem[]>(url).subscribe(data => {
        // console.log(data);
        this.thumbnails = data;
      });
  }
}
