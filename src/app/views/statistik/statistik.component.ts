import { Component, OnInit } from '@angular/core';
import {LumaraService} from '../../service/lumara_service';
import { LumaraServiceCommands } from '../../service/lumara_service_commands';
import { StatistikJahresspiegel, StatistikJahresstatistik, MyChartItem } from '../../models/statistik';
import {Router} from '@angular/router';

@Component({
  selector: 'app-statistik',
  templateUrl: './statistik.component.html',
  styles: []
})
export class StatistikComponent implements OnInit {
  chartDataJahresspiegel: StatistikJahresspiegel = undefined;

  constructor(private lumaraService: LumaraService, private router: Router) {
    lumaraService.setHeadline('Statistik');
  }

  ngOnInit() {
    this.reloadJahresspiegel();
  }

  reloadJahresspiegel() {
    this.lumaraService.doCommand(LumaraServiceCommands.GetJahresspiegel(0, true)).subscribe(
      data => {
        if (data.ReturnCode === 200) {
          // console.log('Ich bekam vom Server folgende Daten: ');
          // console.log(data.ReturnValue);
          this.chartDataJahresspiegel = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue);
          this.chartDataJahresspiegel.Statistik = JSON.parse(this.chartDataJahresspiegel.Statistik.toString());
          // console.log(this.chartDataJahresspiegel);
        } else if (data.ReturnCode >= 400) {
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
