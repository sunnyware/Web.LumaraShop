import {Component, OnInit} from '@angular/core';
import {Gastgeber} from '../../models/gastgeber';
import {LumaraServiceCommands} from '../../service/lumara_service_commands';
import {LumaraService} from '../../service/lumara_service';
import {Router} from '@angular/router';
import {forEach} from '@angular/router/src/utils/collection';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-kontakte-gastgeber',
  templateUrl: './kontakte-gastgeber.component.html',
  styles: []
})
export class KontakteGastgeberComponent implements OnInit {
  gastgeberList: Gastgeber[] = undefined;
  gastgeberListMeta: any;
  pageNr = 0;
  pageNumbers: number[];
  itemsPerPage = 20;
  popupGastgeberVisible = false;
  popupDeleteGastgeberVisible = false;
  currentGastgeber: Gastgeber = undefined;

  constructor(private lumaraService: LumaraService, private router: Router) {

  }

  ngOnInit() {
    this.reloadGastgeber();
  }

  reloadGastgeber() {
    this.lumaraService.doCommand(LumaraServiceCommands.GetGastgeberlist(this.pageNr, this.itemsPerPage)).subscribe(
      data => {
        if (data.ReturnCode === 200) {
          // console.log('Ich bekam vom Server folgende Daten: ');
          // console.log(data.ReturnValue);
          this.gastgeberList = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue);
          this.gastgeberListMeta = JSON.parse(data.ReturnMessage);
          const pc: number = this.gastgeberListMeta.PageCount;
          this.pageNumbers = new Array(pc);
          for (let i = 1; i < pc + 1; i++) {
            this.pageNumbers[i - 1] = i;
          }
        } else if (data.ReturnCode >= 400) {
          this.router.navigate(['/login']);
        }
      }
    );
  }

  gotoPage(pageNumber: number) {
    this.pageNr = pageNumber;
    this.reloadGastgeber();
  }

  public getPageNrActiveClassName(pageNumber: number) {
    if (pageNumber === this.pageNr) {
      return 'active';
    }
    return '';
  }

  showPopupGastgeber(idObjGastgeber: string) {
    console.log('idObjGastgeber: ' + idObjGastgeber);
    if (idObjGastgeber === '') {
      // es soll eine neue Gastgeberin angelegt werden
      this.currentGastgeber = new Gastgeber();
    } else {
      // es soll eine Gastgeberin bearbeitet werden
      for (const gg of this.gastgeberList) {
        if (gg.IDObj === idObjGastgeber) {
          this.currentGastgeber = gg;
        }
      }
    }
    if (!this.currentGastgeber) {
      alert('Bitte wählen Sie einen gültigen Gastgeber aus');
      return;
    }
    this.popupGastgeberVisible = true;
  }

  saveGastgeber() {
    this.popupGastgeberVisible = false;
    // Gastgeber speichern
    this.lumaraService.doCommand(LumaraServiceCommands.UpdateGastgeber(this.currentGastgeber)).subscribe(
      data => {
        if (data.ReturnCode === 200) {
          // this.gastgeberList = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue);
          notify('Gastgeber wurde erfolgreich gespeichert');
          this.reloadGastgeber();
        } else if (data.ReturnCode >= 400) {
          notify(data.ReturnMessage);
        }
      }
    );
  }

  showPopupDeleteGastgeber(idObjGastgeber: string) {
    for (const gg of this.gastgeberList) {
      if (gg.IDObj === idObjGastgeber) {
        this.currentGastgeber = gg;
      }
    }
    if (!this.currentGastgeber) {
      alert('Bitte wählen Sie einen gültigen Gastgeber aus');
      return;
    }
    this.popupDeleteGastgeberVisible = true;
  }

  deleteGastgeber() {
    this.popupDeleteGastgeberVisible = false;
    this.currentGastgeber.FlagDeleted = true;
    this.lumaraService.doCommand(LumaraServiceCommands.UpdateGastgeber(this.currentGastgeber)).subscribe(
      data => {
        if (data.ReturnCode === 200) {
          // this.gastgeberList = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue);
          this.reloadGastgeber();
          notify('Gastgeber wurde erfolgreich gespeichert');
        } else if (data.ReturnCode >= 400) {
          notify(data.ReturnMessage);
        }
      }
    );
  }
}
