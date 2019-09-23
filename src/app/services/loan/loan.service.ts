import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { UserService } from "../user/user.service";
import { Loan } from "src/app/domain/loan";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class LoanService {
  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) {}

  createLoan(loan: Loan) {
    this.firestore
      .collection("loans")
      .add(Object.assign({}, loan))
      .then(docRef => {
        this.userService.addLoan(docRef);
        loan.id = docRef.id;
      });
  }

  readLoans() {
    return this.firestore
      .collection("loans")
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ ...c.payload.doc.data() }))));
  }

  updateLoan(key: string, value: Loan) {
    return this.firestore
      .collection("loans")
      .doc(key)
      .update(Object.assign({}, value))
      .then(() => {
        value.id = key;
      });
  }

  deleteLoan(key: string) {
    const document = this.firestore.collection("loans").doc(key);
    const reference = this.getLoanReference(key);
    return document.delete().then(() => {
      this.userService.removeLoan(reference);
      console.log("deleted document loan: ", document);
    });
  }

  getLoanReference(key: string) {
    const document = this.firestore.collection("loans").doc(key);
    return document.ref;
  }
}
