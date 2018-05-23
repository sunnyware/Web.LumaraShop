import {Component, OnInit} from '@angular/core';
import {LumaraService} from './service/lumara_service';
import {TestData} from './models/_testdata';
import {LumaraServiceCommands} from './service/lumara_service_commands';
import {Router} from '@angular/router';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styles: []
})

export class NewsComponent implements OnInit {
  blogPosts = TestData.blogPosts;
  neuheiten = TestData.neuheiten;
  pageNr = 0;
  itemsPerPage = 10;

  constructor(private lumaraService: LumaraService, private router: Router) {
    lumaraService.setHeadline('Lumara-News');
  }

  ngOnInit() {
    this.reloadPosts();
  }

  reloadPosts() {

    // this.lumaraService.doRequestGet('http://service.lumara.de/tracking.html?pushid=12345&pnr=123455555')
    //  .subscribe(data => this.responsex = data);
    this.lumaraService.doCommand(LumaraServiceCommands.GetBlogPosts(1, 1, this.pageNr, this.itemsPerPage)).subscribe(
      data => {
        if (data.ReturnCode === 200) {
          // console.log('Ich bekam vom Server folgende Daten: ');
          // console.log(data.ReturnValue);
          this.blogPosts = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue);
        } else if (data.ReturnCode >= 400) {
          this.router.navigate(['/login']);
        }
      }
    );
  }

  GetFileStoreFileUrl(fileID: string) {
    return this.lumaraService.url_zentrale_min + '/getfilestorefile?modulename=blogging&fileid=' + fileID;
  }
  GetIconUrl(extension: string) {
    return this.lumaraService.url_zentrale_min + '/icon?imagekey=fileimage:' + extension + '&imagesize=24';
  }
}
