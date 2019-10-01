import { Injectable, EventEmitter } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "src/app/domain/user";
import { map } from "rxjs/operators";
import { Category } from "src/app/domain/category";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { Router } from "@angular/router";
import { Transaction } from "src/app/domain/transaction";
import { Income } from "src/app/domain/income";
import { Outcome } from "src/app/domain/outcome";
import { BankAccount } from "src/app/domain/account";
import { Loan } from "src/app/domain/loan";
import { Observable } from "rxjs";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public user: User;
  public uid: string;
  public loaded: boolean = false;
  constructor(
    private firestore: AngularFirestore,
    private fireauth: AngularFireAuth,
    private router: Router
  ) {}

  createUser(user: User) {
    console.log("CREATE USER");
    console.log(this.fireauth.auth.currentUser.uid, user);
    this.firestore
      .collection("users")
      .doc(this.fireauth.auth.currentUser.uid)
      .set(Object.assign({}, user));
  }

  readUsers() {
    return this.firestore
      .collection("users")
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ ...c.payload.doc.data() }))));
  }

  updateUser(value: any): Promise<void> {
    return this.firestore
      .collection("users")
      .doc(this.uid)
      .update(value);
  }

  deleteUser(): Promise<void> {
    return this.firestore
      .collection("users")
      .doc(this.uid)
      .delete();
  }

  deleteAll() {
    this.firestore
      .collection("users")
      .get()
      .subscribe(
        querySnapshot => {
          querySnapshot.forEach(doc => {
            doc.ref.delete();
          });
        },
        error => {
          console.log("Error: " + error);
        }
      );
  }

  setUid() {
    this.uid = this.fireauth.auth.currentUser.uid;
  }

  async createUserObject() {
    let data: any;
    const userPromise: Promise<any> = this.firestore
      .collection("users")
      .doc(this.uid)
      .get()
      .toPromise();
    await userPromise.then(val => {
      this.user = User.fromJSON(val.data());
      data = val.data();
    });

    console.log("After await 1");

    const bankaccountPromises = [];
    if (data.bankaccounts) {
      data.bankaccounts.forEach(account => {
        bankaccountPromises.push(account.get());
      });
    }
    await Promise.all(bankaccountPromises).then(values => {
      const bankaccounts = [];
      this.user.bankaccounts = bankaccounts;
      values.forEach(val => {
        const account: BankAccount = BankAccount.fromJSON(val.data());
        account.id = val.id;
        bankaccounts.push(account);
      });
    });

    console.log("After await 2");

    const categoryPromises = [];
    if (data.categories) {
      data.categories.forEach(category => {
        categoryPromises.push(category.get());
      });
    }
    await Promise.all(categoryPromises).then(values => {
      const categories = [];
      this.user.categories = categories;
      values.forEach(val => {
        const category: Category = Category.fromJSON(val.data());
        category.id = val.id;
        categories.push(category);
      });
    });

    console.log("After await 3");

    const incomePromises = [];
    if (data.incomes) {
      data.incomes.forEach(income => {
        incomePromises.push(income.get());
      });
    }
    await Promise.all(incomePromises).then(values => {
      const incomes = [];
      this.user.incomes = incomes;
      values.forEach(val => {
        const transaction = Income.fromJSON(val.data());
        const categories = this.user.categories.filter(
          cat => cat.id === val.data().category.id
        );
        const category = categories[0];
        const accounts = this.user.bankaccounts.filter(
          acc => acc.id === val.data().account.id
        );
        const account = accounts[0];
        transaction.category = category;
        transaction.category.id = category.id;
        transaction.account = account;
        transaction.account.id = account.id;
        transaction.id = val.id;
        incomes.push(transaction);
      });
    });

    console.log("After await 4");

    const outcomePromises = [];
    if (data.outcomes) {
      data.outcomes.forEach(outcome => {
        outcomePromises.push(outcome.get());
      });
    }
    await Promise.all(outcomePromises).then(values => {
      const outcomes = [];
      this.user.outcomes = outcomes;
      values.forEach(val => {
        const transaction = Outcome.fromJSON(val.data());
        const categories = this.user.categories.filter(
          cat => cat.id === val.data().category.id
        );
        const category = categories[0];
        const accounts = this.user.bankaccounts.filter(
          acc => acc.id === val.data().account.id
        );
        const account = accounts[0];
        transaction.category = category;
        transaction.category.id = category.id;
        transaction.account = account;
        transaction.account.id = account.id;
        transaction.id = val.id;
        outcomes.push(transaction);
      });
    });

    console.log("After await 5");

    const loanPromises = [];
    if (data.loans) {
      data.loans.forEach(loan => {
        loanPromises.push(loan.get());
      });
    }
    await Promise.all(loanPromises).then(values => {
      const loans = [];
      this.user.loans = loans;
      values.forEach(val => {
        const loan: Loan = Loan.fromJSON(val.data());
        loan.id = val.id;
        loans.push(loan);
      });
    });

    console.log("After await 6");
    this.loaded = true;
    console.log("Fully loaded: ", this.loaded);
  }

  getUserObject(): User {
    if (this.user) {
      return this.user;
    } else {
      this.createUserObject().then(() => {
        return this.user;
      });
    }
  }
  addCategory(reference) {
    this.firestore
      .collection("users")
      .doc(this.uid)
      .update({
        categories: firebase.firestore.FieldValue.arrayUnion(reference)
      });
  }

  removeCategory(reference) {
    this.firestore
      .collection("users")
      .doc(this.uid)
      .update({
        categories: firebase.firestore.FieldValue.arrayRemove(reference)
      });
  }

  addIncome(reference) {
    this.firestore
      .collection("users")
      .doc(this.uid)
      .update({
        incomes: firebase.firestore.FieldValue.arrayUnion(reference)
      });
  }

  addOutcome(reference) {
    this.firestore
      .collection("users")
      .doc(this.uid)
      .update({
        outcomes: firebase.firestore.FieldValue.arrayUnion(reference)
      });
  }
  removeIncome(reference) {
    this.firestore
      .collection("users")
      .doc(this.uid)
      .update({
        incomes: firebase.firestore.FieldValue.arrayRemove(reference)
      });
  }
  removeOutcome(reference) {
    this.firestore
      .collection("users")
      .doc(this.uid)
      .update({
        outcomes: firebase.firestore.FieldValue.arrayRemove(reference)
      });
  }

  addBankaccount(reference) {
    this.firestore
      .collection("users")
      .doc(this.uid)
      .update({
        bankaccounts: firebase.firestore.FieldValue.arrayUnion(reference)
      });
  }

  removeBankaccount(reference) {
    this.firestore
      .collection("users")
      .doc(this.uid)
      .update({
        bankaccounts: firebase.firestore.FieldValue.arrayRemove(reference)
      });
  }

  addLoan(reference) {
    this.firestore
      .collection("users")
      .doc(this.uid)
      .update({
        loans: firebase.firestore.FieldValue.arrayUnion(reference)
      });
  }

  removeLoan(reference) {
    this.firestore
      .collection("users")
      .doc(this.uid)
      .update({
        loans: firebase.firestore.FieldValue.arrayRemove(reference)
      });
  }
}
