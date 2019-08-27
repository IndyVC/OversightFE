import { Injectable } from '@angular/core';
import { AngularFirestore } from '@angular/fire/firestore';
import { FormGroup, FormControl, Validators } from '@angular/forms';
@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private firestore: AngularFirestore) { }
  users;
  emails = [];

  login = new FormGroup({
    email: new FormControl('', [Validators.required]),
    password: new FormControl('', [Validators.required])
  })

  register = new FormGroup({
    active: new FormControl(false),
    email: new FormControl('', [Validators.required, Validators.email]),
    firstname: new FormControl('', Validators.required),
    lastname: new FormControl('', Validators.required),
    pincode: new FormControl('', [Validators.required, Validators.pattern("[0-9]{4,}")]),
    age: new FormControl('', [Validators.required]),
    verificationNumber: new FormControl('', Validators.required),
    verificationDate: new FormControl('', Validators.required)
  })

  createUser(data) {
    return new Promise<any>((resolve, reject) => {
      this.firestore.collection('users')
        .add(data)
        .then(res => { }, err => reject(err));
    });
  }

  readUsers() {
    return this.firestore.collection("users").snapshotChanges();
  }


  async fetchEmails() {
    await this.readUsers()
      .subscribe(res => {
        this.users = res;
        this.users.map(user => this.emails.push(user.payload.doc.data().email));
      });
  }

  isUniqueEmail(email: string): boolean {
    let isUnique = true;
    this.fetchEmails().then();
    this.emails.forEach(e => {
      e == email ? isUnique = false : isUnique = true;
    });
    console.log(isUnique);
    return isUnique;
  }
}
