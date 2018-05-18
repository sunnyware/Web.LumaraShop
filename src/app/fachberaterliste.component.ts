import {Component, OnInit} from '@angular/core';
import {LumaraService} from './service/lumara_service';
import {LumaraServiceCommands} from './service/lumara_service_commands';
import {MitarbeiterListItem} from './models/mitarbeiterlist_item';
import {Router} from '@angular/router';

@Component({
  selector: 'app-fachberaterliste',
  templateUrl: './fachberaterliste.component.html',
  styles: []
})
export class FachberaterlisteComponent implements OnInit {
  mitarbeiterlist: MitarbeiterListItem[];
  responsex = '123';

  constructor(private lumaraService: LumaraService, private router: Router) {
    lumaraService.setHeadline('meine Fachberater');
  }

  ngOnInit() {
    this.reloadMitarbeiterList();
  }

  reloadMitarbeiterList() {

    // this.lumaraService.doRequestGet('http://service.lumara.de/tracking.html?pushid=12345&pnr=123455555')
    //  .subscribe(data => this.responsex = data);
    this.lumaraService.doCommand(LumaraServiceCommands.GetMitarbeiterList()).subscribe(
      data => {
        this.responsex = data;
        if (data.ReturnCode === 200) {
          console.log('Ich bekam vom Server folgende Daten: ' + data.ReturnValue);
          // this.mytile.instance.beginUpdate();
          this.mitarbeiterlist = JSON.parse(data.ReturnValue);
          // this.mytile.instance.endUpdate();
        } else if (data.ReturnCode === 401) {
          this.router.navigate(['/login']);
        }
      }
    );
  }

}
