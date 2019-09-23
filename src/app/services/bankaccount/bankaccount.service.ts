import { AngularFirestore } from "@angular/fire/firestore";
import { Injectable } from "@angular/core";
import { UserService } from "../user/user.service";
import { BankAccount } from "src/app/domain/account";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class BankaccountService {
  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) {}

  createBankaccount(account: BankAccount) {
    this.firestore
      .collection("bankaccounts")
      .add(Object.assign({}, account))
      .then(docRef => {
        this.userService.addBankaccount(docRef);
        account.id = docRef.id;
      });
  }

  readBankaccounts() {
    return this.firestore
      .collection("bankaccounts")
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ ...c.payload.doc.data() }))));
  }

  updateBankaccount(key: string, value: BankAccount): Promise<void> {
    return this.firestore
      .collection("bankaccounts")
      .doc(key)
      .update(Object.assign({}, value))
      .then(() => {
        value.id = key;
      });
  }

  deleteBankaccount(key: string) {
    const document = this.firestore.collection("bankaccounts").doc(key);
    const reference = document.ref;
    return document.delete().then(() => {
      this.userService.removeBankaccount(reference);
    });
  }

  getBankaccountReference(key:string){
    const document = this.firestore.collection("bankaccounts").doc(key);
    return document.ref;
  }
}
