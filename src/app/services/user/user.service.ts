import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { User } from "src/app/domain/user";
import { map } from "rxjs/operators";
import { Category } from "src/app/domain/category";
import { AngularFireAuth } from "@angular/fire/auth";
import firebase from "firebase/app";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserService {
  public user: User;
  public uid:string;
  constructor(
    private firestore: AngularFirestore,
    private fireauth: AngularFireAuth,
    private router: Router
  ) {}

  createUser(user: User) {
    console.log(this.uid + user);
    this.firestore
      .collection("users")
      .doc(this.uid)
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

  setUid(){
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
        .then(async val => {
          console.log("reading categories");
          const realCategories: Category[] = [];
          this.user.categories = realCategories;
          let promises = [];
          val.data().categories.forEach(cat =>
            promises.push(
              new Promise(function() {
                cat.get().then(catDoc => {
                  realCategories.push(Category.fromJSON(catDoc.data()));
                });
              })
            )
          );
          console.log("promises :", promises);
          Promise.all(promises);
          console.log("alles is gedaan");
          return val;
        })
        .then(val => {
          console.log("user is created", this.user);
          return val;
        })
        .then(() => {
        })
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
}
