import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import * as moment from 'moment';

@Component({
  selector: 'app-date-range-picker',
  templateUrl: './date-range-picker-custom.component.html',
  styleUrls: ['./date-range-picker-custom.component.scss']
})
export class DateRangePickerCustomComponent implements OnInit {
  public daterange: any = {};
  @Output() dateSelected = new EventEmitter<any>();

  // see original project for full list of options
  // can also be setup using the config service to apply to multiple pickers
  public options: any = {
    locale: { format: 'YYYY-MM-DD' },
    alwaysShowCalendars: true,
    startDate: moment().format('YYYY-MM-DD'),
    endDate: moment().format('YYYY-MM-DD'),
    ranges: {
      'Today': [moment(), moment()],
      'Yesterday': [moment().subtract(1, 'days'), moment().subtract(1, 'days')],
      'This week': [moment().startOf('week'), moment()],
      'Last week': [moment().subtract(1, 'week').startOf('week'), moment().subtract(1, 'week').endOf('week')],
      'Last 7 Days': [moment().subtract(6, 'days'), moment()],
      'Last 30 Days': [moment().subtract(29, 'days'), moment()],
      'This Month': [moment().startOf('month'), moment().endOf('month')],
      'Last Month': [moment().subtract(1, 'month').startOf('month'), moment().subtract(1, 'month').endOf('month')],
      'Last Year': [moment().subtract(1, 'year').set('month', 0).startOf('month'), moment().subtract(1, 'year').set('month', 11).endOf('month')],
      'This Year': [moment().set('month', 0).startOf('month'), moment()]
    }
  };

  constructor() {

  }

  ngOnInit() {
    this.dateSelected.emit(moment().format('YYYY-MM-DD') + "-" + moment().format('YYYY-MM-DD'));
  }

  public selectedDate(value: any, datepicker?: any) {
    // this is the date the iser selected

    // any object can be passed to the selected event and it will be passed back here
    datepicker.start = value.start;
    datepicker.end = value.end;

    // or manupulat your own internal property
    this.daterange.start = value.start;
    this.daterange.end = value.end;
    this.daterange.label = value.label;

    this.dateSelected.emit(this.daterange.start + "-" + this.daterange.end);
  }
}
