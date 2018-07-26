import { Component, OnInit } from '@angular/core';
import { LumaraService } from '../../service/lumara_service';
import { Router } from '@angular/router';
import { HttpClient } from '@angular/common/http';
import { LumaraServiceCommands } from '../../service/lumara_service_commands';
import { FachberaterListItem } from '../../models/fachberater';

@Component({
  selector: 'app-kontakte-fachberater',
  templateUrl: './kontakte-fachberater.component.html',
  styles: []
})
export class KontakteFachberaterComponent implements OnInit {
  suchwort = '';
  fachberaterList: FachberaterListItem[] = undefined;

  constructor(private lumaraService: LumaraService, private router: Router, private http: HttpClient) { }

  ngOnInit() {
  }

  setSuchwort() {
    this.reloadFachberater(this.suchwort, false, false);
  }
  getBZLList() {
    this.reloadFachberater('', true, false);
  }
  getGPLList() {
    this.reloadFachberater('', false, true);
  }

  reloadFachberater(stichwort: string, getBZLList: boolean, getGPLList: boolean) {
    this.lumaraService.doCommand(LumaraServiceCommands.GetFachberaterList(stichwort,
      getBZLList, getGPLList)).subscribe(
      data => {
        if (data.ReturnCode === 200) {
          // console.log('Ich bekam vom Server folgende Daten: ');
          // console.log(data.ReturnValue);
          this.fachberaterList = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue);
        } else if (data.ReturnCode >= 400) {
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
