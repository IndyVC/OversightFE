import { Component, OnInit } from "@angular/core";
import {
  FormControl,
  FormGroup,
  Validators,
  FormBuilder
} from "@angular/forms";
import { UserService } from "src/app/services/user/user.service";
import { sha256, sha224 } from "js-sha256";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { MatDialog, MatDialogConfig } from "@angular/material";
import { EmailNotVerifiedComponent } from "../dialogs/email-not-verified/email-not-verified.component";
import { Router } from "@angular/router";
import { NoValidCombinationComponent } from "../dialogs/no-valid-combination/no-valid-combination.component";

@Component({
  selector: "app-login",
  templateUrl: "./login.component.html",
  styleUrls: ["./login.component.css"]
})
export class LoginComponent implements OnInit {
  login: FormGroup;

  constructor(
    private fb: FormBuilder,
    public authenticationService: AuthenticationService,
    private dialog: MatDialog,
    private router: Router
  ) {}

  ngOnInit() {
    this.login = this.fb.group({
      email: ["", [Validators.required, Validators.email]],
      password: ["", [Validators.required]]
    });
  }

  onSubmit() {
    const email = this.login.get("email").value;
    const password = this.login.get("password").value;
    this.authenticationService
      .SignIn(email, password)
      .then(e => {
        if (
          this.authenticationService.angularFireAuth.auth.currentUser
            .emailVerified === false
        ) {
          this.openEmailNotVerifiedDialog();
        } else {
          this.router.navigate(["transacties"]);
        }
      })
      .catch(e => {
        this.openNoValidCombinationDialog();
      });
  }

  resetPassword() {

    // this.authenticationService.resetPassword();
  }
  openEmailNotVerifiedDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(EmailNotVerifiedComponent, dialogConfig);
  }
  openNoValidCombinationDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(NoValidCombinationComponent, dialogConfig);
  }

  getErrorMessage(field: string) {
    if (field === "email") {
      if (this.login.get("email").hasError("required")) {
        return "Email is verplicht.";
      } else if (this.login.get("email").hasError("email")) {
        return "Geef een geldig email adres.";
      }
    } else if (field === "password") {
      if (this.login.get("password").hasError("required")) {
        return "Wachtwoord is verplicht.";
      }
    }
  }
}
