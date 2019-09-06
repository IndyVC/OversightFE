import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsedEmailComponent } from "./dialogs/used-email/used-email.component";
import { MaterialModule } from "../material/material.module";

@NgModule({
  declarations: [UsedEmailComponent],
  imports: [CommonModule, MaterialModule]
})
export class AuthenticatieModule {}
