import {Subject, Observable} from 'rxjs';
// import 'rxjs/Rx';
// import {Observable} from 'rxjs/Observable';
import {Injectable} from '@angular/core';
// import {Http, Headers, Response} from '@angular/http';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Router} from '@angular/router';
import {JsonCommand} from '../utils/json/json-command';
import {UserAccessRights} from '../models/user_access_rights';
import {LumaraServiceCommands} from './lumara_service_commands';
import {tap} from 'rxjs/internal/operators';

@Injectable()
export class LumaraService {
  public url_zentrale = 'https://service.lumara.de/cmd?jsoncommand';
  public url_zentrale_min = 'https://service.lumara.de';
  // public url_zentrale = 'http://localhost:8990/cmd?jsoncommand';
  // public url_zentrale_min = 'http://localhost:8990';
  public current_user_name = '';
  public current_token = '';
  public current_user_access_rights: UserAccessRights = undefined;
  public isAuthenticated = false;
  private authState = new Subject<boolean>();
  private current_headline = '';
  private current_headline_state = new Subject<string>();

  constructor(private http: HttpClient, private router: Router) {
    // console.log('currentToken:' + this.current_token);
    this.current_token = localStorage.getItem('lum_user_token');
    // console.log('currentToken:' + this.current_token);
    // if (this.current_user_access_rights) {
      this.isAuthenticated = this.current_token !== '';
    // }

    this.current_user_name = localStorage.getItem('lum_user_name');
    this.authState.next(this.isAuthenticated);

    if (this.isAuthenticated) {
      console.log('isAuthenticated:' + this.isAuthenticated);
      this.loadUserAccessRights();
    }
  }

  doRequestGet(url: string): Observable<string> {
    // const body = JSON.stringify(data);
    // const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.get(url, {responseType: 'text'});
  }

  doRequest(url: string, data: any): Observable<string> {
    const body = JSON.stringify(data);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<string>(url, body, {headers: headers});
  }

  doCommand(cmd: JsonCommand): Observable<any> {
    // der user und der token wird immer mitgeliefert
    cmd.addParameter('user', this.current_user_name);
    cmd.addParameter('token', this.current_token);
    const body = cmd.toJson();
    console.log('Command wird gesendet: ' + body);
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    return this.http.post<any>(this.url_zentrale, body, {headers: headers});
    /*.map((response: Response) => {
      console.log('Command-Antwort:');
      console.log(response.json());
      return response.json();
    });*/
  }

  getUserImageUrl(userid: number) {
    const retval = this.url_zentrale + '&user=' + this.current_user_name + '&token=' + this.current_token +
      '&modulename=Modules.Users.Service.UserService&commandname=GetUserImage&user_id=' + userid + '&UserImageSize=2';
    return retval;
  }
  getGastgeberlistAsCSVUrl() {
    const retval = this.url_zentrale + '&user=' + this.current_user_name + '&token=' + this.current_token +
      '&modulename=Modules.Lumara.Base.Service.BaseService&commandname=DownloadGastgeber';
    return retval;
  }

  tryAutoLogin() {
    const password = localStorage.getItem('nl_password');
    if (this.current_user_name && password && !this.isAuthenticated) {
      this.signinUser(this.current_user_name, password, false);
    }
  }

  signinUser(username: string, password: string, autologin: boolean) {
    // nach den Erfolgreichen einloggen den AuthState setzen
    this.current_user_access_rights = undefined;
    const cmd = new JsonCommand();
    cmd.ModuleName = 'Modules.Lumara.Base.Service.MitarbeiterService';
    cmd.CommandName = 'Login';
    cmd.addParameter('user', username);
    cmd.addParameter('password', password);
    const body = cmd.toJson();
    console.log('Ich versuch mich jetzt einzuloggen');
    const headers = new HttpHeaders({'Content-Type': 'application/json'});
    this.http.post<any>(this.url_zentrale, body, {headers: headers})
      .subscribe(
        data => {
          // console.log(data);
          if (data.ReturnCode === 1) {
            this.current_token = data.ReturnValue;
            this.current_user_name = username;
            localStorage.setItem('lum_user_token', this.current_token);
            localStorage.setItem('lum_user_name', this.current_user_name);
            if (autologin) {
              localStorage.setItem('lum_password', password);
            }
            this.isAuthenticated = true;
            this.authState.next(true);
            this.loadUserAccessRights();
            console.log('Benutzer wurde erfolgreich eingeloggt! Token:' + this.current_token);
            // wenn erfolgreich eingeloggt, dann automatisch auf "News" routen
            this.router.navigate(['/news']);
          } else {
            console.log(data.ReturnMessage);
            alert(data.ReturnMessage);
          }
        }
      );
  }

  loadUserAccessRights() {
    this.doCommand(LumaraServiceCommands.GetUserAccessRights()).subscribe(
      data => {
        if (data.ReturnCode === 200) {
          // console.log('Ich bekam vom Server folgende Daten: ' + data.ReturnValue);
          // this.mytile.instance.beginUpdate();
          this.current_user_access_rights = JSON.parse(data.ReturnValue);
          this.authState.next(true);
          // this.mytile.instance.endUpdate();
        } else if (data.ReturnCode === 401) {
          this.current_user_access_rights = undefined;
          this.router.navigate(['/login']);
        }
      }
    );
  }

  logout() {
    console.log('Logout wurde ausgeführt!');
    // sessionToken aus LocalStorage löschen
    localStorage.removeItem('lum_user_token');
    localStorage.removeItem('lum_user_name');
    localStorage.removeItem('lum_password');
    this.current_token = '';
    this.current_user_name = '';
    this.isAuthenticated = false;
    this.authState.next(false);
  }

  updateAuthState() {
    this.authState.next(this.isAuthenticated);
  }

  getIsAuthenticated() {
    return this.authState.asObservable();
  }

  setHeadline(headlineCaption: string) {
    // console.log('Headline: ' + this.current_headline + ' Customer: ');
    // console.log('CustomerCaption: '+this.current_customer.caption);
    this.current_headline = headlineCaption;
    this.current_headline_state.next(this.current_headline.length > 0 ? this.current_headline : '');
  }

  getCurrentHeadlineObservable() {
    return this.current_headline_state.asObservable();
  }

}
