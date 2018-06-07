import {Component, OnInit} from '@angular/core';
import {LumaraService} from './service/lumara_service';
import {Router} from '@angular/router';
import {NgForm} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  username = '';
  password = '';
  autologin = false;

  constructor(private lumaraService: LumaraService, private router: Router) {
    lumaraService.setHeadline('');
    this.lumaraService.getIsAuthenticated().subscribe(
      authStatus => {
        if (authStatus) {
          this.router.navigate(['/news']);
        }
      }
    );
  }

  ngOnInit() {
    this.lumaraService.tryAutoLogin();
  }

  onSubmit(form: NgForm) {
    console.log(form.value);
    this.lumaraService.signinUser(form.value.username, form.value.password, form.value.autologin);
  }

}
