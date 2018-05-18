import { Component, OnInit } from '@angular/core';
import {LumaraService} from "./service/lumara_service";

@Component({
  selector: 'app-blog-post',
  templateUrl: './blog-post.component.html',
  styles: []
})
export class BlogPostComponent implements OnInit {

  constructor(private lumaraService: LumaraService) {
    lumaraService.setHeadline('Lumara-News');
  }

  ngOnInit() {
  }

}
