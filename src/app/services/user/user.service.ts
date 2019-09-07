import { Injectable } from "@angular/core";
import {
  AngularFirestore,
  AngularFirestoreCollection
} from "@angular/fire/firestore";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { User } from "src/app/domain/user";
import { map } from "rxjs/operators";

@Injectable({
  providedIn: "root"
})
export class UserService {
  constructor(private firestore: AngularFirestore) {}

  createUser(user: User, uid) {
    console.log(uid + user);
    this.firestore
      .collection("users")
      .doc(uid)
      .set(Object.assign({}, user));
  }

  readUsers() {
    return this.firestore
      .collection("users")
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ ...c.payload.doc.data() }))));
  }

  updateUser(key: string, value: any): Promise<void> {
    return this.firestore
      .collection("users")
      .doc(key)
      .update(value);
  }

  deleteUser(key: string): Promise<void> {
    return this.firestore
      .collection("users")
      .doc(key)
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
}
