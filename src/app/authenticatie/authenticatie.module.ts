import { NgModule } from "@angular/core";
import { CommonModule } from "@angular/common";
import { UsedEmailComponent } from "./dialogs/used-email/used-email.component";
import { MaterialModule } from "../material/material.module";
import { EmailNotVerifiedComponent } from "./dialogs/email-not-verified/email-not-verified.component";
import { NoValidCombinationComponent } from "./dialogs/no-valid-combination/no-valid-combination.component";

@NgModule({
  declarations: [
    UsedEmailComponent,
    EmailNotVerifiedComponent,
    NoValidCombinationComponent
  ],
  imports: [CommonModule, MaterialModule]
})
export class AuthenticatieModule {}
