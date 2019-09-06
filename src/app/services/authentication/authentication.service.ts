import { Injectable, NgZone } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { Observable } from "rxjs";
import { Router } from "@angular/router";
import { UserService } from "../user/user.service";
import { User } from "src/app/domain/user";

@Injectable({
  providedIn: "root"
})
export class AuthenticationService {
  userData: Observable<firebase.User>;

  constructor(
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public userService: UserService
  ) {
    this.userData = angularFireAuth.authState;
  }

  /* Sign up */
  // Send email verfificaiton when new user sign up
  SendVerificationMail() {
    return this.angularFireAuth.auth.currentUser
      .sendEmailVerification()
      .then(() => {
        console.log("Email send");
      });
  }
  // Sign up with email/password
  SignUp(email, password, user: User) {
    return this.angularFireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.createUserDoc(user);
        // this.SendVerificationMail(); // Sending email verification notification, when new user registers
        this.router.navigate(["login"]);
      })
      .catch(e => {
        console.log(e);
      });
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.angularFireAuth.auth
      .signInWithEmailAndPassword(email, password)
      .then(result => {
        if (result.user.emailVerified !== true) {
          window.alert("Bevestig je account!");
        } else {
          this.router.navigate(["transacties"]);
        }
      })
      .catch(error => {
        window.alert(error.message);
      });
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth.auth.signOut();
  }

  /*create firestore user*/
  createUserDoc(user: User) {
    const uid = this.angularFireAuth.auth.currentUser.uid;
    this.userService.createUser(user, uid);
  }
}
