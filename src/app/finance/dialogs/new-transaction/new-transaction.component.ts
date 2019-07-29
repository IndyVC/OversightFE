import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Category } from 'src/app/domain/category';
import { BankAccount } from 'src/app/domain/account';
import { MockService } from 'src/app/mock.service';
import { User } from 'src/app/domain/user';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent implements OnInit {
  public user: User;
  public form: FormGroup;
  public type: string;
  public name: string;
  public amount: number;
  public date: Date;
  public category: Category;
  public account: BankAccount;

  @Inject(MAT_DIALOG_DATA) data;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<NewTransactionComponent>,
    private _mockService: MockService
  ) {
    this.user = _mockService.getIndy();
  }

  ngOnInit() {
    this.form = this._fb.group({
      type: this._fb.control('', [Validators.required]),
      name: this._fb.control('', [Validators.required]),
      amount: this._fb.control('', [Validators.required]),
      date: this._fb.control(''),
      category: this._fb.control('', [Validators.required]),
      account: this._fb.control('', [Validators.required])
    });
  }
  save() {
    if (this.form.value.type === 'income') {
      this.user.createIncome(this.form);
    } else {
      this.user.createOutcome(this.form);
    }
  }

  close() {
    this._dialogRef.close();
  }
}
