import { Component, OnInit, ElementRef, Renderer } from '@angular/core';
import { Ust } from 'src/app/models/ust';
import { LumaraService } from 'src/app/service/lumara_service';
import { Router } from '@angular/router';
import { JsonCommand } from 'src/app/utils/json/json-command';
import { NgForm } from '@angular/forms';
import { JsonHelper } from 'src/app/utils/json/jsonhelper';

@Component({
  selector: 'app-userdata-steuer',
  templateUrl: './userdata-steuer.component.html',
  styles: []
})
export class UserdataSteuerComponent implements OnInit {

  ust: Ust = null;
  currentYear = 2022;
  isLoaded = false;
  isGermany = false;
  showHinweis1 = false;
  showHinweis2 = false;
  showHinweis3 = false;
  isAccept = false;

  showPersistenMessage = false;
  persistentMessage = '';
  persistentMessages = ['Es liegen uns für das ausgewählte Jahr noch keine Informationen über Ihre Steuerpflicht vor! ' +
  ' Bitte füllen Sie folgendes Formular umgehend und gewissenhaft aus und speichern es. ' +
  'Wenn uns diese Informationen fehlen, können Sie keine Bestellungen in dem gewählten Jahr abgeben. Wir bitten um Ihr Verständnis! Danke!',
  // tslint:disable-next-line:max-line-length
  'Folgende Daten wurden bei uns am <strong>##changed_timestamp</strong> gespeichert. Sollten sich bei Ihnen Änderungen ergeben haben oder bemerken Sie fehlerhafte Angaben, ' +
  'so aktualisieren Sie umgehend diese Angaben und speichern diese!'
  ];

  showReturnMessage = false;
  returnMessage = '';

  constructor(private lumaraService: LumaraService, private router: Router, elRef: ElementRef, renderer: Renderer) {

  }

  ngOnInit() {
      // this.user = this.lumaraService.getUserData();
    this.onYearClick(this.currentYear);
  }

  onYearClick(year: number) {
      this.currentYear = year;
      this.isAccept = false;
      // Hier die Ust-Daten laden und anzeigen
      const cmd = new JsonCommand();
      cmd.ModuleName = 'Modules.Lumara.Base.Service.MitarbeiterService';
      cmd.CommandName = 'GetUSteuerType';
      cmd.addParameter('jahr', year);
      this.lumaraService.doCommand(cmd).subscribe(
          data => {
              if (data.ReturnCode === 1) {
                console.log('Ich bekam vom Server folgende Daten: ' + data.ReturnValue);
                  this.ust = JsonHelper.DeserializeJsonWithDate(data.ReturnValue);  // Helper.DeserializeJsonWithDate(data.ReturnValue);
                  this.isGermany = this.ust.land === 'D';
                  console.log('Deserialisierte Daten: ' + JSON.stringify(this.ust));

                  this.showPersistenMessage = true;
                  if (this.ust.changed_timestamp < new Date('1970-01-01')) {
                      this.persistentMessage = this.persistentMessages[0];
                  } else {
                      this.persistentMessage = this.persistentMessages[1].replace('##changed_timestamp',
                      this.ust.changed_timestamp.toLocaleString());
                  }
                  this.isLoaded = true;
              } else {
                  if (data.ReturnCode === 401) {
                      this.router.navigate(['/login']);
                  }
                  this.showPersistenMessage = true;
                  this.persistentMessage = data.ReturnMessage;
              }
          }
      );

  }

  onClickHinweis1() {
      this.showHinweis1 = !this.showHinweis1;
  }

  onClickHinweis2() {
      this.showHinweis2 = !this.showHinweis2;
  }

  onClickHinweis3() {
      this.showHinweis3 = !this.showHinweis3;
  }

  onSubmit(form: NgForm) {
      console.log(form);
      // Plausi-Prüfungen
      if (form.value.usteuer_type !== '1' && form.value.usteuer_type !== '2' && form.value.usteuer_type !== '3') {
          this.showReturnMessage = true;
          this.returnMessage = 'Bitte wählen Sie Ihre Umsatzsteuerpflicht!';
          return;
      }
      const cmd = new JsonCommand();
      cmd.ModuleName = 'Modules.Lumara.Base.Service.MitarbeiterService';
      cmd.CommandName = 'SetUSteuerType';
      cmd.addParameter('doid_personalakte', this.ust.doid_personalakte);
      cmd.addParameter('jahr', this.currentYear);
      cmd.addParameter('address', form.value.address);
      cmd.addParameter('land', this.ust.land);
      cmd.addParameter('steuernummer', form.value.steuernummer);
      cmd.addParameter('usteuer_type', form.value.usteuer_type);
      this.lumaraService.doCommand(cmd).subscribe(
          data => {
              this.showReturnMessage = true;
              this.returnMessage = data.ReturnMessage;
              // this.msgdiv.scrollIntoView(false)
          }
      );
  }

}
