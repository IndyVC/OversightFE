import { Component, OnInit } from "@angular/core";
import { MatDialogRef } from "@angular/material";

@Component({
  selector: "app-used-email",
  templateUrl: "./used-email.component.html",
  styleUrls: ["./used-email.component.css"]
})
export class UsedEmailComponent implements OnInit {
  constructor(private dialogRef: MatDialogRef<UsedEmailComponent>) {}

  ngOnInit() {}

  close(){
    this.dialogRef.close();
  }
}
