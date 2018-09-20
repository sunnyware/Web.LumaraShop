import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import {registerLocaleData} from '@angular/common';
import localeDe from '@angular/common/locales/de';

import {AppComponent} from './app.component';
import {MainComponent} from './main.component';
import {RouterModule, Routes} from '@angular/router';
import {NewsComponent} from './views/news/news.component';
import {OrdersComponent} from './views/auftraege/orders.component';
import {StatistikComponent} from './views/statistik/statistik.component';
import {GalleryComponent} from './views/galerie/gallery.component';
import {FormsComponent} from './views/formulare/forms.component';
import {
  DxButtonModule,
  DxChartModule,
  DxCheckBoxModule,
  DxFormModule,
  DxListModule, DxPopupModule,
  DxTabPanelModule,
  DxTabsModule,
  DxTemplateModule,
  DxTextBoxModule,
  DxValidationGroupModule,
  DxValidationSummaryModule,
  DxValidatorModule,
  DxNumberBoxModule
} from 'devextreme-angular';
import 'devextreme-intl';
import {NgbModule, NgbCollapseModule, NgbCarousel, NgbCarouselModule, NgbTooltipModule} from '@ng-bootstrap/ng-bootstrap';
import {locale, loadMessages} from 'devextreme/localization';
import * as messagesDe from 'devextreme/localization/messages/de.json';
import {ArtikellisteComponent} from './views/artikel/artikelliste.component';
import {LoginComponent} from './login.component';
import {LumaraService} from './service/lumara_service';
import {ProtectedGuard} from './service/protected_guard';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MarkdownModule} from 'ngx-markdown';
import {KontakteComponent} from './views/kontakte/kontakte.component';
import {KontakteGastgeberComponent} from './views/kontakte/kontakte-gastgeber.component';
import {KontakteFachberaterComponent} from './views/kontakte/kontakte-fachberater.component';
import {UserdataComponent} from './views/user/userdata.component';
import {UserdataAllgemeinComponent} from './views/user/userdata-allgemein.component';
import {UserdataSteuerComponent} from './views/user/userdata-steuer.component';
import {UserdataProfilComponent} from './views/user/userdata-profil.component';
import {BacktermineComponent} from './views/termine/backtermine.component';
import {NewsArtikelComponent} from './views/news/news-artikel.component';
import {ChefStatistikComponent} from './views/statistik/chef-statistik.component';
import {ChefStatistikAktivGGComponent} from './views/statistik/chef-statistik-aktiv-gg.component';
import {ChefStatistikMenuComponent} from './views/statistik/chef-statistik-menu.component';
import { GalleryItemsComponent } from './views/galerie/gallery-items.component';
import { GalleryBigItemComponent } from './views/galerie/gallery-big-item.component';
import { TestComponent } from './views/statistik/test.component';
import { JahresspiegelComponent } from './views/statistik/jahresspiegel.component';
import { JahresumsatzComponent } from './views/statistik/jahresumsatz.component';

registerLocaleData(localeDe);
loadMessages(messagesDe);
locale(navigator.language);

const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'news', pathMatch: 'full'},
  {path: 'news', component: NewsComponent, canActivate: [ProtectedGuard]},
  {path: 'news/:id', component: NewsArtikelComponent, canActivate: [ProtectedGuard]},
  {path: 'orders', component: OrdersComponent, canActivate: [ProtectedGuard]},
  {path: 'statistik', component: StatistikComponent, canActivate: [ProtectedGuard]},
  {
    path: 'chefstatistik', component: ChefStatistikComponent, canActivate: [ProtectedGuard], children: [
      {path: 'menu', component: ChefStatistikMenuComponent, canActivate: [ProtectedGuard]},
      {path: 'aktivgg', component: ChefStatistikAktivGGComponent, canActivate: [ProtectedGuard]},
      {path: 'jahresspiegel', component: JahresspiegelComponent, canActivate: [ProtectedGuard]},
      {path: 'jahresumsatz', component: JahresumsatzComponent, canActivate: [ProtectedGuard]}
    ]
  },
  {path: 'gallery', component: GalleryComponent, canActivate: [ProtectedGuard]},
  {path: 'gallery/:term', component: GalleryItemsComponent, canActivate: [ProtectedGuard]},
  {path: 'gallery/:term/:term', component: GalleryBigItemComponent, canActivate: [ProtectedGuard]},
  {path: 'forms', component: FormsComponent, canActivate: [ProtectedGuard]},
  {
    path: 'kontakte', component: KontakteComponent, canActivate: [ProtectedGuard], children: [
      {path: 'gastgeber', component: KontakteGastgeberComponent, canActivate: [ProtectedGuard]},
      {path: 'fachberater', component: KontakteFachberaterComponent, canActivate: [ProtectedGuard]}
    ]
  },
  {path: 'artikelliste', component: ArtikellisteComponent, canActivate: [ProtectedGuard]},
  {
    path: 'userdata', component: UserdataComponent, canActivate: [ProtectedGuard], children: [
      {path: 'allgemein', component: UserdataAllgemeinComponent, canActivate: [ProtectedGuard]},
      {path: 'steuer', component: UserdataSteuerComponent, canActivate: [ProtectedGuard]},
      {path: 'profil', component: UserdataProfilComponent, canActivate: [ProtectedGuard]}
    ]
  },
  {path: 'login', component: LoginComponent},
  {path: 'test', component: TestComponent},
  {path: 'calendar', component: BacktermineComponent, canActivate: [ProtectedGuard]}
];


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    NewsComponent,
    OrdersComponent,
    StatistikComponent,
    GalleryComponent,
    FormsComponent,
    ArtikellisteComponent,
    LoginComponent,
    KontakteComponent,
    KontakteGastgeberComponent,
    KontakteFachberaterComponent,
    UserdataComponent,
    UserdataAllgemeinComponent,
    UserdataSteuerComponent,
    UserdataProfilComponent,
    BacktermineComponent,
    NewsArtikelComponent,
    ChefStatistikComponent,
    ChefStatistikAktivGGComponent,
    ChefStatistikMenuComponent,
    GalleryItemsComponent,
    GalleryBigItemComponent,
    TestComponent,
    JahresspiegelComponent,
    JahresumsatzComponent
  ],
  imports: [
    NgbModule.forRoot(),
    NgbCollapseModule,
    NgbCarouselModule,
    NgbTooltipModule,
    BrowserModule, FormsModule, HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    MarkdownModule.forRoot(),
    DxButtonModule,
    DxChartModule,
    DxCheckBoxModule,
    DxFormModule,
    DxListModule,
    DxNumberBoxModule,
    DxPopupModule,
    DxTabPanelModule,
    DxTabsModule,
    DxTextBoxModule,
    DxTemplateModule,
    DxValidatorModule,
    DxValidationGroupModule,
    DxValidationSummaryModule
  ],
  providers: [LumaraService, ProtectedGuard, {
    provide: LOCALE_ID,
    useValue: 'de-DE'
  }],
  bootstrap: [MainComponent]
})
export class AppModule {
}
