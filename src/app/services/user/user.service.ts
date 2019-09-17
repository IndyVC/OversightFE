import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "src/app/domain/user";
import { map } from "rxjs/operators";
import { Category } from "src/app/domain/category";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public user: User;

  constructor(
    private firestore: AngularFirestore,
    private fireauth: AngularFireAuth
  ) {}

  createUser(user: User) {
    const uid = this.fireauth.auth.currentUser.uid;
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

  updateUser(value: any): Promise<void> {
    const uid = this.fireauth.auth.currentUser.uid;
    return this.firestore
      .collection("users")
      .doc(uid)
      .update(value);
  }

  deleteUser(): Promise<void> {
    const uid = this.fireauth.auth.currentUser.uid;
    return this.firestore
      .collection("users")
      .doc(uid)
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

  getUser() {
    const uid = this.fireauth.auth.currentUser.uid;
    this.firestore
      .collection("users")
      .doc(uid)
      .snapshotChanges()
      .pipe(map(changes => ({ ...changes.payload.data() })))
      .subscribe(value => {
        console.log(value);
      });
  }
  addCategory(reference) {
    const uid = this.fireauth.auth.currentUser.uid;
    this.firestore
      .collection("users")
      .doc(uid)
      .update({
        categories: firebase.firestore.FieldValue.arrayUnion(reference)
      });
  }
}
