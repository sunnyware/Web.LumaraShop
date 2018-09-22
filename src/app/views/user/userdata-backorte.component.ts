import { Component, OnInit } from '@angular/core';
import { BackterminOrt } from '../../models/backtermine';
import { LumaraService } from '../../service/lumara_service';
import { Router } from '@angular/router';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { LumaraServiceCommands } from '../../service/lumara_service_commands';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-userdata-backorte',
  templateUrl: './userdata-backorte.component.html',
  styleUrls: []
})
export class UserdataBackorteComponent implements OnInit {
  orte: BackterminOrt[] = undefined;
  popupOrtVisible = false;
  currentOrt: BackterminOrt = undefined;
  ggModalDialog: any;

  constructor(private lumaraService: LumaraService, private router: Router, private modalService: NgbModal) { }

  ngOnInit() {
    this.reloadOrte();
  }

  reloadOrte() {
    this.lumaraService
      .doCommand(
        LumaraServiceCommands.GetBackterminOrte())
      .subscribe(data => {
        if (data.ReturnCode === 200) {
          // console.log('Ich bekam vom Server folgende Daten: ');
          // console.log(data.ReturnValue);
          this.orte = JSON.parse(data.ReturnValue); // JSON.parse(data.ReturnValue);
          // notify(data.ReturnMessage);
        } else if (data.ReturnCode >= 400) {
          this.router.navigate(['/login']);
        }
      });
  }

  showPopupOrt(ortID: number, content) {
    if (ortID === 0) {
      // es soll eine neue Gastgeberin angelegt werden
      this.currentOrt = new BackterminOrt();
    } else {
      // es soll eine Gastgeberin bearbeitet werden
      for (const ort of this.orte) {
        if (ort.ID === ortID) {
          this.currentOrt = ort;
        }
      }
    }
    if (!this.currentOrt) {
      alert('Bitte wählen Sie einen gültigen Ort aus');
      return;
    }
    this.ggModalDialog = this.modalService.open(content, { size: 'lg' });
    // this.popupGastgeberVisible = true;
  }

  deleteOrt() {

  }
  saveOrt() {
   // this.popupGastgeberVisible = false;
   this.ggModalDialog.close();
   // Gastgeber speichern
   this.lumaraService
     .doCommand(LumaraServiceCommands.UpdateBackterminOrt(this.currentOrt))
     .subscribe(data => {
       if (data.ReturnCode === 200) {
         // this.gastgeberList = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue);
         notify('Veranstaltungsort wurde erfolgreich gespeichert');
         this.reloadOrte();
       } else if (data.ReturnCode >= 400) {
         notify(data.ReturnMessage);
       }
     });
  }
}
