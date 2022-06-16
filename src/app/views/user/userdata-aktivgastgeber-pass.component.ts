import { AktivGastgeberUmsatz, AktivgastgeberpassSearchResultItem } from './../../models/gastgeber';
import { AktivGastgeberpass } from 'src/app/models/gastgeber';
import { Component, OnInit } from '@angular/core';
import { LumaraService } from '../../service/lumara_service';
import { Router, ActivatedRoute } from '@angular/router';
import { LumaraServiceCommands } from 'src/app/service/lumara_service_commands';
import notify from 'devextreme/ui/notify';
import moment from 'moment';

@Component({
  selector: 'app-userdata-aktivgastgeber-pass',
  templateUrl: './userdata-aktivgastgeber-pass.component.html',
  styleUrls: []
})

export class UserdataAktivgastgeberPassComponent implements OnInit {
  private currentRoute: any;
  passID = 0;
  pass: AktivGastgeberpass = undefined;
  zeitraumlabel = '';
  message = undefined;
  isreadonly = false;

  constructor(private lumaraService: LumaraService,
    private router: Router, private route: ActivatedRoute) { }

  ngOnInit() {
    this.currentRoute = this.route.params.subscribe(params => {
      this.passID = +params['id'];
      this.reloadPass();
    });
  }

  reloadPass() {
    this.lumaraService
      .doCommand(LumaraServiceCommands.GetAktivGastgeberpass(this.passID))
      .subscribe(data => {
        if (data.ReturnCode === 200) {
          console.log('Ich bekam vom Server folgende Daten: ');
          console.log(data.ReturnValue);
          this.pass = JSON.parse(data.ReturnValue); // JSON.parse(data.ReturnValue);
          // sicherstellen, dass mindestens 3 Umsätze eingegeben werden
          if (!this.pass.Umsaetze || this.pass.Umsaetze.length == 0)
          {
            this.pass.Umsaetze = new Array(0);
            this.createUmsatz();
            this.createUmsatz();
            this.createUmsatz();
          }
          this.zeitraumlabel = '01.06.' + this.pass.Jahr + ' bis 31.05.' + (this.pass.Jahr + 1);
          this.isreadonly = this.pass.Status === -1 || this.pass.Status === 1;
        } else if (data.ReturnCode >= 400) {
          notify('Fehler beim Laden des Aktivgastgeber-Passes: ' + data.ReturnMessage);
          // this.router.navigate(['/login']);
        }
      });
  }

  savePass() {
    // zuerst Plasibilitätsprüfungen durchführen
    this.message = undefined;
    var umsatz = 0;
    var anzahlvortraege = 0;
    const datum1 = new Date(this.pass.Jahr, 6, 1);
    const datum2 = new Date(this.pass.Jahr+1, 5, 31);

    if (this.pass.Gastgebername.length === 0) {
      this.message = 'Pass wurde nicht gespeichert!\r\nBitte geben Sie einen Gastgebernamen ein!';
      return;
    }
    for (let index = 0; index < this.pass.Umsaetze.length; index++) {
      const element = this.pass.Umsaetze[index];
      umsatz += element.Umsatz;
      if (element.Umsatz > 0)
        anzahlvortraege++;

      if (element.Datum < datum1 || element.Datum > datum1) {
        this.message = 'Pass wurde nicht gespeichert!\r\nDie Umsätze müssen innerhalb des Wettbewerb-Zeitraums getätigt werden!';
        return;
      }
    }
    if (this.pass.AddFremdUmsaetze && this.pass.FremdFachberatername.length === 0) {
      this.message = "Pass wird zwar gespeichert, aber er wurde als ungültig markiert - denn: Sie haben keinen Namen der Fremd-Fachberaterin eingegeben!";
      this.pass.IsInvalid = true;
    }
    else if (anzahlvortraege < 3 && !this.pass.AddFremdUmsaetze) {
      this.message = "Pass wird zwar gespeichert, aber er wurde als ungültig markiert - denn: Sie müssen mindestens 3 Vorträge bei dieser Gastgeberin gehalten haben!";
      this.pass.IsInvalid = true;
    }
    else if (umsatz < 1200 && !this.pass.AddFremdUmsaetze) {
      this.message = "Pass wird zwar gespeichert, aber er wurde als ungültig markiert - denn: Sie müssen mindestens 1200 € Umsatz in dem Wettbewerbs-Zeitraum generiert haben!";
      this.pass.IsInvalid = true;
    }
    else {
      this.pass.IsInvalid = false;
    }

    // wenn der Gastgeberpass gespeichert wird und keine Fehler enthält, wird er automatisch auf Prüfung (-2) gesetzt
    if (!this.pass.IsInvalid) {
      this.pass.Status = -2;  // Pass auf Prüfung setzen
    }
     // Gastgeberpass speichern
     this.lumaraService
       .doCommand(LumaraServiceCommands.UpdateAktivGastgeberpass(this.pass))
       .subscribe(data => {
         if (data.ReturnCode === 200) {
           // this.gastgeberList = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue);
           notify('Aktivgastgeberpass wurde erfolgreich gespeichert');
           if (!this.pass.IsInvalid) {
              // auf die Aktivgastgeberpassliste zurückspringen
              this.router.navigate(['/userdata-aktivgastgeber']);
           }
         } else {
           notify(data.ReturnMessage);
         }
       });
  }
  deletePass() {
      // Gastgeber-Pass speichern
      this.lumaraService
        .doCommand(LumaraServiceCommands.DeleteAktivGastgeberpass(this.pass.Oid))
        .subscribe(data => {
          if (data.ReturnCode === 200) {
            notify('Gastgeberpass wurde erfolgreich gelöscht');
           // auf die Aktivgastgeberpassliste zurückspringen
           this.router.navigate(['/userdata-aktivgastgeber']);
          } else if (data.ReturnCode >= 400) {
            notify(data.ReturnMessage);
          }
        });
  }

  createUmsatz() {
    if (this.pass) {
      const us = new AktivGastgeberUmsatz();
      us.Datum = new Date(2021,6,1);
      //us.Datum = moment(us.Datum).utc(true).toDate();
      us.Umsatz = 0;
      this.pass.Umsaetze.push(us);
    }
  }

  deleteLastUmsatz() {
    console.log("Umsatz wird gelöscht!");
    this.pass.Umsaetze.splice(this.pass.Umsaetze.length-1, 1);
  }

  getStatusColor(status: number) {
    if (status == 0) {
      return '#444E99';
    } else if (status == -1) {
      return '#E32322';
    } else if (status == -2) {
      return '#EA621F';
    } else if (status == 1) {
      return '#008E5B';
    }
  }

  getStatusText(status: number) {
    if (status == 0) {
      return 'offen/bearbeitbar';
    } else if (status == -1) {
      return 'abgelehnt';
    } else if (status == -2) {
      return 'warte auf Prüfung';
    } else if (status == 1) {
      return 'genehmigt';
    }
  }
}
