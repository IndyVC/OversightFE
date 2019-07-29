import { Component, OnInit, ViewChild } from '@angular/core';
import { MockService } from 'src/app/mock.service';
import { User } from 'src/app/domain/user';
import { Transaction } from 'src/app/domain/transaction';
import { Outcome } from 'src/app/domain/outcome';
import { Category } from 'src/app/domain/category';
import {
  DateAdapter,
  MatDialog,
  MatDialogConfig,
  MatDatepicker,
  NativeDateAdapter
} from '@angular/material';
import { HostListener } from '@angular/core';
import { NewTransactionComponent } from '../dialogs/new-transaction/new-transaction.component';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import * as _moment from 'moment';
import { default as _rollupMoment } from 'moment';

const moment = _rollupMoment || _moment;

class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    var formatString = 'MMMM YYYY';
    return moment(date).format(formatString);
  }
}

@Component({
  selector: 'app-transactie',
  templateUrl: './transactie.component.html',
  styleUrls: ['./transactie.component.css']
})
export class TransactieComponent implements OnInit {
  @ViewChild(MatDatepicker, null) picker;
  public user: User;
  public transactions: Transaction[];
  public categories: Category[];
  public date = new FormControl();
  public incomeActive = true;
  public chartActive = 0;
  public error = '';
  public chart1Type = 'bar';
  public chart1Legend = true;
  public chart1Labels;
  public chart1Data;
  public chart1Options = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [
        {
          ticks: { suggestedMin: 0 }
        }
      ]
    }
  };
  public chart2Type = 'pie';
  public chart2Legend = true;
  public chart2Labels;
  public chart2Data;
  public chart2Options = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      xAxes: [
        {
          gridLines: {
            drawOnChartArea: false,
            display: false
          },
          display: false
        }
      ],
      yAxes: [
        {
          ticks: { suggestedMin: 0 },
          gridLines: {
            drawOnChartArea: false,
            display: false
          },
          display: false
        }
      ]
    }
  };
  public chart3Type = 'bar';
  public chart3Legend = true;
  public chart3Labels;
  public chart3Data;
  public chart3Options = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [
        {
          ticks: { suggestedMin: 0 }
        }
      ]
    }
  };
  public chart4Type = 'line';
  public chart4Legend = true;
  public chart4Labels;
  public chart4Data;
  public chart4Options = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: true,
    scales: {
      yAxes: [
        {
          ticks: { suggestedMin: 0 }
        }
      ]
    }
  };
  public chartColors: Array<any> = [
    {
      // first color
      backgroundColor: 'rgba(225,10,24,0.2)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    },
    {
      // second color
      backgroundColor: 'rgba(225,10,24,0.2)',
      borderColor: 'rgba(225,10,24,0.2)',
      pointBackgroundColor: 'rgba(225,10,24,0.2)',
      pointBorderColor: '#fff',
      pointHoverBackgroundColor: '#fff',
      pointHoverBorderColor: 'rgba(225,10,24,0.2)'
    }
  ];
  public screenHeight: any;
  public screenWidth: any;

  // tslint:disable-next-line: variable-name
  constructor(
    private _mock: MockService,
    private _adapter: DateAdapter<any>,
    private dialog: MatDialog
  ) {
    console.log(this._mock.getIndy());
    this.user = this._mock.getIndy();
    this.transactions = this.user.getIncomesFromMonth(new Date());
    this.categories = null;
    this._adapter.setLocale('nl');
    this.onResize();
  }

  ngOnInit() {
    this.fillGraph1(this.getTransactions(), 'Alle inkomsten');
    this.fillGraph2(this.getTransactions(), 'Totale vergelijking');
    this.fillGraph3(new Date());
    this.fillGraph4(new Date());
  }

  openDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(NewTransactionComponent, dialogConfig);
    dialogRef.afterClosed().subscribe(data => console.log(data));
  }

  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }

  switch(tab1, tab2) {
    tab1.style.color = '#1F387E';
    tab1.style.borderColor = '#1F387E';

    tab2.style.color = '#E8E8E7';
    tab2.style.borderColor = '#E8E8E7';
    this.incomeActive
      ? (this.incomeActive = false)
      : (this.incomeActive = true);
    this.categories = null;
    this.date.setValue(null);
    this.fillGraph3(new Date(this.date.value));
  }

  getUser(): User {
    return this.user;
  }

  getTransactions() {
    return this.transactions;
  }

  fillGraph1(transactions: Transaction[], newLabel: string) {
    let gt28 = false;
    const amounts = [0, 0, 0, 0, 0];
    transactions.forEach(trans => {
      if (trans.date.getDate() > 28) {
        gt28 = true;
      }
    });
    this.chart1Labels = gt28
      ? ['Week 1', 'Week 2', ' Week 3', 'Week 4', 'Week 5']
      : ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    transactions.forEach(trans => {
      const nrDay = trans.date.getDate();
      if (nrDay <= 7) {
        amounts[0] += trans.amount;
      } else if (nrDay > 7 && nrDay <= 14) {
        amounts[1] += trans.amount;
      } else if (nrDay > 14 && nrDay <= 21) {
        amounts[2] += trans.amount;
      } else if (nrDay > 21 && nrDay <= 28) {
        amounts[3] += trans.amount;
      } else if (nrDay > 28) {
        amounts[4] += trans.amount;
      }
    });
    this.chart1Data = [
      {
        data: amounts,
        label: newLabel
      }
    ];
  }
  fillGraph2(transactions: Transaction[], newLabel: string) {
    const categories = new Set<string>();
    const amounts = [];

    transactions.map(trans => categories.add(trans.category.name));

    Array.from(categories.values()).forEach(cat => {
      amounts.push(
        transactions
          .filter(trans => trans.category.name === cat)
          .map(trans => trans.amount)
          .reduce((sum, current) => {
            return sum + current;
          }, 0)
      );
    });

    this.chart2Labels = Array.from(categories.values());
    this.chart2Data = [
      {
        data: amounts,
        label: newLabel
      }
    ];
  }
  fillGraph3(date: Date) {
    let newDate: Date = new Date();
    if (date.getFullYear() !== 1970) {
      newDate = date;
    }
    let gt28 = false;
    const incomes = [0, 0, 0, 0, 0];
    const outcomes = [0, 0, 0, 0, 0];
    this.user.getIncomesFromMonth(newDate).forEach(trans => {
      if (trans.date.getDate() > 28) {
        gt28 = true;
      }
    });
    this.chart3Labels = gt28
      ? ['Week 1', 'Week 2', ' Week 3', 'Week 4', 'Week 5']
      : ['Week 1', 'Week 2', 'Week 3', 'Week 4'];
    this.user.getIncomesFromMonth(newDate).forEach(trans => {
      const nrDay = trans.date.getDate();
      if (nrDay <= 7) {
        incomes[0] += trans.amount;
      } else if (nrDay > 7 && nrDay <= 14) {
        incomes[1] += trans.amount;
      } else if (nrDay > 14 && nrDay <= 21) {
        incomes[2] += trans.amount;
      } else if (nrDay > 21 && nrDay <= 28) {
        incomes[3] += trans.amount;
      } else if (nrDay > 28) {
        incomes[4] += trans.amount;
      }
    });
    this.user.getOutcomesFromMonth(newDate).forEach(trans => {
      const nrDay = trans.date.getDate();
      if (nrDay <= 7) {
        outcomes[0] -= trans.amount;
      } else if (nrDay > 7 && nrDay <= 14) {
        outcomes[1] -= trans.amount;
      } else if (nrDay > 14 && nrDay <= 21) {
        outcomes[2] -= trans.amount;
      } else if (nrDay > 21 && nrDay <= 28) {
        outcomes[3] -= trans.amount;
      } else if (nrDay > 28) {
        outcomes[4] -= trans.amount;
      }
    });
    this.chart3Data = [
      {
        data: incomes,
        label: 'Inkomen'
      },
      {
        data: outcomes,
        label: 'Uitgaven'
      }
    ];
  }
  fillGraph4(date: Date) {
    let newDate: Date = new Date();
    if (date.getFullYear() !== 1970) {
      newDate = date;
    }
    const incomes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    const outcomes = [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0];
    this.chart4Labels = [
      'Januari',
      'Februari',
      'Maart',
      'April',
      'Mei',
      'Juni',
      'Juli',
      'Augustus',
      'September',
      'Oktober',
      'November',
      'December'
    ];
    this.user.getIncomesFromYear(newDate).forEach(trans => {
      const nrMonth = trans.date.getMonth();
      incomes[nrMonth] += trans.amount;
    });
    this.user.getOutcomesFromYear(newDate).forEach(trans => {
      const nrMonth = trans.date.getMonth();
      outcomes[nrMonth] += trans.amount;
    });
    this.chart4Data = [
      {
        data: incomes,
        label: 'Inkomen'
      },
      {
        data: outcomes,
        label: 'Uitgaven'
      }
    ];
  }

  getOutcomes() {
    if (this.categories == null && this.date.value == null) {
      this.transactions = this.user.getOutcomesFromMonth(new Date());
    } else if (this.categories == null && this.date) {
      this.transactions = this.user.getOutcomesFromMonth(
        new Date(this.date.value)
      );
    } else if (this.categories[0] != null && this.date.value) {
      this.transactions = this.user
        .getOutcomesFromMonth(new Date(this.date.value))
        .filter(outcome =>
          this.categories.map(cat => cat.name).includes(outcome.category.name)
        );
    } else if (this.categories[0] != null && this.date.value == null) {
      this.transactions = this.user
        .getOutcomesFromMonth(new Date())
        .filter(outcome => {
          return this.categories
            .map(cat => cat.name)
            .includes(outcome.category.name);
        });
    }
    this.transactions.length === 0
      ? (this.error = 'Er zijn geen transacties voor deze opties')
      : (this.error = '');
    this.fillGraph1(this.getTransactions(), 'Totaal uitgaven');
    this.fillGraph2(this.getTransactions(), 'Per categorie');
    this.fillGraph3(new Date(this.date.value));
  }

  getIncomes() {
    if (this.categories == null && this.date.value == null) {
      this.transactions = this.user.getIncomesFromMonth(new Date());
    } else if (this.categories == null && this.date) {
      this.transactions = this.user.getIncomesFromMonth(
        new Date(this.date.value)
      );
    } else if (this.categories[0] != null && this.date.value) {
      this.transactions = this.user
        .getIncomesFromMonth(new Date(this.date.value))
        .filter(income =>
          this.categories.map(cat => cat.name).includes(income.category.name)
        );
    } else if (this.categories[0] != null && this.date.value == null) {
      this.transactions = this.user
        .getIncomesFromMonth(new Date())
        .filter(income => {
          return this.categories
            .map(cat => cat.name)
            .includes(income.category.name);
        });
    }
    this.transactions.length === 0
      ? (this.error = 'Er zijn geen transacties voor deze opties')
      : (this.error = '');
    this.fillGraph1(this.getTransactions(), 'Alle inkomsten');
    this.fillGraph2(this.getTransactions(), 'Per categorie');
    this.fillGraph3(new Date(this.date.value));
  }

  updateIncomeCategory(event: any) {
    if (
      Array.from(event.value).includes('all') ||
      event.value == null ||
      event.value === [] ||
      event.value.length === 0
    ) {
      this.categories = null;
    } else {
      const cats: Category[] = [];
      // tslint:disable-next-line: forin
      for (const index in event.value) {
        const name = event.value[index];
        cats.push(this.user.getCategoryByName(name));
      }
      this.categories = cats;
    }
    this.getIncomes();
  }
  updateOutcomeCategory(event: any) {
    if (
      Array.from(event.value).includes('all') ||
      event.value == null ||
      event.value === [] ||
      event.value.length === 0
    ) {
      this.categories = null;
    } else {
      const cats: Category[] = [];
      // tslint:disable-next-line: forin
      for (const index in event.value) {
        const name = event.value[index];
        cats.push(this.user.getCategoryByName(name));
      }
      this.categories = cats;
    }
    this.getOutcomes();
  }

  updateIncomeDate(params) {
    this.date.setValue(params);
    this.picker.close();
    this.getIncomes();
  }
  updateOutcomeDate(params) {
    this.date.setValue(params);
    this.picker.close();
    this.getOutcomes();
  }

  swipe() {
    this.chartActive = (this.chartActive + 1) % 4;
  }
  clearOptionsIncome() {
    this.date.setValue(null);
    this.categories = null;
    this.getIncomes();
  }
  clearOptionsOutcome() {
    this.date.setValue(null);
    this.categories = null;
    this.getOutcomes();
  }

  smallScreen() {
    return this.screenWidth < 1200;
  }

  noError() {
    return this.error == null || this.error === '';
  }
}
