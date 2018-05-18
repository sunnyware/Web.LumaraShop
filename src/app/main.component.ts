import {Component, OnInit} from '@angular/core';
import {NavItem} from './models/navitem';
import {ActivatedRoute, Router} from "@angular/router";
import {LumaraService} from "./service/lumara_service";

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styles: []
})
export class MainComponent implements OnInit {
  navitems: NavItem[] = [
    {caption: 'NEWS', imagefilename: 'news.png', routerlink: 'news'},
    {caption: 'AUFTRÄGE', imagefilename: 'order.png', routerlink: 'orders'},
    // {caption: 'CHEF-STATISTIK', imagefilename: 'chart-column-2d-stacked-vendor.png', routerlink: 'statistik'},
    {caption: 'STATISTIK', imagefilename: 'chart-column-2d-stacked.png', routerlink: 'statistik'},
    {caption: 'BERATER-LISTE', imagefilename: 'list-user-group.png', routerlink: 'fachberaterliste'},
    {caption: 'FORMULARE', imagefilename: 'document-acrobat.png', routerlink: 'forms'},
    {caption: 'GALERIE', imagefilename: 'pictures.png', routerlink: 'gallery'},
    // {caption: 'VERSAND', imagefilename: 'shipment.png', routerlink: 'gallery'},
    // {caption: 'BUCHHALTUNG', imagefilename: 'bank-money-coins.png', routerlink: 'gallery'},
    {caption: 'ARTIKEL', imagefilename: 'registry-editor.png', routerlink: 'artikelliste'},
    {caption: 'STAMMDATEN', imagefilename: 'user-woman-info.png', routerlink: 'userdata'},
    {caption: 'BACKTERMINE', imagefilename: 'calendar-selection-day.png', routerlink: 'calendar'}
  ];
  headline = '';

  constructor(private lumaraService: LumaraService, private router: Router, private route: ActivatedRoute) {
    this.lumaraService.getCurrentHeadlineObservable().subscribe(
      currentHeadlineCaption => {
        this.headline = currentHeadlineCaption;
        // if (this.netloggerService.current_customer != null) {
        //    let custID = this.netloggerService.current_customer.cust_id;
        //    this.buildNavigationButtons(custID);
        // }
      }
    );
  }

  ngOnInit() {
  }

}
