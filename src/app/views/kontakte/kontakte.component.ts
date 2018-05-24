import {Component, OnInit} from '@angular/core';
import {Gastgeber} from '../../models/gastgeber';
import {LumaraService} from '../../service/lumara_service';

@Component({
  selector: 'app-kontakte',
  templateUrl: './kontakte.component.html',
  styles: []
})
export class KontakteComponent implements OnInit {
  currentGastgeber: Gastgeber = undefined;

  constructor(private lumaraService: LumaraService) {
    lumaraService.setHeadline('meine Kontakte');
  }

  ngOnInit() {
  }


}
