import { Component, OnInit } from '@angular/core';
import { Backtermin, BackterminAnmeldungItem, BackterminAnmeldung } from '../../models/backtermine';
import { LumaraService } from '../../service/lumara_service';
import { Router, ActivatedRoute } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LumaraServiceCommands } from '../../service/lumara_service_commands';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-userdata-backtermin-anmeldung',
  templateUrl: './userdata-backtermin-anmeldung.component.html',
  styleUrls: []
})
export class UserdataBackterminAnmeldungComponent implements OnInit {
  currentBackterminID: 0;
  currentBacktermin: Backtermin = undefined;
  backterminAnmeldungen: BackterminAnmeldungItem[] = undefined;
  currentBackterminAnmeldung: BackterminAnmeldung = undefined;
  ggModalDialog: any;
  innerWidth: any;
  labelLocation = 'left';

  constructor(
    private lumaraService: LumaraService,
    private router: Router,
    private modalService: NgbModal, private route: ActivatedRoute) {
  }

  ngOnInit() {
    // console.log('routes');
    // console.log(this.route.snapshot);
    this.currentBackterminID = this.route.snapshot.queryParams.backterminid;
    this.loadBacktermin();

    this.reloadBackterminAnmeldungen();
    this.innerWidth = window.innerWidth;
    this.labelLocation = this.innerWidth > 500 ? 'left' : 'top';
  }

  loadBacktermin() {
    this.lumaraService
      .doCommand(LumaraServiceCommands.GetBacktermin(this.currentBackterminID))
      .subscribe(data => {
        if (data.ReturnCode === 200) {
          // console.log('Ich bekam vom Server folgende Daten: ');
          // console.log(data.ReturnValue);
          this.currentBacktermin = JSON.parse(data.ReturnValue); // JSON.parse(data.ReturnValue);
        } else if (data.ReturnCode >= 400) {
          notify('Fehler beim Laden des Backvortrags: ' + data.ReturnMessage);
          // this.router.navigate(['/login']);
        }
      });
  }

  reloadBackterminAnmeldungen() {
    if (this.currentBackterminID <= 0) {
      return;
    }
    this.lumaraService
      .doCommand(LumaraServiceCommands.GetBackterminAnmeldungen(this.currentBackterminID))
      .subscribe(data => {
        if (data.ReturnCode === 200) {
          // console.log('Ich bekam vom Server folgende Daten: ');
          // console.log(data.ReturnValue);
          this.backterminAnmeldungen = JSON.parse(data.ReturnValue); // JSON.parse(data.ReturnValue);
          // notify(data.ReturnMessage);
        } else if (data.ReturnCode >= 400) {
          this.router.navigate(['/login']);
        }
      });
  }

  loadBackterminAnmeldung(backterminAnmeldungID: number, showPopup: boolean, content) {
    this.lumaraService
      .doCommand(LumaraServiceCommands.GetBackterminAnmeldung(backterminAnmeldungID))
      .subscribe(data => {
        if (data.ReturnCode === 200) {
          // console.log('Ich bekam vom Server folgende Daten: ');
          // console.log(data.ReturnValue);
          this.currentBackterminAnmeldung = JSON.parse(data.ReturnValue); // JSON.parse(data.ReturnValue);
          // jetzt noch das Popup öffnen
          if (showPopup) {
            this.showPopupBackterminAnmeldung(backterminAnmeldungID, content);
          }
        } else if (data.ReturnCode >= 400) {
          notify('Fehler beim Laden des Backvortrags: ' + data.ReturnMessage);
          // this.router.navigate(['/login']);
        }
      });
  }
  showPopupBackterminAnmeldung(backterminAnmeldungID: number, content) {
    if (!this.currentBacktermin) {
      alert('Bitte wählen Sie einen gültigen Backtermin aus');
      return;
    }
    if (backterminAnmeldungID === 0) {
      // es soll eine neue Backtermin-Anmeldung angelegt werden
      this.currentBackterminAnmeldung = new BackterminAnmeldung();
      this.currentBackterminAnmeldung.BackterminID = this.currentBacktermin.ID;
    } else {
      for (const backterminAnmeldung of this.backterminAnmeldungen) {
        if (backterminAnmeldung.ID === backterminAnmeldungID) {
          // this.currentBacktermin = backtermin;
        }
      }
    }

    this.ggModalDialog = this.modalService.open(content, { size: 'lg' });
    // this.popupGastgeberVisible = true;
  }

  /*
  createBackterminAnmeldung(backterminAnmeldungID: number, content) {
    if (this.currentBackterminID === 0) {
      this.currentBackterminAnmeldung
      return;
    }
    this.lumaraService
      .doCommand(LumaraServiceCommands.CreateBackterminAnmeldung(this.currentBackterminID))
      .subscribe(data => {
        if (data.ReturnCode === 200) {
          this.reloadBackterminAnmeldungen();
        } else if (data.ReturnCode >= 400) {
          this.router.navigate(['/login']);
        }
      });
  }
*/
  deleteBackterminAnmeldung() {
    this.currentBackterminAnmeldung.IsStorniert = !this.currentBackterminAnmeldung.IsStorniert;
    this.saveBackterminAnmeldung();
  }
  saveBackterminAnmeldung() {
    // this.popupGastgeberVisible = false;
    this.ggModalDialog.close();
    // Gastgeber speichern
    this.lumaraService
      .doCommand(LumaraServiceCommands.UpdateBackterminAnmeldung(this.currentBackterminAnmeldung))
      .subscribe(data => {
        if (data.ReturnCode === 200) {
          // this.gastgeberList = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue);
          notify('Backkurs-Anmeldung wurde erfolgreich gespeichert', 'success');
          this.reloadBackterminAnmeldungen();
        } else if (data.ReturnCode >= 400) {
          notify(data.ReturnMessage, 'error', 3000);
        }
      });
  }
}
