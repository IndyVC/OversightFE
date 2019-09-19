import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentReference } from "@angular/fire/firestore";
import { UserService } from "../user/user.service";
import { Transaction } from "src/app/domain/transaction";
import { map } from "rxjs/operators";
import { CategoryService } from "../category/category.service";

@Injectable({
  providedIn: "root"
})
export class TransactionService {
  constructor(
    private firestore: AngularFirestore,
    private userService: UserService,
    private categoryService: CategoryService
  ) {}

  // INCOMES
  createIncome(income: Transaction) {
    console.log(income.category.id);
    const categoryReference: DocumentReference = this.categoryService.getCategoryReference(
      income.category.id
    );

    const docData = {
      name: income.name,
      amount: income.amount,
      date: income.date,
      category: categoryReference,
      account: {
        accountNumber: income.account.accountNumber
      }
    };
    this.firestore
      .collection("incomes")
      .add(docData)
      .then(docRef => {
        this.userService.addIncome(docRef);
        income.id = docRef.id;
      });
  }

  readIncomes() {
    return this.firestore
      .collection("incomes")
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ ...c.payload.doc.data() }))));
  }

  updateIncome(key: string, value: Transaction): Promise<void> {
    return this.firestore
      .collection("incomes")
      .doc(key)
      .update(Object.assign({}, value))
      .then(() => {
        value.id = key;
      });
  }

  deleteIncome(key: string) {
    const document = this.firestore.collection("incomes").doc(key);
    const reference = document.ref;
    return document.delete().then(() => {
      this.userService.removeIncome(reference);
      console.log("deleted document transaction: ", document);
    });
  }

  // OUTCOMES
  createOutcome(outcome: Transaction) {
    console.log(outcome.category.id);
    const categoryReference: DocumentReference = this.categoryService.getCategoryReference(
      outcome.category.id
    );

    const docData = {
      name: outcome.name,
      amount: outcome.amount,
      date: outcome.date,
      category: categoryReference,
      account: {
        accountNumber: outcome.account.accountNumber
      }
    };
    this.firestore
      .collection("outcomes")
      .add(docData)
      .then(docRef => {
        this.userService.addIncome(docRef);
        outcome.id = docRef.id;
      });
  }

  readOutcomes() {
    return this.firestore
      .collection("outcomes")
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ ...c.payload.doc.data() }))));
  }

  updateOutcome(key: string, value: Transaction): Promise<void> {
    return this.firestore
      .collection("outcomes")
      .doc(key)
      .update(Object.assign({}, value))
      .then(() => {
        value.id = key;
      });
  }

  deleteOutcome(key: string) {
    const document = this.firestore.collection("outcomes").doc(key);
    const reference = document.ref;
    return document.delete().then(() => {
      this.userService.removeIncome(reference);
      console.log("deleted document transaction: ", document);
    });
  }
}
