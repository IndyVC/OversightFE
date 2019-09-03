import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators, FormBuilder } from '@angular/forms';
import { UserService } from 'src/app/services/user/user.service';
import { sha256, sha224 } from 'js-sha256';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  login: FormGroup;
  loginUseraccounts: any;
  succes:boolean=false;
  constructor(
    private fb: FormBuilder,
    private userService: UserService
  ) { }

  ngOnInit() {
    this.succes=false;
    this.login = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      pincode: ['', [Validators.required, Validators.pattern("[0-9]{4,}")]]
    });
    this.userService.readLoginUser().subscribe(login => {
      this.loginUseraccounts = login;
    });

  }

  onSubmit() {
    this.succes=false;
    if (this.loginUseraccounts) {
      const length = this.loginUseraccounts.length;
      for (let i = 0; i < length; i++) {
        if ((this.loginUseraccounts[i].email == this.login.get('email').value) && this.loginUseraccounts[i].pincode === sha256(this.login.get('pincode').value) && this.login.valid===true) {
          this.succes=true;
        }
      }
    }
  }
  getErrorMessage(field: string) {
    if (field === "email") {
      if (this.login.get('email').hasError('required')) {
        return 'Email is verplicht.'
      } else if (this.login.get('email').hasError('email')) {
        return 'Geef een geldig email adres.'
      }
    } else if (field === "pincode") {
      if (this.login.get('pincode').hasError('required')) {
        return 'Pincode is verplicht.'
      } else if (this.login.get('pincode').hasError('pattern')) {
        return 'Pincode moet minstens 4 cijfers lang zijn.'
      }
    }
  }

}
