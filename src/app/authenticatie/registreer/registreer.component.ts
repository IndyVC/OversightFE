import { Component, OnInit } from '@angular/core';
import { UserService } from 'src/app/services/user/user.service';
import { FormGroup } from '@angular/forms';

@Component({
  selector: 'app-registreer',
  templateUrl: './registreer.component.html',
  styleUrls: ['./registreer.component.css']
})
export class RegistreerComponent implements OnInit {
  registerForm: FormGroup;
  uniqueEmail = true;
  constructor(private userService: UserService) {
    this.registerForm = userService.register;
  }

  ngOnInit() {
  }

  onSubmit() {
    if(this.userService.isUniqueEmail(this.registerForm.get('email').value)){
      this.registerForm.get('verificationDate').setValue(new Date().toString());
      let data = this.registerForm.value;
      this.userService.createUser(data)
      .then(res=>{
        console.log(res);
      })
    }else{
      this.uniqueEmail = false;
      this.getErrorMessage('uniqueEmail');
    }
  }

  getErrorMessage(field: string) {
    if (field === "email") {
      if (this.registerForm.get('email').hasError('required')) {
        return 'Email is verplicht.'
      } else if (this.registerForm.get('email').hasError('email')) {
        return 'Geef een geldig email adres.'
      }
    } else if (field === "pincode") {
      if (this.registerForm.get('pincode').hasError('required')) {
        return 'Pincode is verplicht.'
      } else if (this.registerForm.get('pincode').hasError('pattern')) {
        return 'Pincode moet minstens 4 cijfers lang zijn.'
      }
    } else if (field === "firstname") {
      if (this.registerForm.get('firstname').hasError('required')) {
        return 'Voornaam is verplicht.'
      }
    } else if (field === "lastname") {
      if (this.registerForm.get('lastname').hasError('required')) {
        return 'Familienaam is verplicht.'
      }
    } else if (field === "age") {
      if (this.registerForm.get('age').hasError('required')) {
        return 'Leeftijd is verplicht.'
      }
    } else if (field === "verification") {
      if (this.registerForm.get('verification').hasError('required')) {
        return 'Verificatie nummer is verplicht.'
      }
    } else if(field === 'uniqueEmail'){
      return 'Email is al in gebruik.'
    }

  }

}
