import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { registerLocaleData } from '@angular/common';
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
  DxValidatorModule
} from 'devextreme-angular';
import 'devextreme-intl';
import {locale, loadMessages} from 'devextreme/localization';
import * as messagesDe from 'devextreme/localization/messages/de.json';
import {ArtikellisteComponent} from './views/artikel/artikelliste.component';
import {LoginComponent} from './login.component';
import {LumaraService} from './service/lumara_service';
import {ProtectedGuard} from './service/protected_guard';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {MarkdownModule} from 'ngx-markdown';
import { KontakteComponent } from './views/kontakte/kontakte.component';
import { KontakteGastgeberComponent } from './views/kontakte/kontakte-gastgeber.component';
import { KontakteFachberaterComponent } from './views/kontakte/kontakte-fachberater.component';
import { UserdataComponent } from './views/user/userdata.component';
import { UserdataAllgemeinComponent } from './views/user/userdata-allgemein.component';
import { UserdataSteuerComponent } from './views/user/userdata-steuer.component';
import { UserdataProfilComponent } from './views/user/userdata-profil.component';
import { BacktermineComponent } from './views/termine/backtermine.component';

registerLocaleData(localeDe);
loadMessages(messagesDe);
locale(navigator.language);

const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'news', pathMatch: 'full'},
  {path: 'news', component: NewsComponent, canActivate: [ProtectedGuard]},
  {path: 'orders', component: OrdersComponent, canActivate: [ProtectedGuard]},
  {path: 'statistik', component: StatistikComponent, canActivate: [ProtectedGuard]},
  {path: 'gallery', component: GalleryComponent, canActivate: [ProtectedGuard]},
  {path: 'forms', component: FormsComponent, canActivate: [ProtectedGuard]},
  {path: 'kontakte', component: KontakteComponent, canActivate: [ProtectedGuard], children: [
      {path: 'gastgeber', component: KontakteGastgeberComponent, canActivate: [ProtectedGuard]},
      {path: 'fachberater', component: KontakteFachberaterComponent, canActivate: [ProtectedGuard]}
    ]},
  {path: 'artikelliste', component: ArtikellisteComponent, canActivate: [ProtectedGuard]},
  {path: 'userdata', component: UserdataComponent, canActivate: [ProtectedGuard], children: [
      {path: 'allgemein', component: UserdataAllgemeinComponent, canActivate: [ProtectedGuard]},
      {path: 'steuer', component: UserdataSteuerComponent, canActivate: [ProtectedGuard]},
      {path: 'profil', component: UserdataProfilComponent, canActivate: [ProtectedGuard]}
    ]},
  {path: 'login', component: LoginComponent},
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
    BacktermineComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    MarkdownModule.forRoot(),
    DxButtonModule,
    DxChartModule,
    DxCheckBoxModule,
    DxFormModule,
    DxListModule,
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
