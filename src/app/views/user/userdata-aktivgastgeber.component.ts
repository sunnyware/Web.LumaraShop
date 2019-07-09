import { Component, OnInit } from '@angular/core';
import { AktivGastgeberpass, AktivgastgeberpassSearchResultItem } from 'src/app/models/gastgeber';
import { LumaraService } from 'src/app/service/lumara_service';
import { Router } from '@angular/router';
import { LumaraServiceCommands } from 'src/app/service/lumara_service_commands';

@Component({
  selector: 'app-userdata-aktivgastgeber',
  templateUrl: './userdata-aktivgastgeber.component.html',
  styleUrls: []
})
export class UserdataAktivgastgeberComponent implements OnInit {
  paesse: AktivgastgeberpassSearchResultItem[] = undefined;
  constructor( private lumaraService: LumaraService,
    private router: Router) { }

  ngOnInit() {
    this.reloadAktivgastgeberPaesse();
  }

  reloadAktivgastgeberPaesse() {
    //console.log("Aktueller BenutzerID: ");
    //console.log(this.lumaraService.current_fachberater.ID);
    this.lumaraService
    .doCommand(LumaraServiceCommands.GetAktivGastgeberpaesse(this.lumaraService.current_fachberater.ID, 2018))
    .subscribe(data => {
      if (data.ReturnCode === 200) {
        console.log('GetAktivGastgeberpaesse: ');
        console.log(data.ReturnValue);
        this.paesse = JSON.parse(data.ReturnValue); // JSON.parse(data.ReturnValue);
        // notify(data.ReturnMessage);
      } else if (data.ReturnCode >= 400) {
        alert("Fehler: "+data.ReturnMessage);
      }
    });
  }

  /*
  createGastgeberpass() {
    this.lumaraService
    .doCommand(LumaraServiceCommands.CreateAktivGastgeberpass(this.lumaraService.current_fachberater.ID, 2018))
    .subscribe(data => {
      if (data.ReturnCode === 200) {
        console.log('CreateAktivGastgeberpass: ');
        console.log(data.ReturnValue);
        this.paesse = JSON.parse(data.ReturnValue); // JSON.parse(data.ReturnValue);
        // notify(data.ReturnMessage);
      } else if (data.ReturnCode >= 400) {
        alert("Fehler: "+data.ReturnMessage);
        //this.router.navigate(['/login']);
      }
    });
  }
*/

  getStatusIconFile(status: number) {
    if (status == 0) {
      return 'warten.png';
    } else if (status == -1) {
      return 'abgelehnt.png';
    } else if (status == -2) {
      return 'warten.png';
    } else if (status == 1) {
      return 'akzeptiert.png';
    }
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
      return 'offen, zur Bearbeitung hier klicken!';
    } else if (status == -1) {
      return 'abgelehnt';
    } else if (status == -2) {
      return 'warte auf Prüfung';
    } else if (status == 1) {
      return 'genehmigt';
    }
  }
}
