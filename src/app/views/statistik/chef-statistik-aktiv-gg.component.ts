import { Component, OnInit } from '@angular/core';
import { LumaraService } from '../../service/lumara_service';
import { Router } from '@angular/router';
import { LumaraServiceCommands } from '../../service/lumara_service_commands';
import { GastgeberStatistikItem } from '../../models/statistik';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-chef-statistik-aktiv-gg',
  templateUrl: './chef-statistik-aktiv-gg.component.html',
  styles: []
})
export class ChefStatistikAktivGGComponent implements OnInit {
  gastgeberStatistikItems: GastgeberStatistikItem[] = undefined;

  constructor(private lumaraService: LumaraService, private router: Router) { }

  ngOnInit() {
    this.reloadGastgeberStatistik();
  }

  reloadGastgeberStatistik() {
    this.lumaraService.doCommand(LumaraServiceCommands.GetGastgeberStatistik(0, 0, 0, new Date('2017-06-01'),
    new Date('2018-05-31'), 3, 1200)).subscribe(
      data => {
        if (data.ReturnCode === 200) {
           // console.log('Ich bekam vom Server folgende Daten: ');
           // console.log(data.ReturnMessage + '\r\n' + data.ReturnValue);
            console.log(data.ReturnValue);
           this.gastgeberStatistikItems = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue);
          // this.gastgeberStatistik.GastgeberList = JSON.parse(this.gastgeberStatistik.GastgeberList.toString());
          // console.log(this.gastgeberStatistik);
        } else {
          console.log(data.ReturnMessage + '\r\n' + data.ReturnValue);
          // this.router.navigate(['/login']);
          notify(data.ReturnMessage);
        }
      }
    );
  }
}
