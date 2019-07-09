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
  // private currentRoute: any;
  navItems: NavItem[] = [];

  constructor(private lumaraService: LumaraService, private router: Router, private route: ActivatedRoute) {
  }

  ngOnInit() {
    console.log('routes');
    console.log(this.route.snapshot);
    console.log(this.route.snapshot);
    // this.currentRoute = this.route.params.subscribe(params => {
    //   console.log(params);
    // });
    const url = this.route.snapshot.url;
    if (url.length > 0) {
      if (url[0].path === 'userdata') {
        this.navItems = [];
        this.navItems.push({caption: 'persönliche Daten', imagefilename: '/assets/navicons/kontaktdaten_white.png', routerlink: ['/userdata-allgemein']});
        this.navItems.push({caption: 'Telegram-Benachrichtigung', imagefilename: '/assets/navicons/telegram_white.png', routerlink: ['/userdata-messenger']});
        this.navItems.push({caption: 'Steuerdaten', imagefilename: '/assets/navicons/steuer_white.png', routerlink: ['/userdata-steuer']});
        // console.log(this.lumaraService.current_fachberater);
        if (this.lumaraService.current_fachberater && this.lumaraService.current_fachberater.ShowAddressInHomepage) {
          this.navItems.push({caption: 'meine Backvorträge', imagefilename: '/assets/navicons/calendar_white.png', routerlink: ['/userdata-backtermine']});
        }
        this.navItems.push({caption: 'Aktiv-Gastgeberpass', imagefilename: '/assets/navicons/batch_assign_white.png', routerlink: ['/userdata-aktivgastgeber']});
      }
    }
  }

}
