import { Component, OnInit } from '@angular/core';
import { StatistikJahresspiegel } from '../../models/statistik';
import { LumaraService } from '../../service/lumara_service';
import {Router} from '@angular/router';
import { LumaraServiceCommands } from '../../service/lumara_service_commands';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-jahresspiegel',
  templateUrl: './jahresspiegel.component.html',
  styleUrls: []
})
export class JahresspiegelComponent implements OnInit {
  chartDataJahresspiegel: StatistikJahresspiegel = undefined;

  constructor(private lumaraService: LumaraService, private router: Router) { }

  ngOnInit() {
    this.reloadJahresspiegel();
  }

  reloadJahresspiegel() {
    this.lumaraService.doCommand(LumaraServiceCommands.GetJahresspiegel(0, false, 'LFB')).subscribe(
      data => {
        if (data.ReturnCode === 200) {
          // console.log('Ich bekam vom Server folgende Daten: ');
          // console.log(data.ReturnValue);
          this.chartDataJahresspiegel = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue);
          this.chartDataJahresspiegel.Statistik = JSON.parse(this.chartDataJahresspiegel.Statistik.toString());
          // console.log(this.chartDataJahresspiegel);
        } else if (data.ReturnCode >= 400) {
          // this.router.navigate(['/login']);
          notify(data.ReturnMessage);
        }
      }
    );
  }
}
