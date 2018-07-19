import {Component, OnInit} from '@angular/core';
import {LumaraService} from '../../service/lumara_service';
import {LumaraServiceCommands} from '../../service/lumara_service_commands';
import {Auftrag} from '../../models/auftraege';
import {Router} from '@angular/router';

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {
  auftraege: Auftrag[] = undefined;

  constructor(private lumaraService: LumaraService, private router: Router) {
    lumaraService.setHeadline('Aufträge');
  }

  ngOnInit() {
    this.reloadAuftraege();
  }

  reloadAuftraege() {
    this.lumaraService.doCommand(LumaraServiceCommands.GetAuftraege(0)).subscribe(
      data => {
        if (data.ReturnCode === 200) {
          this.auftraege = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue);
          // console.log(this.auftraege);
        } else if (data.ReturnCode >= 400) {
          this.router.navigate(['/login']);
        }
      }
    );
  }

  getAuftragImageSource(auftrag: Auftrag) {
    if (auftrag.MandantID === 1) {
      return '/assets/icons/lummi_40.png';
    } else if (auftrag.MandantID === 2) {
      return '/assets/icons/elco_40.png';
    } else {
      return '/assets/icons/dummy.jpg';
    }
  }

  getAuftragFileUrl(auftrag: Auftrag) {
    return '#';
  }

}
