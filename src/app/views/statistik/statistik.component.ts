import { Component, OnInit } from '@angular/core';
import {LumaraService} from '../../service/lumara_service';
import { LumaraServiceCommands } from '../../service/lumara_service_commands';
import { StatistikJahresspiegel, StatistikJahresstatistik, MyChartItem, GastgeberStatistikItem } from '../../models/statistik';
import {Router} from '@angular/router';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-statistik',
  templateUrl: './statistik.component.html',
  styles: []
})
export class StatistikComponent implements OnInit {
  gastgeberStatistikItems: GastgeberStatistikItem[] = undefined;
  showEmptyGastgeberList = false;
  chartDataJahresspiegel: StatistikJahresspiegel = undefined;
  chartDataJahresstatistik: StatistikJahresstatistik = undefined;

  constructor(private lumaraService: LumaraService, private router: Router) {
    lumaraService.setHeadline('Statistik');
  }

  ngOnInit() {
    this.reloadGastgeberStatistik();
    this.reloadJahresspiegel();
    this.reloadJahresstatistik();
  }

  reloadGastgeberStatistik() {
    // Ewertowski IDPersonalakte = 7951858
    this.lumaraService
      .doCommand(
        LumaraServiceCommands.GetGastgeberStatistik(
          0,
          0,
          0,
          new Date('2017-06-01'),
          new Date('2018-05-31'),
          3,
          1200,
          1,
          false
        )
      )
      .subscribe(data => {
        if (data.ReturnCode === 200) {
          // console.log('Ich bekam vom Server folgende Daten: ');
          // console.log(data.ReturnMessage + '\r\n' + data.ReturnValue);
          // console.log(data.ReturnValue);
          this.gastgeberStatistikItems = JSON.parse(data.ReturnValue); // JSON.parse(data.ReturnValue);
          if (this.gastgeberStatistikItems && this.gastgeberStatistikItems.length > 0) {
            this.showEmptyGastgeberList = false;
          } else {
            this.showEmptyGastgeberList = true;
          }
          // this.gastgeberStatistik.GastgeberList = JSON.parse(this.gastgeberStatistik.GastgeberList.toString());
          // console.log(this.gastgeberStatistik);
        } else {
          console.log(data.ReturnMessage + '\r\n' + data.ReturnValue);
          // this.router.navigate(['/login']);
          notify(data.ReturnMessage);
        }
      });
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
