import { Injectable } from "@angular/core";
import { AngularFirestore, DocumentReference } from "@angular/fire/firestore";
import { UserService } from "../user/user.service";
import { Transaction } from "src/app/domain/transaction";
import { map } from "rxjs/operators";
import { CategoryService } from "../category/category.service";
import { BankaccountService } from '../bankaccount/bankaccount.service';

@Injectable({
  providedIn: "root"
})
export class TransactionService {
  constructor(
    private firestore: AngularFirestore,
    private userService: UserService,
    private categoryService: CategoryService,
    private bankaccountService:BankaccountService
  ) {}

  // INCOMES
  createIncome(income: Transaction) {
    console.log(income.category.id);
    const categoryReference: DocumentReference = this.categoryService.getCategoryReference(
      income.category.id
    );
    const bankaccountReference:DocumentReference = this.bankaccountService.getBankaccountReference(income.account.id);

    const docData = {
      name: income.name,
      amount: income.amount,
      date: income.date,
      category: categoryReference,
      account: bankaccountReference
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

  updateIncome(key: string, income: Transaction): Promise<void> {
    console.log(income);
    console.log(income.category);
    console.log(income.category.id);
    const categoryReference: DocumentReference = this.categoryService.getCategoryReference(
      income.category.id
    );

    const bankaccountReference:DocumentReference = this.bankaccountService.getBankaccountReference(income.account.id);


    const docData = {
      name: income.name,
      amount: income.amount,
      date: income.date,
      category: categoryReference,
      account: bankaccountReference
    };
    return this.firestore
      .collection("incomes")
      .doc(key)
      .update(docData)
      .then(e => {
        console.log(e);
        income.id = key;
      })
      .catch(e => {
        console.log(e);
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
    const bankaccountReference:DocumentReference = this.bankaccountService.getBankaccountReference(outcome.account.id);

    const docData = {
      name: outcome.name,
      amount: outcome.amount,
      date: outcome.date,
      category: categoryReference,
      account: bankaccountReference
    };
    this.firestore
      .collection("outcomes")
      .add(docData)
      .then(docRef => {
        this.userService.addOutcome(docRef);
        outcome.id = docRef.id;
      });
  }

  readOutcomes() {
    return this.firestore
      .collection("outcomes")
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ ...c.payload.doc.data() }))));
  }

  updateOutcome(key: string, outcome: Transaction): Promise<void> {
    console.log(outcome);
    console.log(outcome.category);
    console.log(outcome.category.id);
    const categoryReference: DocumentReference = this.categoryService.getCategoryReference(
      outcome.category.id
    );
    const bankaccountReference:DocumentReference = this.bankaccountService.getBankaccountReference(outcome.account.id);

    const docData = {
      name: outcome.name,
      amount: outcome.amount,
      date: outcome.date,
      category: categoryReference,
      account: bankaccountReference
    };
    return this.firestore
      .collection("outcomes")
      .doc(key)
      .update(docData)
      .then(e => {
        console.log(e);
        outcome.id = key;
      })
      .catch(e => {
        console.log(e);
      });
  }

  deleteOutcome(key: string) {
    const document = this.firestore.collection("outcomes").doc(key);
    const reference = document.ref;
    return document.delete().then(() => {
      this.userService.removeOutcome(reference);
      console.log("deleted document transaction: ", document);
    });
  }
}
