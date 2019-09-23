import { Outcome } from "src/app/domain/outcome";
import { Income } from "./../../domain/income";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { Transaction } from "src/app/domain/transaction";
import { Component, OnInit } from "@angular/core";
import { BankAccount } from "src/app/domain/account";
import { User } from "src/app/domain/user";
import { FormGroup, FormBuilder, Validators } from "@angular/forms";
import { UserService } from "src/app/services/user/user.service";
import { BankaccountService } from "src/app/services/bankaccount/bankaccount.service";
import { UsedByTransactionsComponent } from "../dialogs/used-by-transactions/used-by-transactions.component";
import { TransactionService } from "src/app/services/transaction/transaction.service";

@Component({
  selector: "app-bankaccount",
  templateUrl: "./bankaccount.component.html",
  styleUrls: ["./bankaccount.component.css"]
})
export class BankaccountComponent implements OnInit {
  public accounts: BankAccount[] = [];
  public transactions: Transaction[];
  public user: User;
  public showCreate: boolean = false;
  public showEdit: boolean = false;
  public currentBankaccount: BankAccount;
  public form: FormGroup;
  public edit: FormGroup;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private bankaccountService: BankaccountService,
    private transactionService: TransactionService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.user = this.userService.getUserObject();
    if (this.user) {
      this.accounts = this.user.accounts;
      this.transactions = this.user.getAllTransactions();
      if (this.accounts) {
        this.currentBankaccount = this.accounts[0];
      }
    }

    this.form = this.fb.group({
      accountNumber: ["", [Validators.required]],
      balance: ["", [Validators.required]],
      bank: ["", [Validators.required]],
      type: ["", [Validators.required]]
    });
    this.edit = this.fb.group({
      id: ["", [Validators.required]],
      accountNumber: ["", [Validators.required]],
      balance: ["", [Validators.required]],
      bank: ["", [Validators.required]],
      type: ["", [Validators.required]]
    });
  }

  calculateShortOversight() {
    if (this.user) {
      return this.user.calculateShortOversight();
    }
  }

  onSubmit() {
    const accountNumber = this.form.get("accountNumber").value;
    let balance = this.form.get("balance").value;
    const bank = this.form.get("bank").value;
    const type = this.form.get("type").value;
    balance = balance.replace(",", ".");
    const bankaccount = new BankAccount(
      accountNumber,
      parseFloat(balance),
      bank,
      type
    );
    this.bankaccountService.createBankaccount(bankaccount);
    this.accounts.push(bankaccount);
    this.setBankaccount(bankaccount);
    this.showCreate = false;
  }

  onSubmitEdit() {
    const id = this.edit.get("id").value;
    const accountNumber = this.edit.get("accountNumber").value;
    let balance = this.edit.get("balance").value;
    balance = balance.replace(",", ".");

    const bank = this.edit.get("bank").value;
    const type = this.edit.get("type").value;
    const bankaccount = new BankAccount(
      accountNumber,
      parseFloat(balance),
      bank,
      type
    );
    const index = this.accounts.findIndex(acc => acc.id === id);
    this.accounts[index] = bankaccount;
    this.bankaccountService.updateBankaccount(id, bankaccount);
    this.setBankaccount(bankaccount);
    this.toggleEdit();
  }
  deleteBankaccount(account: BankAccount) {
    console.log("to be deleted banka ccount:  ", account);
    this.showEdit = false;
    this.bankaccountService.deleteBankaccount(account.id);
    this.deleteTransactionsFromBankaccount(account);
    const index = this.accounts.findIndex(acc => acc.id === account.id);
    this.accounts.splice(index, 1);
    this.currentBankaccount = this.accounts[0];
  }

  deleteTransactionsFromBankaccount(account) {
    this.user.getAllTransactions().forEach(transaction => {
      if (transaction.account.id === account.id) {
        if (transaction instanceof Income) {
          this.transactionService.deleteIncome(transaction.id);
          this.userService.user.deleteLocalIncome(transaction);
        } else if (transaction instanceof Outcome) {
          this.transactionService.deleteOutcome(transaction.id);
          this.userService.user.deleteLocalOutcome(transaction);
        } else {
          console.log("Something went wrong");
        }
      }
    });
  }
  editBankaccount(account: BankAccount) {
    this.edit.get("id").setValue(account.id);
    this.edit.get("accountNumber").setValue(account.accountNumber);
    this.edit.get("balance").setValue(account.balance);
    this.edit.get("bank").setValue(account.bank);
    this.edit.get("type").setValue(account.type);
    this.toggleEdit();
  }

  getBankaccounts() {
    return this.user.accounts;
  }

  getTransactions() {
    if (this.transactions) {
      return this.transactions
        .filter(
          transaction => transaction.account.id === this.currentBankaccount.id
        )
        .slice(0, 5)
        .sort(trans => trans.date.getTime())
        .reverse();
    }
  }

  getErrorMessage(field: string) {
    if (field === "accountNumber") {
      if (this.form.get("accountNumber").hasError("required")) {
        return "Rekening nummer is verplicht.";
      }
    } else if (field === "type") {
      if (this.form.get("type").hasError("required")) {
        return "Type is verplicht.";
      }
    } else if (field === "balance") {
      if (this.form.get("balance").hasError("required")) {
        return "Balans is verplicht.";
      }
    } else if (field === "bank") {
      if (this.form.get("bank").hasError("required")) {
        return "Bank is verplicht.";
      }
    }
  }
  getErrorMessageEdit(field: string) {
    if (field === "accountNumber") {
      if (this.edit.get("accountNumber").hasError("required")) {
        return "Rekening nummer is verplicht.";
      }
    } else if (field === "type") {
      if (this.edit.get("type").hasError("required")) {
        return "Type is verplicht.";
      }
    } else if (field === "balance") {
      if (this.edit.get("balance").hasError("required")) {
        return "Balans is verplicht.";
      }
    } else if (field === "bank") {
      if (this.edit.get("bank").hasError("required")) {
        return "Bank is verplicht.";
      }
    }
  }
  setBankaccount(account) {
    this.currentBankaccount = account;
  }

  showListBankaccounts() {
    if (this.accounts.length > 0) {
      return true;
    } else {
      return false;
    }
  }
  showBankaccount() {
    this.showCreate = true;
    this.showEdit = false;
  }

  showCreateBankaccount() {
    return this.showCreate || this.accounts.length === 0;
  }

  confirmDelete(account) {
    const dialogConfig = new MatDialogConfig();

    dialogConfig.disableClose = true;
    dialogConfig.autoFocus = true;

    const dialogRef = this.dialog.open(
      UsedByTransactionsComponent,
      dialogConfig
    );

    dialogRef.afterClosed().subscribe(data => {
      if (data === "confirmed") {
        this.deleteBankaccount(account);
      }
    });
  }
  showHistory() {
    if (this.getTransactions()) {
      return this.getTransactions().length > 0;
    } else {
      return false;
    }
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
}
