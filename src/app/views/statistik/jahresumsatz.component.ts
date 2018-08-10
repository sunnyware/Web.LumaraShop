import { Component, OnInit } from '@angular/core';
import { StatistikJahresstatistik } from '../../models/statistik';
import {Router} from '@angular/router';
import notify from 'devextreme/ui/notify';
import { LumaraService } from '../../service/lumara_service';
import { LumaraServiceCommands } from '../../service/lumara_service_commands';

@Component({
  selector: 'app-jahresumsatz',
  templateUrl: './jahresumsatz.component.html',
  styleUrls: []
})
export class JahresumsatzComponent implements OnInit {
  chartDataJahresstatistik: StatistikJahresstatistik = undefined;

  constructor(private lumaraService: LumaraService, private router: Router) { }

  ngOnInit() {
    this.reloadJahresstatistik();
  }

  reloadJahresstatistik() {
    this.lumaraService.doCommand(LumaraServiceCommands.GetJahresstatistik(0, 2018, true)).subscribe(
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
