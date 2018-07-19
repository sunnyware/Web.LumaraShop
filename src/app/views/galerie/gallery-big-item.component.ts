import { Component, OnInit } from '@angular/core';
import { LumaraGalleryItem } from '../../models/gallery';
import {HttpClient} from '@angular/common/http';
import {ActivatedRoute, Router} from '@angular/router';

@Component({
  selector: 'app-gallery-big-item',
  templateUrl: './gallery-big-item.component.html',
  styles: []
})
export class GalleryBigItemComponent implements OnInit {
  private parentRoute: any;
  private currentRoute: any;
  public galleryID = '';
  public filename = '';
  imageInfos: LumaraGalleryItem[];
  currentImageUrl = '';
  currentCaption = '';
  currentIndex = 0;
  maxIndex = 0;

  constructor(private router: Router, private route: ActivatedRoute, private http: HttpClient) { }

  ngOnInit() {
    this.galleryID = this.route.snapshot.url[1].path;
    this.currentRoute = this.route.params.subscribe(params => {
      this.filename = params['term'];
      this.reloadThumbnails();
      this.currentImageUrl = 'http://localhost:8990/images/gallery/' + this.galleryID + '/' + this.filename;
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
        this.imageInfos = data;
        this.maxIndex = this.imageInfos.length-1;
        this.setCurrentIndexFromFilename(this.filename);
        console.log(data);
      });
  }

  setCurrentIndexFromFilename(fname) {
    let index = 0;
    for (let entry of this.imageInfos) {
      if (entry.Filename === this.filename) {
        this.currentIndex = index;
        this.currentCaption = entry.Caption;
        break;
      }
      index++;
    }
  }

  setCurrentImageUrlFromIndex(index) {
    let gallItem = this.imageInfos[index];
    this.currentImageUrl = 'http://localhost:8990/images/gallery/' + this.galleryID + '/' + gallItem.Filename;
    this.currentCaption = gallItem.Caption;
    // console.log("CurrentCaption: "+this.currentCaption);
  }

  prevImage() {
    if (this.imageInfos === undefined)
      return;
    if (this.currentIndex > 0) {
      this.currentIndex--;
    }
    this.setCurrentImageUrlFromIndex(this.currentIndex);
  }

  nextImage() {
    if (this.imageInfos === undefined)
      return;
    if (this.currentIndex < this.maxIndex) {
      this.currentIndex++;
    }
    this.setCurrentImageUrlFromIndex(this.currentIndex);
  }
}
