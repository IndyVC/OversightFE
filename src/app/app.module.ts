import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AppComponent } from "./app.component";
import { MenuComponent } from "./menu/menu.component";
import { LandingPageComponent } from "./landing-page/landing-page.component";
import { AuthenticatieModule } from "./authenticatie/authenticatie.module";
import { LoginComponent } from "./authenticatie/login/login.component";
import { RegistreerComponent } from "./authenticatie/registreer/registreer.component";
import { TransactieComponent } from "./finance/transacties/transactie.component";
import { ChartsModule } from "ng2-charts";
import { AppRoutingModule } from "./app-routing/app-routing.module";
import { ScrollingModule } from "@angular/cdk/scrolling";
import { NewTransactionComponent } from "./finance/dialogs/new-transaction/new-transaction.component";
import { FinanceModule } from "./finance/finance.module";
import { ReactiveFormsModule, FormsModule } from "@angular/forms";
import { environment } from "src/environments/environment";
import { AngularFireModule } from "@angular/fire";
import { AngularFirestoreModule } from "@angular/fire/firestore";
import { AngularFireAuthModule } from "@angular/fire/auth";
import { UserService } from "./services/user/user.service";
import { TransactionService } from "./services/transaction/transaction.service";
import { MaterialModule } from "./material/material.module";
import { UsedEmailComponent } from "./authenticatie/dialogs/used-email/used-email.component";
import { EmailNotVerifiedComponent } from "./authenticatie/dialogs/email-not-verified/email-not-verified.component";
import { NoValidCombinationComponent } from "./authenticatie/dialogs/no-valid-combination/no-valid-combination.component";
import { ResetPasswordComponent } from './authenticatie/dialogs/reset-password/reset-password.component';

@NgModule({
  declarations: [
    AppComponent,
    MenuComponent,
    LandingPageComponent,
    LoginComponent,
    RegistreerComponent,
    TransactieComponent,
    NewTransactionComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    AuthenticatieModule,
    ChartsModule,
    AppRoutingModule,
    ScrollingModule,
    FinanceModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFirestoreModule,
    AngularFireAuthModule,
    MaterialModule,
  ],
  providers: [UserService, TransactionService, MaterialModule],
  bootstrap: [AppComponent],
  entryComponents: [
    NewTransactionComponent,
    UsedEmailComponent,
    EmailNotVerifiedComponent,
    NoValidCombinationComponent,
    ResetPasswordComponent
  ]
})
export class AppModule {}
