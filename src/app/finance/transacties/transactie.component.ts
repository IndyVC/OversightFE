import { Component, OnInit } from '@angular/core';
import { MockService } from 'src/app/mock.service';
import { User } from 'src/app/domain/user';
import { Transaction } from 'src/app/domain/transaction';
import { Outcome } from 'src/app/domain/outcome';
import { Category } from 'src/app/domain/category';
import { DateAdapter } from '@angular/material';
import { HostListener } from '@angular/core';

@Component({
  selector: 'app-transactie',
  templateUrl: './transactie.component.html',
  styleUrls: ['./transactie.component.css']
})
export class TransactieComponent implements OnInit {
  public user: User;
  public transactions: Transaction[];
  public categories: Category[];
  public incomeActive = true;
  public piechartActive = false;
  public error = '';
  public date: Date;
  public chartType = 'bar';
  public barChartLegend = true;
  public barChartLabels;
  public barChartData;
  public barChartOptions = {
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
  public chartTypeP = 'pie';
  public barChartLegendP = true;
  public barChartLabelsP;
  public barChartDataP;
  public barChartOptionsP = {
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
  public screenHeight: any;
  public screenWidth: any;
  @HostListener('window:resize', ['$event'])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
  // tslint:disable-next-line: variable-name
  constructor(private _mock: MockService, private _adapter: DateAdapter<any>) {
    console.log(this._mock.getIndy());
    this.user = this._mock.getIndy();
    this.transactions = this.user.getAllIncomes();
    this.categories = null;
    this._adapter.setLocale('nl');
    this.onResize();
  }

  ngOnInit() {
    this.fillGraph(this.getTransactions(), 'Alle inkomsten');
    this.fillPie(this.getTransactions(), 'Totale vergelijking');
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
  }

  getUser(): User {
    return this.user;
  }

  getTransactions() {
    return this.transactions;
  }

  fillGraph(transactions: Transaction[], newLabel: string) {
    this.barChartLabels = transactions.map(trans =>
      trans.date.toLocaleDateString()
    );
    this.barChartData = [
      {
        data: transactions.map(trans => trans.amount),
        label: newLabel
      }
    ];
  }
  fillPie(transactions: Transaction[], newLabel: string) {
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

    this.barChartLabelsP = Array.from(categories.values());
    this.barChartDataP = [
      {
        data: amounts,
        label: newLabel
      }
    ];
  }

  getOutcomes() {
    if (this.categories == null && this.date == null) {
      this.transactions = this.user.getAllOutcomes();
    } else if (this.categories == null && this.date) {
      this.transactions = this.user
        .getAllOutcomes()
        .filter(outcome => outcome.date >= this.date);
    } else if (this.categories[0] != null && this.date) {
      this.transactions = this.user
        .getAllOutcomes()
        .filter(
          outcome =>
            this.categories
              .map(cat => cat.name)
              .includes(outcome.category.name) && outcome.date >= this.date
        );
    } else if (this.categories[0] != null && this.date == null) {
      this.transactions = this.user.getAllOutcomes().filter(outcome => {
        return this.categories
          .map(cat => cat.name)
          .includes(outcome.category.name);
      });
    }
    this.transactions.length === 0
      ? (this.error = 'Er zijn geen transacties voor deze opties')
      : (this.error = '');
    this.fillGraph(this.getTransactions(), 'Alle inkomsten');
    this.fillPie(this.getTransactions(), 'Per categorie');
  }

  getIncomes() {
    if (this.categories == null && this.date == null) {
      this.transactions = this.user.getAllIncomes();
    } else if (this.categories == null && this.date) {
      this.transactions = this.user
        .getAllIncomes()
        .filter(income => income.date >= this.date);
    } else if (this.categories[0] != null && this.date) {
      this.transactions = this.user
        .getAllIncomes()
        .filter(
          income =>
            this.categories
              .map(cat => cat.name)
              .includes(income.category.name) && income.date >= this.date
        );
    } else if (this.categories[0] != null && this.date == null) {
      this.transactions = this.user.getAllIncomes().filter(income => {
        return this.categories
          .map(cat => cat.name)
          .includes(income.category.name);
      });
    }
    this.transactions.length === 0
      ? (this.error = 'Er zijn geen transacties voor deze opties')
      : (this.error = '');
    this.fillGraph(this.getTransactions(), 'Alle inkomsten');
    this.fillPie(this.getTransactions(), 'Per categorie');
  }

  updateIncomeCategory(event: any) {
    console.log(event.value);
    if (
      Array.from(event.value).includes('all') ||
      event.value == null ||
      event.value == [] ||
      event.value.length == 0
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
    console.log(event.value);
    if (Array.from(event.value).includes('all') || event.value == null) {
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

  updateIncomeDate(event) {
    console.log(event.value);
    this.date = event.value;
    this.getIncomes();
  }
  updateOutcomeDate(event) {
    console.log(event.value);
    this.date = event.value;
    this.getOutcomes();
  }

  swipe() {
    this.piechartActive
      ? (this.piechartActive = false)
      : (this.piechartActive = true);
  }

  smallScreen() {
    return this.screenWidth < 1200;
  }
}
