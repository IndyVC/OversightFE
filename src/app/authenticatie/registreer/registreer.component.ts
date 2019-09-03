import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { FormGroup, FormControl, Validators, FormBuilder } from '@angular/forms';
import { map } from 'rxjs/operators';
import { User } from 'src/app/domain/user';
import { sha256, sha224 } from 'js-sha256';
import { Router } from '@angular/router';

@Component({
  selector: 'app-registreer',
  templateUrl: './registreer.component.html',
  styleUrls: ['./registreer.component.css']
})
export class RegistreerComponent implements OnInit {

  public register: FormGroup;
  public uniqueEmail: boolean;
  private emails: any;

  constructor(
    private fb: FormBuilder,
    private userService: UserService,
    private router:Router
  ) {
  }

  ngOnInit() {
    this.uniqueEmail = true;
    this.register = this.fb.group({
      active: false,
      email: ['', [Validators.required, Validators.email]],
      firstname: ['', Validators.required],
      lastname: ['', Validators.required],
      pincode: ['', [Validators.required, Validators.pattern("[0-9]{4,}")]],
      age: ['', [Validators.required]],
      verificationNumber: ['', Validators.required],
    });

    this.userService.readEmails().subscribe(
      emails => {
        this.emails = emails;
      }
    );
  }


  onSubmit() {
    this.uniqueEmail=true;
    if (this.emails) {
      const length = this.emails.length;
      for (let i = 0; i < length; i++) {
        if (this.emails[i].email == this.register.get('email').value) {
          this.uniqueEmail = false;
        }
      }
      if (this.uniqueEmail) {
        const user: User = this.mapFormGroupToUser(this.register);
        this.userService.createUser(user);
        this.router.navigate(['../login']);
      }
    }
  }

  getErrorMessage(field: string) {
    if (field === "email") {
      if (this.register.get('email').hasError('required')) {
        return 'Email is verplicht.'
      } else if (this.register.get('email').hasError('email')) {
        return 'Geef een geldig email adres.'
      }
    } else if (field === "pincode") {
      if (this.register.get('pincode').hasError('required')) {
        return 'Pincode is verplicht.'
      } else if (this.register.get('pincode').hasError('pattern')) {
        return 'Pincode moet minstens 4 cijfers lang zijn.'
      }
    } else if (field === "firstname") {
      if (this.register.get('firstname').hasError('required')) {
        return 'Voornaam is verplicht.'
      }
    } else if (field === "lastname") {
      if (this.register.get('lastname').hasError('required')) {
        return 'Familienaam is verplicht.'
      }
    } else if (field === "age") {
      if (this.register.get('age').hasError('required')) {
        return 'Leeftijd is verplicht.'
      }
    } else if (field === "verificationNumber") {
      if (this.register.get('verificationNumber').hasError('required')) {
        return 'Verificatie nummer is verplicht.'
      }
    } else if (field === 'uniqueEmail') {
      return 'Email is al in gebruik.'
    }

  }

  mapFormGroupToUser(fg: FormGroup): User {
    let user: User = new User(
      fg.get('firstname').value,
      fg.get('lastname').value,
      fg.get('email').value,
      fg.get('active').value,
      sha256(fg.get('pincode').value),
      [],
      [],
      [],
      [],
      [],
      []);

    return user;
  }

}
