import { Component, OnInit } from '@angular/core';
import { NavItem } from './models/navitem';
import { LumaraService } from './service/lumara_service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-navigation',
  templateUrl: './navigation.component.html',
  styleUrls: ['./navigation.component.css']
})
export class NavigationComponent implements OnInit {
  private currentRoute: any;
  navItems: NavItem[] = [
    {
      caption: 'persönliche Daten',
      imagefilename:
        '/assets/navicons/kontaktdaten_white.png',
      routerlink: ['/userdata-allgemein']
    },
    {
      caption: 'Telegram-Benachrichtigung',
      imagefilename:
        '/assets/navicons/telegram_white.png',
      routerlink: ['/userdata-messenger']
    },
    {
      caption: 'Steuerdaten',
      imagefilename:
        '/assets/navicons/steuer_white.png',
      routerlink: ['/userdata-steuer']
    },
    {
      caption: 'meine Backvorträge',
      imagefilename:
        '/assets/navicons/calendar_white.png',
      routerlink: ['/userdata-backtermine']
    }
  ];
  constructor(private lumaraService: LumaraService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    this.currentRoute = this.route.params.subscribe(params => {
      console.log(params);
    });
  }

}
