import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user/user.service";
import { LoanService } from "src/app/services/loan/loan.service";
import { Loan } from "src/app/domain/loan";
import { User } from "src/app/domain/user";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { TouchSequence } from "selenium-webdriver";
import { DateAdapter } from "@angular/material";

@Component({
  selector: "app-loan",
  templateUrl: "./loan.component.html",
  styleUrls: ["./loan.component.css"]
})
export class LoanComponent implements OnInit {
  public loans: Loan[] = [];
  public currentLoan: Loan;
  public user: User;
  public form: FormGroup;
  public edit: FormGroup;
  public showEdit: boolean = false;
  public showCreate: boolean = false;
  public showTransactionsList: boolean = true;

  public type = "doughnut";
  public legend = true;
  public labels = ["Reeds betaald", "Nog te betalen"];
  public data: any[] = [
    {
      data: [70, 30],
      labels: "Lening"
    }
  ];
  public options = {
    scaleShowVerticalLines: false,
    responsive: true,
    maintainAspectRatio: true,
    showScale: false
  };
  public colors: Array<any> = [
    {
      backgroundColor: ["rgb(26,35,126)", "rgb(242,125,10)"]
    }
  ];

  constructor(
    private userService: UserService,
    private loanService: LoanService,
    private fb: FormBuilder,
    private adapter: DateAdapter<any>
  ) {}

  ngOnInit() {
    this.user = this.userService.getUserObject();
    if (this.user) {
      this.loans = this.user.loans;
      if (this.loans) {
        this.currentLoan = this.loans[0];
        if (this.currentLoan) {
          this.fillGraph();
        }
      }
    }
    this.adapter.setLocale("nl");
    this.form = this.fb.group({
      name: this.fb.control("", [Validators.required]),
      currentAmount: this.fb.control("", [
        Validators.required,
        Validators.pattern("[0-9]{1,}(.|,[0-9]{1,})*")
      ]),
      totalAmount: this.fb.control("", [
        Validators.required,
        Validators.pattern("[0-9]{1,}(.|,[0-9]{1,})*")
      ]),
      dateStart: this.fb.control("", [Validators.required]),
      dateEnd: this.fb.control("", [Validators.required])
    });
    this.edit = this.fb.group({
      id: this.fb.control(""),
      name: this.fb.control("", [Validators.required]),
      currentAmount: this.fb.control("", [
        Validators.required,
        Validators.pattern("[0-9]{1,}(.|,[0-9]{1,})*")
      ]),
      totalAmount: this.fb.control("", [
        Validators.required,
        Validators.pattern("[0-9]{1,}(.|,[0-9]{1,})*")
      ]),
      dateStart: this.fb.control("", [Validators.required]),
      dateEnd: this.fb.control("", [Validators.required])
    });
  }

  onSubmit() {
    const name = this.form.get("name").value;
    const currentAmount = this.form.get("currentAmount").value;
    const totalAmount = this.form.get("totalAmount").value;
    const dateStart = this.form.get("dateStart").value;
    const dateEnd = this.form.get("dateEnd").value;
    const loan = new Loan(name, currentAmount, totalAmount, dateStart, dateEnd);
    this.loanService.createLoan(loan);
    this.loans.push(loan);
    this.setLoan(loan);
    this.resetForm();
    this.showCreate = false;
  }

  onSubmitEdit() {
    const id = this.edit.get("id").value;
    const name = this.edit.get("name").value;
    const currentAmount = this.edit.get("currentAmount").value;
    const totalAmount = this.edit.get("totalAmount").value;
    const dateStart = this.edit.get("dateStart").value;
    const dateEnd = this.edit.get("dateEnd").value;
    const loan = new Loan(name, currentAmount, totalAmount, dateStart, dateEnd);
    console.log(loan);
    this.loanService.updateLoan(id, loan);
    const index = this.loans.findIndex(lo => lo.id === this.currentLoan.id);
    this.loans[index] = loan;
    this.setLoan(loan);
    this.toggleEdit();
  }
  resetForm() {
    this.form.get("name").reset();
    this.form.get("currentAmount").reset();
    this.form.get("totalAmount").reset();
    this.form.get("dateStart").reset();
    this.form.get("dateEnd").reset();
  }

  editLoan(loan: Loan) {
    this.edit.get("id").setValue(loan.id);
    this.edit.get("name").setValue(loan.name);
    this.edit.get("currentAmount").setValue(loan.currentAmount);
    this.edit.get("totalAmount").setValue(loan.totalAmount);
    this.edit.get("dateStart").setValue(loan.dateStart);
    this.edit.get("dateEnd").setValue(loan.dateEnd);
    this.toggleEdit();
  }

  deleteLoan(loan: Loan) {
    this.showEdit = false;
    this.loanService.deleteLoan(loan.id);
    const index = this.loans.findIndex(l => l.id === loan.id);
    this.loans.splice(index, 1);
    this.currentLoan = this.loans[0];
  }

  fillGraph() {
    this.data = [
      {
        data: [
          this.currentLoan.totalAmount - this.currentLoan.currentAmount,
          this.currentLoan.currentAmount
        ],
        labels: "Lening"
      }
    ];
  }

  calculateShortOversight() {
    if (this.user) {
      return this.user.calculateShortOversight();
    }
  }

  setLoan(loan) {
    this.currentLoan = loan;
    if (this.currentLoan) {
      this.fillGraph();
    }
  }
  showLoan() {
    this.showCreate = true;
    this.showEdit = false;
  }

  showListLoans() {
    if (this.loans) {
      return this.loans.length > 0;
    } else {
      return false;
    }
  }

  showCreateLoan() {
    return this.showCreate || this.loans.length === 0;
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

  getLoans() {
    return this.loans;
  }
  getErrorMessage(field: string) {
    if (field === "name") {
      if (this.form.get("name").hasError("required")) {
        return "Naam is verplicht.";
      }
    } else if (field === "currentAmount") {
      if (this.form.get("currentAmount").hasError("required")) {
        return "Huidige hoeveelheid is verplicht.";
      } else if (this.form.get("currentAmount").hasError("pattern")) {
        return "Geef een geldig getal in.";
      }
    } else if (field === "totalAmount") {
      if (this.form.get("totalAmount").hasError("required")) {
        return "Totale hoeveelheid is verplicht.";
      } else if (this.form.get("totalAmount").hasError("pattern")) {
        return "Geef een geldig getal in.";
      }
    } else if (field === "dateStart") {
      if (this.form.get("dateStart").hasError("required")) {
        return "Start datum is verplicht.";
      }
    } else if (field === "dateEnd") {
      if (this.form.get("dateEnd").hasError("required")) {
        return "Eind datum is verplicht.";
      }
    }
  }

  getErrorMessageEdit(field: string) {
    if (field === "name") {
      if (this.edit.get("name").hasError("required")) {
        return "Naam is verplicht.";
      }
    } else if (field === "currentAmount") {
      if (this.edit.get("currentAmount").hasError("required")) {
        return "Huidige hoeveelheid is verplicht.";
      } else if (this.edit.get("currentAmount").hasError("pattern")) {
        return "Geef een geldig getal in.";
      }
    } else if (field === "totalAmount") {
      if (this.edit.get("totalAmount").hasError("required")) {
        return "Totale hoeveelheid is verplicht.";
      } else if (this.edit.get("totalAmount").hasError("pattern")) {
        return "Geef een geldig getal in.";
      }
    } else if (field === "dateStart") {
      if (this.edit.get("dateStart").hasError("required")) {
        return "Start datum is verplicht.";
      }
    } else if (field === "dateEnd") {
      if (this.edit.get("dateEnd").hasError("required")) {
        return "Eind datum is verplicht.";
      }
    }
  }
}
