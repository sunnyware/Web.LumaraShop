import { forEach } from '@angular/router/src/utils/collection';
import { race } from 'rxjs/internal/operators';
import { Component, OnInit } from '@angular/core';
import {
  Backtermin,
  BackterminItem,
  BackterminOrt
} from '../../models/backtermine';
import { LumaraService } from '../../service/lumara_service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LumaraServiceCommands } from '../../service/lumara_service_commands';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-userdata-backtermine',
  templateUrl: './userdata-backtermine.component.html',
  styleUrls: []
})
export class UserdataBacktermineComponent implements OnInit {
  backtermine: BackterminItem[] = undefined;
  orte: BackterminOrt[] = undefined;
  popupOrtVisible = false;
  currentBacktermin: Backtermin = undefined;
  ggModalDialog: any;
  innerWidth: any;
  labelLocation = 'left';
  orteLoaded = false;

  constructor(
    private lumaraService: LumaraService,
    private router: Router,
    private modalService: NgbModal
  ) {}

  ngOnInit() {
    this.reloadBacktermine();
    this.innerWidth = window.innerWidth;
    this.labelLocation = this.innerWidth > 500 ? 'left' : 'top';
  }

  reloadBacktermine() {
    this.lumaraService
      .doCommand(LumaraServiceCommands.GetBacktermine())
      .subscribe(data => {
        if (data.ReturnCode === 200) {
          // console.log('Ich bekam vom Server folgende Daten: ');
          // console.log(data.ReturnValue);
          this.backtermine = JSON.parse(data.ReturnValue); // JSON.parse(data.ReturnValue);
          // notify(data.ReturnMessage);
        } else if (data.ReturnCode >= 400) {
          this.router.navigate(['/login']);
        }
      });
  }

  getAnzahlTeilnehmerText(anzahl: number) {
    if (anzahl === 0) {
      return 'noch keine Anmeldungen';
    }
    return anzahl + 'Anmeldungen';
  }
  getAnzahlTeilnehmerClass(anzahl: number) {
    if (anzahl === 0) {
      return 'text-mute';
    }
    return anzahl + 'text-success';
  }

  loadBacktermin(backterminID: number, showPopup: boolean, content) {
    this.lumaraService
      .doCommand(LumaraServiceCommands.GetBacktermin(backterminID))
      .subscribe(data => {
        if (data.ReturnCode === 200) {
          // console.log('Ich bekam vom Server folgende Daten: ');
          // console.log(data.ReturnValue);
          this.currentBacktermin = JSON.parse(data.ReturnValue); // JSON.parse(data.ReturnValue);
          // jetzt noch das Popup öffnen
          if (showPopup) {
            this.showPopupBacktermin(backterminID, content);
          }
        } else if (data.ReturnCode >= 400) {
          notify('Fehler beim Laden des Backvortrags: ' + data.ReturnMessage);
          // this.router.navigate(['/login']);
        }
      });
  }

  reloadOrte() {
    this.lumaraService
      .doCommand(LumaraServiceCommands.GetBackterminOrte())
      .subscribe(data => {
        if (data.ReturnCode === 200) {
          // console.log('Ich bekam vom Server folgende Daten: ');
          // console.log(data.ReturnValue);
          this.orte = JSON.parse(data.ReturnValue); // JSON.parse(data.ReturnValue);
          this.orteLoaded = true;
          if (this.orte && this.orte.length > 0) {
            for (let index = 0; index < this.orte.length; index++) {
              const element = this.orte[index];
              element.Caption = element.Ort + ', ' + element.Strasse;
            }
          }
          // notify(data.ReturnMessage);
        } else if (data.ReturnCode >= 400) {
          this.router.navigate(['/login']);
        }
      });
  }

  showPopupBacktermin(backterminID: number, content) {
    if (!this.orteLoaded) {
      this.reloadOrte();
    }
    if (backterminID === 0) {
      // es soll eine neue Gastgeberin angelegt werden
      this.currentBacktermin = new Backtermin();
    } else {
      // es soll eine Gastgeberin bearbeitet werden
      for (const backtermin of this.backtermine) {
        if (backtermin.ID === backterminID) {
          // this.currentBacktermin = backtermin;
        }
      }
    }
    if (!this.currentBacktermin) {
      alert('Bitte wählen Sie einen gültigen Backtermin aus');
      return;
    }
    this.ggModalDialog = this.modalService.open(content, { size: 'lg' });
    // this.popupGastgeberVisible = true;
  }

  createBacktermin() {
    this.lumaraService
      .doCommand(LumaraServiceCommands.CreateBacktermin())
      .subscribe(data => {
        if (data.ReturnCode === 200) {
          this.reloadBacktermine();
        } else if (data.ReturnCode >= 400) {
          this.router.navigate(['/login']);
        }
      });
  }

  deleteBacktermin() {
     // this.popupGastgeberVisible = false;
     this.ggModalDialog.close();
     // Gastgeber speichern
     this.lumaraService
       .doCommand(LumaraServiceCommands.DeleteBacktermin(this.currentBacktermin.ID))
       .subscribe(data => {
         if (data.ReturnCode === 200) {
           // this.gastgeberList = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue);
           notify('Backkurs wurde erfolgreich gelöscht');
           this.reloadBacktermine();
         } else if (data.ReturnCode >= 400) {
           notify(data.ReturnMessage);
         }
       });
  }

  saveBacktermin() {
    // this.popupGastgeberVisible = false;
    this.ggModalDialog.close();
    // Gastgeber speichern
    this.lumaraService
      .doCommand(LumaraServiceCommands.UpdateBacktermin(this.currentBacktermin))
      .subscribe(data => {
        if (data.ReturnCode === 200) {
          // this.gastgeberList = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue);
          notify('Backkurs wurde erfolgreich gespeichert');
          this.reloadBacktermine();
        } else if (data.ReturnCode >= 400) {
          notify(data.ReturnMessage);
        }
      });
  }
}
