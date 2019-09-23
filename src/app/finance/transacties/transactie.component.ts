import { Component, OnInit, ViewChild } from "@angular/core";
import { User } from "src/app/domain/user";
import { Transaction } from "src/app/domain/transaction";
import { Outcome } from "src/app/domain/outcome";
import { Category } from "src/app/domain/category";
import {
  DateAdapter,
  MatDialog,
  MatDialogConfig,
  MatDatepicker,
  NativeDateAdapter
} from "@angular/material";
import { HostListener } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import * as _moment from "moment";
import { default as _rollupMoment } from "moment";
import { UserService } from "src/app/services/user/user.service";
import { Income } from "src/app/domain/income";
import { TransactionService } from "src/app/services/transaction/transaction.service";
import { stringify } from "querystring";

const moment = _rollupMoment || _moment;

class CustomDateAdapter extends NativeDateAdapter {
  format(date: Date, displayFormat: Object): string {
    var formatString = "MMMM YYYY";
    return moment(date).format(formatString);
  }
}

@Component({
  selector: "app-transactie",
  templateUrl: "./transactie.component.html",
  styleUrls: ["./transactie.component.css"]
})
export class TransactieComponent implements OnInit {
  @ViewChild(MatDatepicker, null) picker;
  @ViewChild("tab1", null) tab1;
  @ViewChild("tab2", null) tab2;

  public user: User;
  public transactions: Transaction[] = [];
  public categories: Category[];
  public date = new FormControl();
  public form: FormGroup;
  public edit: FormGroup;
  public incomeActive = true;
  public chartActive = 0;
  public error = "";
  public showCreate: boolean = false;
  public showEdit = false;
  public showTransactionsList: boolean = true;

  public chart1Type = "bar";
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
  public chart2Type = "pie";
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
  public chart3Type = "bar";
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
  public chart4Type = "line";
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
      backgroundColor: "rgba(26,35,126,0.5)",
      borderColor: "rgba(26,35,126,1)",
      pointBackgroundColor: "rgba(26,35,126,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(26,35,126,0.2)"
    },
    {
      // second color
      backgroundColor: "rgba(242,125,10,0.6)",
      borderColor: "rgba(242,125,10,1)",
      pointBackgroundColor: "rgba(242,125,10,1)",
      pointBorderColor: "#fff",
      pointHoverBackgroundColor: "#fff",
      pointHoverBorderColor: "rgba(242,125,10,0.2)"
    }
  ];
  public pieColors: Array<any> = [];
  public screenHeight: any;
  public screenWidth: any;

  @HostListener("window:resize", ["$event"])
  onResize(event?) {
    this.screenHeight = window.innerHeight;
    this.screenWidth = window.innerWidth;
  }
  // tslint:disable-next-line: variable-name
  constructor(
    private adapter: DateAdapter<any>,
    private userService: UserService,
    private transactionService: TransactionService,
    private fb: FormBuilder
  ) {
    this.onResize();
  }

  ngOnInit() {
    this.user = this.userService.getUserObject();
    if (this.user) {
      this.getIncomes();
      console.log(this.user);
      this.categories = this.user.categories;
      if (this.transactions) {
        this.fillGraph1(this.getTransactions(), "Totaal inkomsten");
        this.fillGraph2(this.getTransactions(), "Totale vergelijking");
        this.fillGraph3(new Date());
        this.fillGraph4(new Date());
      }
    }

    this.adapter.setLocale("nl");
    this.form = this.fb.group({
      type: this.fb.control("", [Validators.required]),
      name: this.fb.control("", [Validators.required]),
      amount: this.fb.control("", [
        Validators.required,
        Validators.pattern("[0-9]{1,}(.|,[0-9]{1,})*")
      ]),
      date: this.fb.control(""),
      category: this.fb.control("", [Validators.required]),
      account: this.fb.control("", [Validators.required])
    });

    this.edit = this.fb.group({
      id: ["", [Validators.required]],
      type: this.fb.control("", [Validators.required]),
      name: this.fb.control("", [Validators.required]),
      amount: this.fb.control("", [
        Validators.required,
        Validators.pattern("[0-9]{1,}(.|,[0-9]{1,})*")
      ]),
      date: this.fb.control(""),
      category: this.fb.control("", [Validators.required]),
      account: this.fb.control("", [Validators.required])
    });
  }

  fillGraph1(transactions: Transaction[], newLabel: string) {
    let gt28 = false;
    const amounts = [0, 0, 0, 0, 0];
    if (this.user) {
      if (this.transactions) {
        transactions.forEach(trans => {
          if (trans.date.getDate() > 28) {
            gt28 = true;
          }
        });
        this.chart1Labels = gt28
          ? ["Week 1", "Week 2", " Week 3", "Week 4", "Week 5"]
          : ["Week 1", "Week 2", "Week 3", "Week 4"];
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
    }
  }
  fillGraph2(transactions: Transaction[], newLabel: string) {
    const categories = new Set<string>();
    const amounts = [];
    const colors = [];
    transactions.map(trans => categories.add(trans.category.name));

    Array.from(categories.values()).forEach(cat => {
      colors.push(this.user.getCategoryByName(cat).color);
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
    this.pieColors = [
      {
        backgroundColor: colors
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
      ? ["Week 1", "Week 2", " Week 3", "Week 4", "Week 5"]
      : ["Week 1", "Week 2", "Week 3", "Week 4"];
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
        label: "Inkomen"
      },
      {
        data: outcomes,
        label: "Uitgaven"
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
      "Januari",
      "Februari",
      "Maart",
      "April",
      "Mei",
      "Juni",
      "Juli",
      "Augustus",
      "September",
      "Oktober",
      "November",
      "December"
    ];
    if (this.user) {
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
          label: "Inkomen"
        },
        {
          data: outcomes,
          label: "Uitgaven"
        }
      ];
    }
  }

  onSubmit() {
    const type = this.form.get("type").value;
    const name = this.form.get("name").value;
    let amount: string = this.form.get("amount").value.toString();
    amount = amount.replace(",", ".");
    console.log(amount);

    const date = this.form.get("date").value;
    console.log("DATE VALUE RIGHT NOW: ", date);
    const category = this.form.get("category").value;
    console.log(category);
    const account = this.form.get("account").value;
    let transaction: Transaction;
    if (type === "inkomen") {
      transaction = new Income(name, parseFloat(amount), date, account);
      transaction.category = category;
      console.log("inkomen reached");
      this.transactionService.createIncome(transaction);
      this.user.incomes.push(transaction);
      this.getIncomes();
      this.resetForm();
    } else if (type === "uitgave") {
      transaction = new Outcome(name, parseFloat(amount), date, account);
      transaction.category = category;
      console.log("uitgave reached");
      this.transactionService.createOutcome(transaction);
      this.user.outcomes.push(transaction);
      this.getOutcomes();
      this.resetForm();
    }

    this.showCreate = false;
  }

  resetForm() {
    this.form.get("type").reset();
    this.form.get("name").reset();
    this.form.get("amount").reset();
    this.form.get("date").reset();
    this.form.get("category").reset();
    this.form.get("account").reset();
  }
  onSubmitEdit() {
    const type = this.edit.get("type").value;
    const name = this.edit.get("name").value;
    let amount: string = this.edit.get("amount").value.toString();
    amount = amount.replace(",", ".");
    console.log(amount);
    const date = this.edit.get("date").value;
    const category = this.edit.get("category").value;
    console.log(category);
    const account = this.edit.get("account").value;
    const id = this.edit.get("id").value;
    let transaction: Transaction;
    console.log("EDITED");

    if (type === "inkomen") {
      console.log(type);
      transaction = new Income(name, parseFloat(amount), date, account);
      transaction.category = category;
      this.transactionService.updateIncome(id, transaction);
      const index = this.user.incomes.findIndex(trans => trans.id === id);
      console.log(this.user.incomes[index], " ---------", transaction);
      this.user.incomes[index] = transaction;
      this.getIncomes();
      this.setTab1Active();
    } else if (type === "uitgave") {
      console.log(type);
      transaction = new Outcome(name, parseFloat(amount), date, account);
      transaction.category = category;
      this.transactionService.updateOutcome(id, transaction);
      const index = this.user.outcomes.findIndex(trans => trans.id === id);
      console.log(this.user.outcomes[index], " ---------", transaction);
      this.user.outcomes[index] = transaction;
      this.getOutcomes();
      this.setTab2Active();
    }
    this.toggleEdit();
  }

  toggleCreate() {
    if (this.showCreate) {
      this.showCreate = false;
    } else {
      this.showCreate = true;
      this.showEdit = false;
    }
  }

  toggleEdit() {
    if (this.showEdit === false) {
      this.showEdit = true;
      this.showCreate = false;
    } else {
      this.showEdit = false;
    }
  }

  smallScreen() {
    return this.screenWidth < 1000;
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

  noError() {
    return this.error == null || this.error === "";
  }

  updateTotalYear(event) {
    console.log(new Date("01-01-" + event.value));
    this.fillGraph4(new Date(event.value));
  }
  updateCategory(event: any) {
    if (
      Array.from(event.value).includes("all") ||
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
    if (this.incomeActive) {
      this.getIncomes();
    } else {
      this.getOutcomes();
    }
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

  editTransaction(transaction: Transaction) {
    this.edit.get("id").setValue(transaction.id);
    if (transaction instanceof Income) {
      this.edit.get("type").setValue("inkomen");
    } else if (transaction instanceof Outcome) {
      this.edit.get("type").setValue("uitgave");
    } else {
      console.log("something happened...");
    }
    this.edit.get("name").setValue(transaction.name);
    this.edit.get("amount").setValue(transaction.amount);
    this.edit.get("date").setValue(transaction.date);
    this.edit.get("category").setValue(transaction.category);
    this.edit.get("account").setValue(transaction.account);
    this.toggleEdit();
  }
  deleteTransaction(transaction: Transaction) {
    this.showEdit = false;
    if (transaction instanceof Income) {
      this.transactionService.deleteIncome(transaction.id);
      const index = this.user.incomes.findIndex(
        trans => trans.id === transaction.id
      );
      this.user.incomes.splice(index, 1);
      this.getIncomes();
    } else if (transaction instanceof Outcome) {
      this.transactionService.deleteOutcome(transaction.id);
      const index = this.user.outcomes.findIndex(
        trans => trans.id === transaction.id
      );
      this.user.outcomes.splice(index, 1);
      this.getOutcomes();
    } else {
      console.log("something happened...");
    }
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
      ? (this.error = "Er zijn geen transacties voor deze opties")
      : (this.error = "");
    this.fillGraph1(this.getTransactions(), "Totaal uitgaven");
    this.fillGraph2(this.getTransactions(), "Per categorie");
    this.fillGraph3(new Date(this.date.value));
    this.fillGraph4(new Date());
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
      ? (this.error = "Er zijn geen transacties voor deze opties")
      : (this.error = "");
    this.fillGraph1(this.getTransactions(), "Alle inkomsten");
    this.fillGraph2(this.getTransactions(), "Per categorie");
    this.fillGraph3(new Date(this.date.value));
    this.fillGraph4(new Date());
  }
  getUser(): User {
    return this.user;
  }
  getTransactions() {
    return this.transactions.sort(transaction=>transaction.date.getTime()).reverse();
  }

  getErrorMessage(field: string) {
    if (field === "name") {
      if (this.form.get("name").hasError("required")) {
        return "Naam is verplicht.";
      }
    } else if (field === "type") {
      if (this.form.get("type").hasError("required")) {
        return "Type is verplicht.";
      }
    } else if (field === "amount") {
      if (this.form.get("amount").hasError("required")) {
        return "Aantal is verplicht.";
      } else if (this.form.get("amount").hasError("pattern")) {
        return "Geef een geldig getal in.";
      }
    } else if (field === "date") {
      if (this.form.get("date").hasError("required")) {
        return "Datum is verplicht.";
      }
    } else if (field === "category") {
      if (this.form.get("category").hasError("required")) {
        return "Categorie is verplicht.";
      }
    } else if (field === "account") {
      if (this.form.get("account").hasError("required")) {
        return "Bankrekening is verplicht.";
      }
    }
  }

  getErrorMessageEdit(field: string) {
    if (field === "name") {
      if (this.edit.get("name").hasError("required")) {
        return "Naam is verplicht.";
      }
    } else if (field === "amount") {
      if (this.edit.get("amount").hasError("required")) {
        return "Aantal is verplicht.";
      } else if (this.edit.get("amount").hasError("pattern")) {
        return "Geef een geldig getal in.";
      }
    } else if (field === "date") {
      if (this.edit.get("date").hasError("required")) {
        return "Datum is verplicht.";
      }
    } else if (field === "category") {
      if (this.edit.get("category").hasError("required")) {
        return "Categorie is verplicht.";
      }
    } else if (field === "account") {
      if (this.edit.get("account").hasError("required")) {
        return "Bankrekening is verplicht.";
      }
    }
  }

  switch(tab1, tab2) {
    tab1.style.color = "#1F387E";
    tab1.style.borderColor = "#1F387E";

    tab2.style.color = "#E8E8E7";
    tab2.style.borderColor = "#E8E8E7";
    this.incomeActive
      ? (this.incomeActive = false)
      : (this.incomeActive = true);
    this.categories = null;
    this.date.setValue(null);
  }

  setTab1Active() {
    this.tab1.nativeElement.style.color = "#1F387E";
    this.tab1.nativeElement.style.borderColor = "#1F387E";

    this.tab2.nativeElement.style.color = "#E8E8E7";
    this.tab2.nativeElement.style.borderColor = "#E8E8E7";
    this.categories = null;
    this.date.setValue(null);
  }

  setTab2Active() {
    this.tab1.nativeElement.style.color = "#E8E8E7";
    this.tab1.nativeElement.style.borderColor = "#E8E8E7";

    this.tab2.nativeElement.style.color = "#1F387E";
    this.tab2.nativeElement.style.borderColor = "#1F387E";
    this.categories = null;
    this.date.setValue(null);
  }

  swipeLeft() {
    this.chartActive = (this.chartActive + 1) % 4;
  }

  swipeRight() {
    this.chartActive =
      this.chartActive - 1 < 0
        ? (this.chartActive = 3)
        : (this.chartActive -= 1);
  }

  showTransaction() {
    this.showCreate = true;
    this.showEdit = false;
  }

  showListTransactions() {
    if (this.transactions) {
      return this.transactions.length > 0;
    } else {
      return false;
    }
  }

  showCreateTransaction() {
    return this.showCreate || this.transactions.length === 0;
  }
}
