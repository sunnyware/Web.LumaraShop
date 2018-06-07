import { Component, OnInit } from '@angular/core';
import {LumaraService} from '../../service/lumara_service';
import {LumaraFormGroup} from '../../models/forms';
import {HttpClient} from '@angular/common/http';

@Component({
  selector: 'app-forms',
  templateUrl: './forms.component.html',
  styles: []
})
export class FormsComponent implements OnInit {
  forms: LumaraFormGroup[];

  constructor(private lumaraService: LumaraService, private http: HttpClient) {
    lumaraService.setHeadline('Formulare');
  }

  ngOnInit() {
    this.reloadForms();
  }

  reloadForms() {
    this.http.get(this.lumaraService.url_zentrale_min + '/forms/forms.json').subscribe(data => {
      console.log(data);
      // this.forms = data;
    });
  }
}
