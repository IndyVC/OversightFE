import { Component, OnInit, Inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

@Component({
  selector: 'app-new-transaction',
  templateUrl: './new-transaction.component.html',
  styleUrls: ['./new-transaction.component.css']
})
export class NewTransactionComponent implements OnInit {
  public form: FormGroup;
  public name: string;
  @Inject(MAT_DIALOG_DATA) data;

  constructor(
    private _fb: FormBuilder,
    private _dialogRef: MatDialogRef<NewTransactionComponent>
  ) {}

  ngOnInit() {
    this.form = this._fb.group({
      name: this._fb.control('', [Validators.required])
    });
  }
  save() {
    this._dialogRef.close(this.form.value);
  }

  close() {
    this._dialogRef.close();
  }
}
