import { Component, OnInit } from "@angular/core";
import { UserService } from "src/app/services/user/user.service";
import {
  FormGroup,
  FormControl,
  Validators,
  FormBuilder
} from "@angular/forms";
import { map } from "rxjs/operators";
import { User } from "src/app/domain/user";
import { sha256, sha224 } from "js-sha256";
import { Router } from "@angular/router";
import { AuthenticationService } from "src/app/services/authentication/authentication.service";
import { MatDialogConfig, MatDialog } from "@angular/material";
import { UsedEmailComponent } from "../dialogs/used-email/used-email.component";

@Component({
  selector: "app-registreer",
  templateUrl: "./registreer.component.html",
  styleUrls: ["./registreer.component.css"]
})
export class RegistreerComponent implements OnInit {
  public register: FormGroup;

  constructor(
    private fb: FormBuilder,
    private authService: AuthenticationService,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.register = this.fb.group({
      active: false,
      email: ["", [Validators.required, Validators.email]],
      firstname: ["", Validators.required],
      lastname: ["", Validators.required],
      password: ["", [Validators.required]],
      age: ["", [Validators.required]]
    });
  }

  onSubmit() {
    const email = this.register.get("email").value;
    const password = this.register.get("password").value;
    this.authService
      .SignUp(email, password, this.mapFormGroupToUser(this.register))
      .catch(e => {
        this.openUsedEmailDialog();
      });
  }

  openUsedEmailDialog() {
    const dialogConfig = new MatDialogConfig();
    dialogConfig.autoFocus = true;
    this.dialog.open(UsedEmailComponent, dialogConfig);
  }

  getErrorMessage(field: string) {
    if (field === "email") {
      if (this.register.get("email").hasError("required")) {
        return "Email is verplicht.";
      } else if (this.register.get("email").hasError("email")) {
        return "Geef een geldig email adres.";
      }
    } else if (field === "password") {
      if (this.register.get("password").hasError("required")) {
        return "Pincode is verplicht.";
      }
    } else if (field === "firstname") {
      if (this.register.get("firstname").hasError("required")) {
        return "Voornaam is verplicht.";
      }
    } else if (field === "lastname") {
      if (this.register.get("lastname").hasError("required")) {
        return "Familienaam is verplicht.";
      }
    } else if (field === "age") {
      if (this.register.get("age").hasError("required")) {
        return "Leeftijd is verplicht.";
      }
    }
  }

  mapFormGroupToUser(fg: FormGroup): User {
    const user: User = new User(
      fg.get("firstname").value,
      fg.get("lastname").value,
      fg.get("email").value,
      fg.get("active").value,
      [],
      [],
      [],
      [],
      [],
      []
    );

    return user;
  }
}
