import {Component, OnInit} from '@angular/core';
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
  private articleID = 0;
  blogPost: BlogPost = undefined;

  constructor(private lumaraService: LumaraService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentRoute = this.route.params.subscribe(params => {
      this.articleID = +params['id'];
      this.reloadPost();
    });
  }

  reloadPost() {
    if (this.articleID === 0) {
      return;
    }
    // this.lumaraService.doRequestGet('http://service.lumara.de/tracking.html?pushid=12345&pnr=123455555')
    //  .subscribe(data => this.responsex = data);
    this.lumaraService.doCommand(LumaraServiceCommands.GetBlogPost(this.articleID)).subscribe(
      data => {
        if (data.ReturnCode === 200) {
          // console.log('Ich bekam vom Server folgende Daten: ');
          // console.log(data.ReturnValue);
          this.blogPost = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue);
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
