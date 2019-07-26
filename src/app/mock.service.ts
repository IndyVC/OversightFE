import { Injectable } from '@angular/core';
import { Category } from './domain/category';
import { Outcome } from './domain/outcome';
import { Period } from './domain/period.enum';
import { Income } from './domain/income';
import { Goal } from './domain/goal';
import { Investment } from './domain/investment';
import { Loan } from './domain/loan';
import { User } from './domain/user';
import { BankAccount } from './domain/account';

@Injectable({
  providedIn: 'root'
})
export class MockService {
  constructor() {}

  public getIndy() {
    var account = new BankAccount(
      'BE90 1504 2153 1205',
      103.4,
      'BPN Paribas',
      'overzicht'
    );
    var cat1 = new Category(
      0,
      'Verhuur',
      'account_balance',
      '#36A2EB',
      'income'
    );
    var cat2 = new Category(
      1,
      'Tanken',
      'account_balance',
      '#36A2EB',
      'outcome'
    );
    var cat4 = new Category(
      1,
      'Winkel',
      'account_balance',
      '#36A2EB',
      'outcome'
    );
    var cat3 = new Category(
      500,
      'Loon',
      'account_balance',
      '#36A2EB',
      'income'
    );
    var trans1 = new Outcome(
      2,
      'Tanken1',
      60,
      new Date(),
      cat2,
      Period.DAILY,
      account
    );
    var trans2 = new Outcome(
      3,
      'Tanken2',
      150,
      new Date('07-28-2019  00:03:44'),
      cat2,
      Period.DAILY,
      account
    );
    var trans3 = new Outcome(
      4,
      'Tanken3',
      50.2,
      new Date('07-29-2019  00:03:44'),
      cat2,
      Period.DAILY,
      account
    );

    var trans4 = new Income(
      5,
      'Loon1',
      78.4,
      new Date('07-30-2019  00:03:44'),
      cat3,
      Period.MONTHLY,
      account
    );
    var trans5 = new Income(
      5,
      'Loon2',
      200,
      new Date('07-31-2019  00:03:44'),
      cat3,
      Period.MONTHLY,
      account
    );
    var trans6 = new Income(
      16,
      'Loon3',
      200,
      new Date('07-29-2019  00:03:44'),
      cat1,
      Period.MONTHLY,
      account
    );
    var trans7 = new Income(
      5,
      'Loon4',
      200,
      new Date('07-25-2019  00:03:44'),
      cat1,
      Period.MONTHLY,
      account
    );
    var trans8 = new Income(
      5,
      'Loon5',
      200,
      new Date('07-24-2019  00:03:44'),
      cat3,
      Period.MONTHLY,
      account
    );
    var trans9 = new Income(
      5,
      'Loon6',
      200,
      new Date('07-23-2019  00:03:44'),
      cat3,
      Period.MONTHLY,
      account
    );
    var trans10 = new Outcome(
      4,
      'Winkel1',
      50.2,
      new Date('07-30-2019  00:03:44'),
      cat4,
      Period.DAILY,
      account
    );
    var trans11 = new Outcome(
      4,
      'Winkel2',
      50.2,
      new Date('07-31-2019  00:03:44'),
      cat4,
      Period.DAILY,
      account
    );
    var trans12 = new Outcome(
      4,
      'Winkel3',
      50.2,
      new Date('08-01-2019  00:03:44'),
      cat4,
      Period.DAILY,
      account
    );

    var goal1 = new Goal(
      15648,
      'Auto',
      'Goal voor een nieuwe auto.',
      20000,
      0,
      new Date()
    );
    var goal2 = new Goal(
      15648,
      'Huis',
      'Goal voor een nieuw huis.',
      230000,
      10000,
      new Date()
    );

    var investment1 = new Investment(
      6169,
      'ABinbev',
      500,
      500,
      new Date(),
      null
    );
    var loan1 = new Loan(
      568741,
      'Huis',
      230000,
      10000,
      500,
      new Date(),
      new Date('15/05/2050'),
      'Kwil een niev uiske',
      Period.MONTHLY,
      null
    );

    var INDY = new User(
      100,
      'Indy',
      'Van Canegem',
      'indyvancanegem@hotmail.com',
      true,
      [account],
      [
        trans1,
        trans2,
        trans3,
        trans4,
        trans5,
        trans6,
        trans7,
        trans8,
        trans9,
        trans10,
        trans11,
        trans12
      ],
      [cat1, cat2, cat3, cat4],
      [goal1, goal2],
      [investment1],
      [loan1]
    );
    return INDY;
  }
}
