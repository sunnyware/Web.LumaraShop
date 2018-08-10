import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../models/navitem';

@Component({
  selector: 'app-chef-statistik-menu',
  templateUrl: './chef-statistik-menu.component.html',
  styles: []
})
export class ChefStatistikMenuComponent implements OnInit {
  navItems: NavItem[] = [
    {
      caption: 'Aktiv-Gastgeberwettbewerb',
      imagefilename:
        '/assets/icons_white/96px/large/chart-column-2d-stacked.png',
      routerlink: ['/chefstatistik', 'aktivgg']
    },
    {
      caption: 'Jahresspiegel',
      imagefilename:
        '/assets/icons_white/96px/large/chart-column-2d-stacked.png',
      routerlink: ['/chefstatistik', 'jahresspiegel']
    },
    {
      caption: 'Jahresumsatz',
      imagefilename:
        '/assets/icons_white/96px/large/chart-column-2d-stacked.png',
      routerlink: ['/chefstatistik', 'jahresumsatz']
    }
  ];
  constructor() {}

  ngOnInit() {}
}
