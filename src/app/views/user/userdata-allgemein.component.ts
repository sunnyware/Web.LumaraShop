import {Component, OnInit} from '@angular/core';
import {LumaraService} from '../../service/lumara_service';
import {Fachberater} from '../../models/fachberater';
import {LumaraServiceCommands} from '../../service/lumara_service_commands';
import {Router} from '@angular/router';
import notify from 'devextreme/ui/notify';

@Component({
  selector: 'app-userdata-allgemein',
  templateUrl: './userdata-allgemein.component.html',
  styles: []
})
export class UserdataAllgemeinComponent implements OnInit {
  fachberater: Fachberater = undefined;

  constructor(private lumaraService: LumaraService, private router: Router) {

  }

  ngOnInit() {
    this.reloadFachberater();
  }

  reloadFachberater() {
    this.lumaraService.doCommand(LumaraServiceCommands.GetFachberater()).subscribe(
      data => {
        if (data.ReturnCode === 200) {
          this.fachberater = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue);

        } else if (data.ReturnCode >= 400) {
          console.log(data.ReturnMessage);
          this.router.navigate(['/login']);
        }
      }
    );
  }

  saveFachberater() {
    if (!this.fachberater) {
      alert('keine Daten zum speichern vorhanden!');
      return;
    }
    this.lumaraService.doCommand(LumaraServiceCommands.UpdateFachberater(this.fachberater)).subscribe(
      data => {
        if (data.ReturnCode === 200) {
          notify('Ihre Daten wurden erfolgreich gespeichert.');

        } else if (data.ReturnCode >= 400) {
          console.log(data.ReturnMessage);
          this.router.navigate(['/login']);
        }
      }
    );
  }
}
