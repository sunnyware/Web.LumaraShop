import { Component, OnInit } from '@angular/core';
import {LumaraService} from '../../service/lumara_service';
import { LumaraServiceCommands } from '../../service/lumara_service_commands';
import { StatistikJahresspiegel, StatistikJahresstatistik, MyChartItem } from '../../models/statistik';
import {Router} from '@angular/router';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-statistik',
  templateUrl: './statistik.component.html',
  styles: []
})
export class StatistikComponent implements OnInit {
  chartDataJahresspiegel: StatistikJahresspiegel = undefined;
  chartDataJahresstatistik: StatistikJahresstatistik = undefined;

  constructor(private lumaraService: LumaraService, private router: Router) {
    lumaraService.setHeadline('Statistik');
  }

  ngOnInit() {
    this.reloadJahresspiegel();
    this.reloadJahresstatistik();
  }

  reloadJahresspiegel() {
    this.lumaraService.doCommand(LumaraServiceCommands.GetJahresspiegel(0, false)).subscribe(
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

  reloadJahresstatistik() {
    this.lumaraService.doCommand(LumaraServiceCommands.GetJahresstatistik(0, 2018, false)).subscribe(
      data => {
        if (data.ReturnCode === 200) {
          // console.log('Ich bekam vom Server folgende Daten: ');
          // console.log(data.ReturnValue);
          this.chartDataJahresstatistik = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue);
          this.chartDataJahresstatistik.Statistik = JSON.parse(this.chartDataJahresstatistik.Statistik.toString());
          // console.log(this.chartDataJahresspiegel);
        } else if (data.ReturnCode >= 400) {
          // this.router.navigate(['/login']);
          notify(data.ReturnMessage);
        }
      }
    );
  }
}
