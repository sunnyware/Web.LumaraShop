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
    // Test
  }

  reloadForms() {
    const url = 'https://portal.lumara.de/forms/forms.json';
    // const url = 'http://localhost:8990/forms/forms.json';
    this.http.get<LumaraFormGroup[]>(url).subscribe(data => {
      // console.log(data);
      this.forms = data;
    });
  }
}
