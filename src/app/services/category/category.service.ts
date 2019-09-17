import { Injectable } from "@angular/core";
import { AngularFirestore } from "@angular/fire/firestore";
import { Category } from "src/app/domain/category";
import { map } from "rxjs/operators";
import { UserService } from "../user/user.service";

@Injectable({
  providedIn: "root"
})
export class CategoryService {
  constructor(
    private firestore: AngularFirestore,
    private userService: UserService
  ) {}

  createCategory(category: Category) {
    this.firestore
      .collection("categories")
      .add(Object.assign({}, category))
      .then(docRef => {
        this.userService.addCategory(docRef);
      });
  }

  readCategories() {
    return this.firestore
      .collection("categories")
      .snapshotChanges()
      .pipe(map(changes => changes.map(c => ({ ...c.payload.doc.data() }))));
  }

  updateCategory(key: string, value: any): Promise<void> {
    return this.firestore
      .collection("categories")
      .doc(key)
      .update(value);
  }

  deleteCategory(key: string): Promise<void> {
    return this.firestore
      .collection("categories")
      .doc(key)
      .delete();
  }
}
