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
  constructor(
    public angularFireAuth: AngularFireAuth,
    public router: Router,
    public ngZone: NgZone,
    public userService: UserService
  ) {}

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
    console.log(email, password, user);
    return this.angularFireAuth.auth
      .createUserWithEmailAndPassword(email, password)
      .then(result => {
        this.createUserDoc(user);
        this.SendVerificationMail(); // Sending email verification notification, when new user registers
        this.router.navigate(["login"]);
      });
  }

  // Sign in with email/password
  SignIn(email, password) {
    return this.angularFireAuth.auth.signInWithEmailAndPassword(
      email,
      password
    );
  }

  /* Sign out */
  SignOut() {
    this.angularFireAuth.auth.signOut();
  }

  /*create firestore user*/
  createUserDoc(user: User) {
    const uid = this.angularFireAuth.auth.currentUser.uid;
    console.log(user);
    this.userService.createUser(user);
  }

  resetPassword(email: string) {
    this.angularFireAuth.auth
      .sendPasswordResetEmail(email)
      .then(function() {
        console.log("email reset password is verstuurd");
      })
      .catch(function(error) {
        // An error happened.
      });
  }
}
