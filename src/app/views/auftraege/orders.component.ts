import { Component, OnInit } from '@angular/core';
import {LumaraService} from "../../service/lumara_service";

@Component({
  selector: 'app-orders',
  templateUrl: './orders.component.html',
  styles: []
})
export class OrdersComponent implements OnInit {

  constructor(private lumaraService: LumaraService) {
    lumaraService.setHeadline('Aufträge');
  }

  ngOnInit() {
  }

}
