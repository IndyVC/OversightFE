import { Component, OnInit } from '@angular/core';
import { MockService } from 'src/app/mock.service';
import { User } from 'src/app/domain/user';
import { Transaction } from 'src/app/domain/transaction';
import { Outcome } from 'src/app/domain/outcome';
import { Category } from 'src/app/domain/category';

@Component({
  selector: 'app-transactie',
  templateUrl: './transactie.component.html',
  styleUrls: ['./transactie.component.css']
})
export class TransactieComponent implements OnInit {
  public user: User;
  public transactions: Transaction[];
  public category: Category;
  public incomeActive: boolean = true;
  public error: string = '';
  public date: Date;
  public chartType = 'bar';
  public barChartLegend = true;
  public barChartLabels;
  public barChartData;
  public barChartOptions = {
    scaleShowVerticalLines: false,
    responsive: true,
    scales: {
      yAxes: [
        {
          ticks: { suggestedMin: 0 }
        }
      ]
    }
  };

  constructor(private _mock: MockService) {
    console.log(this._mock.getIndy());
    this.user = this._mock.getIndy();
    this.transactions = this.user.getAllIncomes();
    this.category = null;
  }

  ngOnInit() {
    this.fillGraph(this.getTransactions(), 'Alle inkomsten');
    console.log(this.user.getIncomeCategories());
  }

  switch(tab1, tab2) {
    tab1.style.color = '#1F387E';
    tab1.style.borderColor = '#1F387E';

    tab2.style.color = '#E8E8E7';
    tab2.style.borderColor = '#E8E8E7';
    this.incomeActive
      ? (this.incomeActive = false)
      : (this.incomeActive = true);
    this.category = null;
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

  getOutcomes() {
    if (this.category == null) {
      this.transactions = this.user.getAllOutcomes();
    } else {
      this.transactions = this.user
        .getAllOutcomes()
        .filter(outcome => outcome.category.name === this.category.name);
    }
    this.transactions.length === 0
      ? (this.error = 'Er zijn geen transacties voor deze opties')
      : (this.error = '');
    this.fillGraph(this.getTransactions(), 'Alle uitkomsten');
  }

  getIncomes() {
    if (this.category == null) {
      this.transactions = this.user.getAllIncomes();
    } else {
      this.transactions = this.user
        .getAllIncomes()
        .filter(income => income.category.name === this.category.name);
    }
    this.transactions.length === 0
      ? (this.error = 'Er zijn geen transacties voor deze opties')
      : (this.error = '');
    this.fillGraph(this.getTransactions(), 'Alle inkomsten');
  }

  updateIncomeCategory(event: any) {
    console.log(event.value);
    event.value !== 'all'
      ? (this.category = this.user.getCategoryByName(event.value))
      : (this.category = null);
    this.getIncomes();
  }
  updateOutcomeCategory(event: any) {
    console.log(event.value);
    event.value !== 'all'
      ? (this.category = this.user.getCategoryByName(event.value))
      : (this.category = null);
    this.getOutcomes();
  }
}
