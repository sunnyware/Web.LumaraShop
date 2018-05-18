import {Component, OnInit} from '@angular/core';
import {BlogPost} from './models/blogpost';
import * as moment from 'moment';
import {ChartItemData} from './models/chartitemdata';
import { DxChartModule } from 'devextreme-angular';

@Component({
    selector: 'app-home',
    templateUrl: './home.component.html',
    styles: []
})

export class HomeComponent implements OnInit {


    umsaetze: ChartItemData[] = [{
        Label: 'KW1',
        Value: 2340
    }, {
        Label: 'KW2',
        Value: 1200
    },{
        Label: 'KW3',
        Value: 0
    },{
        Label: 'KW4',
        Value: 3100
    },{
        Label: 'KW5',
        Value: 1000
    },{
        Label: 'KW6',
        Value: 800
    },{
        Label: 'KW7',
        Value: 300
    },{
        Label: 'KW8',
        Value: 700
    },{
        Label: 'KW9',
        Value: 0
    }];

    constructor() {
    }

    ngOnInit() {
        moment.locale('de_DE');
    }

}
