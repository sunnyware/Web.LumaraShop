import {Component, OnInit} from '@angular/core';
import {LumaraService} from '../../service/lumara_service';
import {TestData} from '../../models/_testdata';
import {LumaraServiceCommands} from '../../service/lumara_service_commands';
import {Router} from '@angular/router';
import {BlogPostListItem} from '../../models/blogpost';
import {ArtikelNichtLieferbarItem} from '../../models/artikel';
import { FlyerInfo } from 'src/app/models/flyer';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-news',
  templateUrl: './news.component.html',
  styles: []
})

export class NewsComponent implements OnInit {
  blogPosts: BlogPostListItem[] = undefined;
  flyerinfos: FlyerInfo[];
  artikelNichtLieferbarArray: ArtikelNichtLieferbarItem[] = undefined;
  neuheiten = TestData.neuheiten;
  pageNr = 0;
  itemsPerPage = 80;

  constructor(private lumaraService: LumaraService, private router: Router, private http: HttpClient) {
    lumaraService.setHeadline('Lumara-News');
  }

  ngOnInit() {
    this.reloadPosts();
    this.reloadArtikelNichtLieferbar();
    this.reloadFlyerInfos();
  }

  reloadArtikelNichtLieferbar() {
    this.lumaraService.doCommand(LumaraServiceCommands.GetArtikelNichtLieferbar()).subscribe(
      data => {
        if (data.ReturnCode === 200) {
          this.artikelNichtLieferbarArray = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue);
        }
      }
    );
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

  GetFileStoreFileUrl(fileID: string, filename: string) {
    filename = filename.replace(/ /g, '_').replace(/ä/g, 'ae').replace(/ü/g, 'ue').replace(/ö/g, 'oe');
    return this.lumaraService.url_zentrale_min + '/getfilestorefile?modulename=blogging&filename=' + filename + '&fileid=' + fileID;
  }
  GetIconUrl(extension: string) {
    return this.lumaraService.url_zentrale_min + '/icon?imagekey=fileimage:' + extension + '&imagesize=24';
  }

  reloadFlyerInfos() {
    const url = 'https://portal.lumara.de/flyer/flyer.json';
    this.http.get<FlyerInfo[]>(url).subscribe(data => {
      this.flyerinfos = data;
    });
  }

  getThumbnailUrl(myurl: string, pageno: number) {
    if (pageno === 1) {
      return myurl.replace('.pdf', '_01.jpg');
    } else if (pageno === 2) {
      return myurl.replace('.pdf', '_02.jpg');
    }
  }
}
