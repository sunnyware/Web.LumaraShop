import { Component, OnInit } from '@angular/core';
import { Fachberater } from '../../models/fachberater';
import { LumaraService } from '../../service/lumara_service';
import { Router } from '@angular/router';
import { LumaraServiceCommands } from '../../service/lumara_service_commands';
import notify from 'devextreme/ui/notify';
import { BlogPost } from '../../models/blogpost';

@Component({
  selector: 'app-userdata-messenger',
  templateUrl: './userdata-messenger.component.html',
  styleUrls: []
})
export class UserdataMessengerComponent implements OnInit {
  fachberater: Fachberater = undefined;

  constructor(private lumaraService: LumaraService, private router: Router) { }

  ngOnInit() {
    this.reloadFachberater();
  }

  reloadFachberater() {
    this.lumaraService.doCommand(LumaraServiceCommands.GetFachberater(0)).subscribe(
      data => {
        // console.log('vom server fachberater:');
        // console.log(data);
        if (data.ReturnCode === 200) {
          this.fachberater = JSON.parse(data.ReturnValue);  // JSON.parse(data.ReturnValue)
        } else if (data.ReturnCode >= 400) {
          console.log(data.ReturnMessage);
          notify(data.ReturnMessage);
          // this.router.navigate(['/login']);
        }
      }
    );
  }

}
