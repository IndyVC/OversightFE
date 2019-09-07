import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material';
import { UsedEmailComponent } from '../used-email/used-email.component';

@Component({
  selector: 'app-email-not-verified',
  templateUrl: './email-not-verified.component.html',
  styleUrls: ['./email-not-verified.component.css']
})
export class EmailNotVerifiedComponent implements OnInit {

  constructor(private dialogRef: MatDialogRef<UsedEmailComponent>) { }

  ngOnInit() {
  }

  close() {
    this.dialogRef.close();
  }
}
