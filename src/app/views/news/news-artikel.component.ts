import {Component, OnInit, Input, OnChanges, SimpleChanges} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {LumaraService} from '../../service/lumara_service';
import {LumaraServiceCommands} from '../../service/lumara_service_commands';
import {BlogPost} from '../../models/blogpost';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-news-artikel',
  templateUrl: './news-artikel.component.html',
  styles: []
})
export class NewsArtikelComponent implements OnInit {
  private currentRoute: any;
  @Input() articleID = 0;
  blogPost: BlogPost = undefined;
  lastLoadedArticleID = 0;

  constructor(private lumaraService: LumaraService, private router: Router, private route: ActivatedRoute) {
    console.log('1. Konstruktor!');
  }

  ngOnInit() {
    console.log('2. OnInit!');
    this.currentRoute = this.route.params.subscribe(params => {
      this.articleID = +params['id'];
      this.reloadPost();
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['articleID']) {
        console.log('articleID hat sich von aussen geändert!');
        this.reloadPost();
    }
}

  reloadPost() {
    console.log(this.articleID);
    if (!this.articleID || this.articleID === null || this.articleID === 0 || this.articleID === this.lastLoadedArticleID) {
      return;
    }
    // this.lumaraService.doRequestGet('http://service.lumara.de/tracking.html?pushid=12345&pnr=123455555')
    //  .subscribe(data => this.responsex = data);
    this.lumaraService.doCommand(LumaraServiceCommands.GetBlogPost(this.articleID)).subscribe(
      data => {
        if (data.ReturnCode === 200) {
           console.log('Ich bekam vom Server folgende Daten: ');
           console.log(data.ReturnValue);
          this.blogPost = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue);
          this.lastLoadedArticleID = this.articleID;
        } else if (data.ReturnCode >= 400) {
          this.router.navigate(['/login']);
        } else {
          notify(data.ReturnMessage);
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
}
