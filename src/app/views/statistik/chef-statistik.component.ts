import { Component, OnInit } from '@angular/core';
import {LumaraService} from '../../service/lumara_service';

@Component({
  selector: 'app-chef-statistik',
  templateUrl: './chef-statistik.component.html',
  styles: []
})
export class ChefStatistikComponent implements OnInit {

  constructor(private lumaraService: LumaraService) {
    lumaraService.setHeadline('Chef-Statistik');
  }

  ngOnInit() {
  }

}
