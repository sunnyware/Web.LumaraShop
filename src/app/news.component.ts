import {Component, OnInit} from '@angular/core';
import {BlogPost, BlogPostGroup} from './models/blogpost';
import {LumaraService} from "./service/lumara_service";
import {TestData} from "./models/_testdata";

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styles: []
})

export class NewsComponent implements OnInit {
  blogPosts = TestData.blogPosts;
  neuheiten = TestData.neuheiten;

  constructor(private lumaraService: LumaraService) {
    lumaraService.setHeadline('Lumara-News');
  }

  ngOnInit() {
  }

}
