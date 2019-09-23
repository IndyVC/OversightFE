import { Injectable } from "@angular/core";
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

@Injectable({
  providedIn: "root"
})
export class UserService {
  public user: User;
  public uid: string;
  constructor(
    private firestore: AngularFirestore,
    private fireauth: AngularFireAuth,
    private router: Router
  ) {}

  createUser(user: User) {
    console.log(this.fireauth.auth.currentUser.uid + user);
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

  createUserObject() {
    return (
      this.firestore
        .collection("users")
        .doc(this.uid)
        .get()
        .toPromise()
        .then(val => {
          console.log("reading all data");
          // Collections are filled with references
          this.user = User.fromJSON(val.data());
          return val;
        })
        // References are translated to the real categories by getting the documents in firestore
        // Category
        .then(val => {
          console.log("reading bankaccounts");
          const realBankaccounts: BankAccount[] = [];
          this.user.accounts = realBankaccounts;
          const promises = [];
          if (val.data().bankaccounts) {
            val.data().bankaccounts.forEach(acc => {
              promises.push(
                new Promise(() => {
                  acc.get().then(accDoc => {
                    const accs: BankAccount = BankAccount.fromJSON(
                      accDoc.data()
                    );
                    accs.id = accDoc.id;
                    realBankaccounts.push(accs);
                  });
                })
              );
            });
          }
          console.log("promises :", promises);
          Promise.all(promises);
          console.log("alle promises zijn gedaan");
          return val;
        })
        .then(val => {
          console.log("reading categories");
          const realCategories: Category[] = [];
          this.user.categories = realCategories;
          const promises = [];
          if (val.data().categories) {
            val.data().categories.forEach(cat =>
              promises.push(
                new Promise(() => {
                  cat.get().then(catDoc => {
                    const cats: Category = Category.fromJSON(catDoc.data());
                    cats.id = catDoc.id;
                    realCategories.push(cats);
                  });
                })
              )
            );
          }

          console.log("promises :", promises);
          Promise.all(promises);
          console.log("alle promises zijn gedaan");
          return val;
        })
        .then(val => {
          console.log("reading incomes");
          const realIncomes: Transaction[] = [];
          this.user.incomes = realIncomes;
          const promises = [];
          if (val.data().incomes) {
            val.data().incomes.forEach(income =>
              promises.push(
                new Promise(() => {
                  income.get().then(incomeDoc => {
                    const trans: Income = Income.fromJSON(incomeDoc.data());
                    incomeDoc
                      .data()
                      .category.get()
                      .then(categoryDoc => {
                        console.log(categoryDoc.data());
                        trans.category = Category.fromJSON(categoryDoc.data());
                        trans.category.id = categoryDoc.id;
                      });
                    incomeDoc
                      .data()
                      .account.get()
                      .then(accountDoc => {
                        console.log(accountDoc.data());
                        trans.account = BankAccount.fromJSON(accountDoc.data());
                        trans.account.id = accountDoc.id;
                      });

                    trans.id = incomeDoc.id;
                    realIncomes.push(trans);
                  });
                })
              )
            );
          }
          console.log("inkomens :", promises);
          Promise.all(promises);
          console.log("alle inkomens zijn gedaan");
          return val;
        })
        .then(val => {
          console.log("reading outcomes");
          const realOutcomes: Transaction[] = [];
          this.user.outcomes = realOutcomes;
          const promises = [];
          if (val.data().outcomes) {
            val.data().outcomes.forEach(outcome =>
              promises.push(
                new Promise(() => {
                  outcome.get().then(outcomeDoc => {
                    const trans: Income = Outcome.fromJSON(outcomeDoc.data());
                    outcomeDoc
                      .data()
                      .category.get()
                      .then(categoryDoc => {
                        console.log(categoryDoc.data());
                        trans.category = Category.fromJSON(categoryDoc.data());
                        trans.category.id = categoryDoc.id;
                      });
                    console.log("outcomedoc :", outcomeDoc);
                    outcomeDoc
                      .data()
                      .account.get()
                      .then(accountDoc => {
                        console.log(accountDoc.data());
                        trans.account = BankAccount.fromJSON(accountDoc.data());
                        trans.account.id = accountDoc.id;
                      });
                    trans.id = outcomeDoc.id;
                    realOutcomes.push(trans);
                  });
                })
              )
            );
          }
          console.log("uitgaves :", promises);
          Promise.all(promises);
          console.log("alle uitgaves zijn gedaan");
          return val;
        })
        .then(val => {
          console.log("reading loans");
          const realLoans: Loan[] = [];
          this.user.loans = realLoans;
          const promises = [];
          if (val.data().loans) {
            val.data().loans.forEach(loan => {
              promises.push(
                new Promise(() => {
                  loan.get().then(loanDoc => {
                    const loans: Loan = Loan.fromJSON(loanDoc.data());
                    loans.id = loanDoc.id;
                    realLoans.push(loans);
                  });
                })
              );
            });
          }
          console.log("promises :", promises);
          Promise.all(promises);
          console.log("alle promises zijn gedaan");
          return val;
        })
        .then(val => {
          console.log("user is created", this.user);
          return val;
        })
        .then(() => {})
    );
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
