import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-used-by-transactions",
  templateUrl: "./used-by-transactions.component.html",
  styleUrls: ["./used-by-transactions.component.css"]
})
export class UsedByTransactionsComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<UsedByTransactionsComponent>) {}

  ngOnInit() {}

  close() {
    this.dialogRef.close();
  }

  submit() {
    this.dialogRef.close("confirmed");
  }
}
