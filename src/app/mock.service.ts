import { Injectable } from "@angular/core";
import { Category } from "./domain/category";
import { Outcome } from "./domain/outcome";
import { Income } from "./domain/income";
import { Goal } from "./domain/goal";
import { Investment } from "./domain/investment";
import { Loan } from "./domain/loan";
import { User } from "./domain/user";
import { BankAccount } from "./domain/account";

@Injectable({
  providedIn: "root"
})
export class MockService {
  constructor() {}

  public getIndy() {
    var account = new BankAccount(
      "BE90 1504 2153 1205",
      103.4,
      "BPN Paribas",
      "overzicht"
    );
    var cat1 = new Category(0, "Verhuur", "house", "#2d3561", "income");

    var cat2 = new Category(1, "Loon", "account_balance", "#c05c7e", "income");

    var cat3 = new Category(
      69,
      "One-timers",
      "euro_symbol",
      "#CC8899",
      "income"
    );
    var cat4 = new Category(1, "Winkel", "shopping_cart", "#f3826f", "outcome");
    var cat5 = new Category(
      500,
      "Tanken",
      "local_gas_station",
      "#ffb961",
      "outcome"
    );
    var cat6 = new Category(
      500,
      "One-timers",
      "euro_symbol",
      "#6EC6CA",
      "outcome"
    );
    // var trans1 = new Outcome("Tanken1", 60, new Date(), cat1, account);
    // var trans2 = new Outcome(
    //   "Tanken2",
    //   150,
    //   new Date("07-28-2019  00:03:44"),
    //   cat2,
    //   account
    // );
    // var trans3 = new Outcome(
    //   "Tanken3",
    //   50.2,
    //   new Date("09-07-2019 00:03:44"),
    //   cat2,
    //   account
    // );

    // var trans4 = new Income(
    //   "Loon1",
    //   78.4,
    //   new Date("09-07-2019 00:03:44"),
    //   cat3,
    //   account
    // );
    // var trans7 = new Income(
    //   "Loon4",
    //   178,
    //   new Date("09-07-2019 00:03:44"),
    //   cat1,
    //   account
    // );
    // var trans8 = new Income(
    //   "Loon5",
    //   350,
    //   new Date("09-07-2019 00:03:44"),
    //   cat3,
    //   account
    // );
    // var trans9 = new Income(
    //   "Loon6",
    //   168,
    //   new Date("09-07-2019 00:03:44"),
    //   cat3,
    //   account
    // );
    // var trans10 = new Outcome(
    //   "Winkel1",
    //   38,
    //   new Date("09-07-2019 00:03:44"),
    //   cat4,
    //   account
    // );
    // var trans11 = new Outcome(
    //   "Winkel2",
    //   50.2,
    //   new Date("09-07-2019 00:03:44"),
    //   cat4,
    //   account
    // );
    // var trans12 = new Outcome(
    //   "Winkel3",
    //   42.7,
    //   new Date("09-07-2019 00:03:44"),
    //   cat4,
    //   account
    // );
    // var ex1 = new Outcome(
    //   "Tanken",
    //   150,
    //   new Date("09-07-2019 00:03:44"),
    //   cat2,
    //   account
    // );
    // var ex2 = new Outcome(
    //   "Tanken",
    //   878,
    //   new Date("09-07-2019 00:03:44"),
    //   cat2,
    //   account
    // );
    // var ex3 = new Outcome(
    //   "Tanken",
    //   186,
    //   new Date("09-07-2019 00:03:44"),
    //   cat2,
    //   account
    // );
    // var ex4 = new Outcome(
    //   "Tanken",
    //   584,
    //   new Date("09-07-2019 00:03:44"),
    //   cat2,
    //   account
    // );

    // var ex7 = new Outcome(
    //   "Tanken",
    //   1056,
    //   new Date("09-07-2019 00:03:44"),
    //   cat2,
    //   account
    // );
    // var ex8 = new Outcome(
    //   "Tanken",
    //   236,
    //   new Date("09-07-2019 00:03:44"),
    //   cat2,
    //   account
    // );
    // var ex9 = new Outcome(
    //   "Tanken",
    //   105,
    //   new Date("09-07-2019 00:03:44"),
    //   cat2,
    //   account
    // );

    var income1 = new Income(
      "Verhuur maand September",
      1640,
      new Date("01-01-2019 00:00:00"),
      cat1,
      account,
      6461
    );

    var income2 = new Income(
      "Loon September",
      1680,
      new Date("02-09-2019 00:00:00"),
      cat2,
      account,
      6462
    );
    var income3 = new Income(
      "Glenn moest mijn pizza nog!",
      1750,
      new Date("03-15-2019 00:00:00"),
      cat3,
      account,
      6463
    );
    var income4 = new Income(
      "20 euro op straat gevonden",
      1600,
      new Date("04-22-2019 00:00:00"),
      cat3,
      account,
      6464
    );
    var income5 = new Income(
      "20 euro op straat gevonden",
      1690,
      new Date("05-22-2019 00:00:00"),
      cat3,
      account,
      6464
    );
    var income6 = new Income(
      "20 euro op straat gevonden",
      1650,
      new Date("06-22-2019 00:00:00"),
      cat3,
      account,
      6464
    );
    var income7 = new Income(
      "20 euro op straat gevonden",
      1640,
      new Date("07-22-2019 00:00:00"),
      cat3,
      account,
      6464
    );
    var income8 = new Income(
      "20 euro op straat gevonden",
      1800,
      new Date("08-22-2019 00:00:00"),
      cat3,
      account,
      6464
    );
    var income9 = new Income(
      "20 euro op straat gevonden",
      1800,
      new Date("09-22-2019 00:00:00"),
      cat3,
      account,
      6464
    );
    var income10 = new Income(
      "20 euro op straat gevonden",
      1820,
      new Date("10-22-2019 00:00:00"),
      cat3,
      account,
      6464
    );
    var income11 = new Income(
      "20 euro op straat gevonden",
      1860,
      new Date("11-22-2019 00:00:00"),
      cat3,
      account,
      6464
    );
    var income12 = new Income(
      "20 euro op straat gevonden",
      1870,
      new Date("12-22-2019 00:00:00"),
      cat3,
      account,
      6464
    );
    var outcome1 = new Outcome(
      "Tanken week 2",
      240,
      new Date("01-08-2019 00:00:00"),
      cat5,
      account,
      6465
    );
    var outcome2 = new Outcome(
      "Pizza avond!",
     1200,
      new Date("02-09-2019 00:00:00"),
      cat4,
      account,
      6466
    );
    var outcome3 = new Outcome(
      "Pak desperados",
      945,
      new Date("03-10-2019 00:00:00"),
      cat4,
      account,
      6466
    );
    var outcome4 = new Outcome(
      "Cinema",
      564,
      new Date("04-12-2019 00:00:00"),
      cat6,
      account,
      6466
    );
    var outcome5 = new Outcome(
      "Flight",
      362,
      new Date("05-13-2019 00:00:00"),
      cat6,
      account,
      6466
    );
    var outcome6 = new Outcome(
      "fill",
      123,
      new Date("06-01-2019 00:00:00"),
      cat5,
      account,
      6465
    );
    var outcome7 = new Outcome(
      "fill",
     694,
      new Date("07-16-2019 00:00:00"),
      cat4,
      account,
      6465
    );
    var outcome8 = new Outcome(
      "fill",
      1240,
      new Date("08-23-2019 00:00:00"),
      cat4,
      account,
      6465
    );
    var outcome9 = new Outcome(
      "fill",
      1236,
      new Date("09-23-2019 00:00:00"),
      cat4,
      account,
      6465
    );
    var outcome10 = new Outcome(
      "fill",
     243,
      new Date("10-23-2019 00:00:00"),
      cat4,
      account,
      6465
    );
    var outcome11 = new Outcome(
      "fill",
      255,
      new Date("11-23-2019 00:00:00"),
      cat4,
      account,
      6465
    );
    var outcome12 = new Outcome(
      "fill",
      369,
      new Date("12-23-2019 00:00:00"),
      cat4,
      account,
      6465
    );
    var goal1 = new Goal(
      15648,
      "Auto",
      "Goal voor een nieuwe auto.",
      20000,
      0,
      new Date()
    );
    var goal2 = new Goal(
      15648,
      "Huis",
      "Goal voor een nieuw huis.",
      230000,
      10000,
      new Date()
    );

    var investment1 = new Investment(
      6169,
      "ABinbev",
      500,
      500,
      new Date(),
      null
    );
    var loan1 = new Loan(
      568741,
      "Huis",
      230000,
      10000,
      500,
      new Date(),
      new Date("15/05/2050"),
      "Kwil een niev uiske",
      "monthly",
      null
    );

    var INDY = new User(
      "Indy",
      "Van Canegem",
      "indyvancanegem@hotmail.com",
      true,
      [account],
      [
        // trans1,
        // trans2,
        // trans3,
        // trans4,
        // trans7,
        // trans8,
        // trans9,
        // trans10,
        // trans11,
        // trans12,
        // ex1,
        // ex2,
        // ex3,
        // ex4,
        // ex7,
        // ex8,
        // ex9,
        income1,
        income2,
        income3,
        income4,
        income5,
        income6,
        income7,
        income8,
        income9,
        income10,
        income11,
        income12,
        outcome1,
        outcome2,
        outcome3,
        outcome4,
        outcome5,
        outcome6,
        outcome7,
        outcome8,
        outcome9,
        outcome10,
        outcome11,
        outcome12
      ],
      [cat1, cat2, cat3, cat4, cat5, cat6],
      [goal1, goal2],
      [investment1],
      [loan1]
    );
    return INDY;
  }
}
