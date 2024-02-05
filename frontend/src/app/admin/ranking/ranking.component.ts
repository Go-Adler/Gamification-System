import { Component, Inject, LOCALE_ID, OnInit } from '@angular/core';
import { FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import {
  MatDatepicker,
  MatDatepickerModule,
} from '@angular/material/datepicker';
import { MatInputModule } from '@angular/material/input';
import { MatFormFieldModule } from '@angular/material/form-field';
import {
  MatMomentDateModule,
  provideMomentDateAdapter,
} from '@angular/material-moment-adapter';
import * as _moment from 'moment';
import { default as _rollupMoment, Moment } from 'moment';
import { CapitalizePipe } from '../../shared/firstUpper.pipe';
import { TaskService } from '../task.service';
import { Ranking } from '../../shared/interfaces';
import { MatCardModule } from '@angular/material/card';
import { CommonModule } from '@angular/common';
import { formatDate } from '@angular/common';
import {
  MomentDateAdapter,
  MAT_MOMENT_DATE_ADAPTER_OPTIONS,
} from '@angular/material-moment-adapter';
import {
  DateAdapter,
  MAT_DATE_FORMATS,
  MAT_DATE_LOCALE,
} from '@angular/material/core';

export const MY_FORMATS = {
  parse: {
    dateInput: 'MM/YYYY',
  },
  display: {
    dateInput: 'MM/YYYY',
    monthYearLabel: 'MMM YYYY',
    dateA11yLabel: 'LL',
    monthYearA11yLabel: 'MMMM YYYY',
  },
};

const moment = _rollupMoment || _moment;

@Component({
  selector: 'app-ranking',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatDatepickerModule,
    FormsModule,
    ReactiveFormsModule,
    CapitalizePipe,
    MatMomentDateModule,
    CommonModule,
  ],
  templateUrl: './ranking.component.html',
  styleUrls: ['./ranking.component.scss'],
  providers: [
    {
      provide: DateAdapter,
      useClass: MomentDateAdapter,
      deps: [MAT_DATE_LOCALE, MAT_MOMENT_DATE_ADAPTER_OPTIONS],
    },

    { provide: MAT_DATE_FORMATS, useValue: MY_FORMATS },
  ],
})
export class RankingComponent implements OnInit {
  ranking: Ranking[] = [];
  date = new FormControl(moment());
  month!: number;
  year!: number;

  constructor(
    @Inject(LOCALE_ID) private locale: string,
    private taskService: TaskService
  ) {}

  ngOnInit() {
    let datee = new Date();
    this.month = datee.getMonth() + 1;

    this.year = datee.getFullYear();

    this.taskService.getRanking(this.month, this.year).subscribe({
      next: (res) => {
        console.log(res.ranking);

        this.ranking = [...this.ranking, ...res.ranking];
      },
    });
    this.setCurrentDate();
  }

  setCurrentDate() {
    this.date.setValue(moment());
  }

  setMonthAndYear(
    normalizedMonthAndYear: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value ?? moment();
    ctrlValue.month(normalizedMonthAndYear.month());
    ctrlValue.year(normalizedMonthAndYear.year());
    this.date.setValue(ctrlValue);
    datepicker.close();
  }

  chosenYearHandler(normalizedYear: Moment) {
    const ctrlValue = this.date.value;
    const selectedYear = normalizedYear.year();
    this.date.setValue(ctrlValue);
    this.year = selectedYear
  }

  chosenMonthHandler(
    normalizedMonth: Moment,
    datepicker: MatDatepicker<Moment>
  ) {
    const ctrlValue = this.date.value;
    const selectedMonth = normalizedMonth.month();
    ctrlValue?.month(selectedMonth);
    this.date.setValue(ctrlValue);
    this.month = selectedMonth + 1
    datepicker.close();
    this.taskService.getRanking(this.month, this.year).subscribe({
      next: (res) => {
        console.log(res.ranking);

        this.ranking = [...res.ranking];
      },
    });
  }
}
