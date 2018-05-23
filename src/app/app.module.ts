import {BrowserModule} from '@angular/platform-browser';
import {LOCALE_ID, NgModule} from '@angular/core';
import { registerLocaleData } from '@angular/common';
import localeDe from '@angular/common/locales/de';

import {AppComponent} from './app.component';
import {MainComponent} from './main.component';
import {HomeComponent} from './home.component';
import {RouterModule, Routes} from '@angular/router';
import {NewsComponent} from './news.component';
import {OrdersComponent} from './orders.component';
import {StatistikComponent} from './statistik.component';
import {GalleryComponent} from './gallery.component';
import {FormsComponent} from './forms.component';
import {UserDataComponent} from './user-data.component';
import {
  DxButtonModule,
  DxChartModule, DxCheckBoxModule, DxListModule, DxTabPanelModule, DxTemplateModule, DxTextBoxModule, DxValidationGroupModule,
  DxValidationSummaryModule,
  DxValidatorModule
} from 'devextreme-angular';
import {BlogPostComponent} from './blog-post.component';
import 'devextreme-intl';
import {locale, loadMessages} from 'devextreme/localization';
import * as messagesDe from 'devextreme/localization/messages/de.json';
import {FachberaterlisteComponent} from './fachberaterliste.component';
import {ArtikellisteComponent} from './artikelliste.component';
import {LoginComponent} from './login.component';
import {LumaraService} from './service/lumara_service';
import {ProtectedGuard} from './service/protected_guard';
import {FormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import { CalendarComponent } from './calendar.component';
import {MarkdownModule} from 'ngx-markdown';

registerLocaleData(localeDe);
loadMessages(messagesDe);
locale(navigator.language);

const APP_ROUTES: Routes = [
  {path: '', redirectTo: 'home', pathMatch: 'full'},
  {path: 'home', component: HomeComponent, canActivate: [ProtectedGuard]},
  {path: 'news', component: NewsComponent, canActivate: [ProtectedGuard]},
  {path: 'orders', component: OrdersComponent, canActivate: [ProtectedGuard]},
  {path: 'statistik', component: StatistikComponent, canActivate: [ProtectedGuard]},
  {path: 'gallery', component: GalleryComponent, canActivate: [ProtectedGuard]},
  {path: 'forms', component: FormsComponent, canActivate: [ProtectedGuard]},
  {path: 'fachberaterliste', component: FachberaterlisteComponent, canActivate: [ProtectedGuard]},
  {path: 'artikelliste', component: ArtikellisteComponent, canActivate: [ProtectedGuard]},
  {path: 'userdata', component: UserDataComponent, canActivate: [ProtectedGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'calendar', component: CalendarComponent, canActivate: [ProtectedGuard]}
];


@NgModule({
  declarations: [
    AppComponent,
    MainComponent,
    HomeComponent,
    NewsComponent,
    OrdersComponent,
    StatistikComponent,
    GalleryComponent,
    FormsComponent,
    UserDataComponent,
    BlogPostComponent,
    FachberaterlisteComponent,
    ArtikellisteComponent,
    LoginComponent,
    CalendarComponent
  ],
  imports: [
    BrowserModule, FormsModule, HttpClientModule,
    RouterModule.forRoot(APP_ROUTES),
    MarkdownModule.forRoot(),
    DxButtonModule,
    DxChartModule,
    DxCheckBoxModule,
    DxListModule,
    DxTabPanelModule,
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
