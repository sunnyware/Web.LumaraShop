import { GastgeberStatistikItem, GastgeberUmsatzItem } from './../../models/statistik';
import { Component, OnInit } from '@angular/core';
import { LumaraService } from '../../service/lumara_service';
import { Router } from '@angular/router';
import { LumaraServiceCommands } from '../../service/lumara_service_commands';
import notify from 'devextreme/ui/notify';
import { NgbModal, ModalDismissReasons } from '@ng-bootstrap/ng-bootstrap';
import { Fachberater } from '../../models/fachberater';

@Component({
  selector: 'app-chef-statistik-aktiv-gg',
  templateUrl: './chef-statistik-aktiv-gg.component.html',
  styles: []
})
export class ChefStatistikAktivGGComponent implements OnInit {
  gastgeberStatistikItems: GastgeberStatistikItem[] = undefined;
  currentGastgeber: GastgeberStatistikItem = undefined;
  currentFachberater: Fachberater = undefined;
  gastgeberUmsatzItems: GastgeberUmsatzItem[] = undefined;
  gastgeberUmsaetzeGesamt = 0;
  ggModalDialog: any;
  internalNote = '';
  // lastOnlyNotUmsatzManualAccepted = 0;
  onlyNotUmsatzManualAccepted = 0;

  constructor(
    private lumaraService: LumaraService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.reloadGastgeberStatistik();
  }

  setFilter(filter: number) {
    if (this.onlyNotUmsatzManualAccepted !== filter) {
      this.onlyNotUmsatzManualAccepted = filter;
      this.reloadGastgeberStatistik();
    }
  }

  reloadGastgeberStatistik() {
    this.lumaraService
      .doCommand(
        LumaraServiceCommands.GetGastgeberStatistik(
          0,
          0,
          0,
          new Date('2018-06-01'),
          new Date('2019-05-31'),
          3,
          1200,
          this.onlyNotUmsatzManualAccepted,
          false
        )
      )
      .subscribe(data => {
        if (data.ReturnCode === 200) {
          // console.log('Ich bekam vom Server folgende Daten: ');
          // console.log(data.ReturnMessage + '\r\n' + data.ReturnValue);
          // console.log(data.ReturnValue);
          this.gastgeberStatistikItems = JSON.parse(data.ReturnValue); // JSON.parse(data.ReturnValue);
          // this.gastgeberStatistik.GastgeberList = JSON.parse(this.gastgeberStatistik.GastgeberList.toString());
          // console.log(this.gastgeberStatistik);
        } else {
          console.log('Gastgeberumsatz ist fehlgeschlagen!');
          console.log(data);
          // console.log(data.ReturnMessage + '\r\n' + data.ReturnValue);
          // this.router.navigate(['/login']);
          notify(data.ReturnMessage);
        }
      });
  }
  reloadGastgeberUmsaetze() {
    if (this.currentGastgeber === undefined) {
      notify('Es wurde kein gültiger Gastgeber geladen!');
      return;
    }

    this.lumaraService
      .doCommand(
        LumaraServiceCommands.GetGastgeberUmsaetze(this.currentGastgeber.IDObj, new Date('2017-06-01'), new Date('2018-05-31'))
      )
      .subscribe(data => {
        if (data.ReturnCode === 200) {
          // console.log('Ich bekam vom Server folgende Daten: ');
          // console.log(data.ReturnMessage + '\r\n' + data.ReturnValue);
          // console.log(data.ReturnValue);
          this.gastgeberUmsatzItems = JSON.parse(data.ReturnValue); // JSON.parse(data.ReturnValue);
          this.gastgeberUmsaetzeGesamt = 0;
          this.internalNote = '';
          for (const gg of this.gastgeberUmsatzItems) {
            this.gastgeberUmsaetzeGesamt = this.gastgeberUmsaetzeGesamt + gg.Umsatz;
            this.internalNote = gg.InternalNote;
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
  reloadFachberater() {
    if (this.currentGastgeber === undefined) {
      notify('Es wurde kein gültiger Gastgeber geladen!');
      return;
    }

    this.lumaraService
      .doCommand(
        LumaraServiceCommands.GetFachberater(this.currentGastgeber.LFBDOID))
      .subscribe(data => {
        if (data.ReturnCode === 200) {
          // console.log(data.ReturnValue);
          this.currentFachberater = JSON.parse(data.ReturnValue); // JSON.parse(data.ReturnValue);
        } else {
          console.log(data.ReturnMessage + '\r\n' + data.ReturnValue);
          // this.router.navigate(['/login']);
          notify(data.ReturnMessage);
        }
      });
  }

  getClass(item: GastgeberStatistikItem) {
    if (item.UmsatzManualAccepted === 1) {
      return 'text-success font-weight-bold';
    } else if (item.UmsatzManualAccepted === 0) {
      return 'text-light';
    } else if (item.UmsatzManualAccepted === -1) {
      return 'text-danger font-weight-bold';
    }
    return 'text-light';
  }

  showPopupGastgeberUmsaetze(gg: GastgeberStatistikItem, content) {
    this.currentGastgeber = gg;
    this.reloadGastgeberUmsaetze();
    this.reloadFachberater();
    this.ggModalDialog = this.modalService.open(content, { size: 'lg' });
  }

  acceptGastgeberUmsatzManual(accept: number) {
    this.ggModalDialog.close();
    this.lumaraService
      .doCommand(
        LumaraServiceCommands.AcceptGastgeberUmsatzManual(
          this.currentGastgeber.IDObj,
          0,
          accept,
          this.internalNote
        )
      )
      .subscribe(data => {
        if (data.ReturnCode === 200) {
          // this.gastgeberList = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue);
          console.log(data);
          notify('Daten wurden gespeichert.');
          this.currentGastgeber.UmsatzManualAccepted = accept;
        } else {
          notify(data.ReturnMessage);
        }
      });
  }
}
