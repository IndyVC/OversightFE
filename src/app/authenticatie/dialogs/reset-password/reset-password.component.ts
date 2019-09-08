import { Component, OnInit, Inject } from "@angular/core";
import {
  FormBuilder,
  FormGroup,
  FormControl,
  Validators
} from "@angular/forms";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material";

@Component({
  selector: "app-reset-password",
  templateUrl: "./reset-password.component.html",
  styleUrls: ["./reset-password.component.css"]
})
export class ResetPasswordComponent implements OnInit {
  form: FormGroup;
  email: string;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<ResetPasswordComponent>,
    @Inject(MAT_DIALOG_DATA) data
  ) {}

  ngOnInit() {
    this.form = this._fb.group({
      email: ["", [Validators.required]]
    });
  }

  onSubmit() {
    this.save();
  }

  save() {
    console.log("save");
    this._dialogRef.close(this.form);
  }

  close() {
    this._dialogRef.close();
  }

  getErrorMessage(field: string) {
    if (field === "email") {
      if (this.form.get("email").hasError("required")) {
        return "Email is verplicht.";
      } else if (this.form.get("email").hasError("email")) {
        return "Geef een geldig email adres.";
      }
    }
  }
}
