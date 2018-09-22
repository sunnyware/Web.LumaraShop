import { Component, OnInit } from '@angular/core';
import { NavItem } from '../../models/navitem';
import { LumaraService } from '../../service/lumara_service';
import { Router } from '@angular/router';
import { LumaraServiceCommands } from '../../service/lumara_service_commands';
import notify from 'devextreme/ui/notify';

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
  constructor(private lumaraService: LumaraService, private router: Router) {}

  ngOnInit() {}

  setDebugMode(mode: number) {
    this.lumaraService
      .doCommand(LumaraServiceCommands.SetDebugMode(mode))
      .subscribe(data => {
        notify(data.ReturnMessage);
      });
  }
}
