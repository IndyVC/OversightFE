import { Injectable } from '@angular/core';
import { Category } from './domain/category';
import { Outcome } from './domain/outcome';
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
      '#F6800D',
      'outcome'
    );
    var cat3 = new Category(
      500,
      'Loon',
      'account_balance',
      '#F6800D',
      'income'
    );
    var trans1 = new Outcome('Tanken1', 60, new Date(), cat2, account);
    var trans2 = new Outcome(
      'Tanken2',
      150,
      new Date('07-28-2019  00:03:44'),
      cat2,
      account
    );
    var trans3 = new Outcome(
      'Tanken3',
      50.2,
      new Date('07-29-2019  00:03:44'),
      cat2,
      account
    );

    var trans4 = new Income(
      'Loon1',
      78.4,
      new Date('07-30-2019  00:03:44'),
      cat3,
      account
    );
    var trans5 = new Income(
      'Loon2',
      120,
      new Date('07-31-2019  00:03:44'),
      cat3,
      account
    );
    var trans6 = new Income(
      'Loon3',
      140,
      new Date('07-29-2019  00:03:44'),
      cat1,
      account
    );
    var trans7 = new Income(
      'Loon4',
      178,
      new Date('07-25-2019  00:03:44'),
      cat1,
      account
    );
    var trans8 = new Income(
      'Loon5',
      350,
      new Date('07-24-2019  00:03:44'),
      cat3,
      account
    );
    var trans9 = new Income(
      'Loon6',
      168,
      new Date('07-23-2019  00:03:44'),
      cat3,
      account
    );
    var trans10 = new Outcome(
      'Winkel1',
      38,
      new Date('07-30-2019  00:03:44'),
      cat4,
      account
    );
    var trans11 = new Outcome(
      'Winkel2',
      50.2,
      new Date('07-31-2019  00:03:44'),
      cat4,
      account
    );
    var trans12 = new Outcome(
      'Winkel3',
      42.7,
      new Date('08-01-2019  00:03:44'),
      cat4,
      account
    );
    var ex1 = new Outcome(
      'Tanken',
      150,
      new Date('09-20-2019  00:03:44'),
      cat2,
      account
    );
    var ex2 = new Outcome(
      'Tanken',
      878,
      new Date('09-25-2019  00:03:44'),
      cat2,
      account
    );
    var ex3 = new Outcome(
      'Tanken',
      186,
      new Date('10-25-2019  00:03:44'),
      cat2,
      account
    );
    var ex4 = new Outcome(
      'Tanken',
      584,
      new Date('04-25-2019  00:03:44'),
      cat2,
      account
    );
    var ex5 = new Outcome(
      'Tanken',
      813,
      new Date('03-25-2019  00:03:44'),
      cat2,
      account
    );
    var ex6 = new Outcome(
      'Tanken',
      483,
      new Date('02-25-2019  00:03:44'),
      cat2,
      account
    );
    var ex7 = new Outcome(
      'Tanken',
      1056,
      new Date('01-25-2019  00:03:44'),
      cat2,
      account
    );
    var ex8 = new Outcome(
      'Tanken',
      236,
      new Date('12-25-2019  00:03:44'),
      cat2,
      account
    );
    var ex9 = new Outcome(
      'Tanken',
      105,
      new Date('11-25-2019  00:03:44'),
      cat2,
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
      'monthly',
      null
    );

    var INDY = new User(
      'Indy',
      'Van Canegem',
      'indyvancanegem@hotmail.com',
      true,
      '1234',
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
        trans12,
        ex1,
        ex2,
        ex3,
        ex4,
        ex5,
        ex6,
        ex7,
        ex8,
        ex9
      ],
      [cat1, cat2, cat3, cat4],
      [goal1, goal2],
      [investment1],
      [loan1]
    );
    return INDY;
  }
}
