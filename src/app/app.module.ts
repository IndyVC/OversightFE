import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {
  MatButtonModule,
  MatCheckboxModule,
  MatInputModule,
  MatFormFieldModule,
  MatIconModule,
  MatSidenavModule,
  MatTabsModule,
  MatSelectModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCardModule,
  MatDialogModule,
  MatRadioModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { MenuComponent } from './menu/menu.component';
import { LandingPageComponent } from './landing-page/landing-page.component';
import { AuthenticatieModule } from './authenticatie/authenticatie.module';
import { LoginComponent } from './authenticatie/login/login.component';
import { RegistreerComponent } from './authenticatie/registreer/registreer.component';
import { TransactieComponent } from './finance/transacties/transactie.component';
import { ChartsModule } from 'ng2-charts';
import { AppRoutingModule } from './app-routing/app-routing.module';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { NewTransactionComponent } from './finance/dialogs/new-transaction/new-transaction.component';
import { FinanceModule } from './finance/finance.module';
import { ReactiveFormsModule, FormsModule } from '@angular/forms';
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
    MatInputModule,
    MatButtonModule,
    MatCheckboxModule,
    MatFormFieldModule,
    MatIconModule,
    MatSidenavModule,
    MatSelectModule,
    MatDatepickerModule,
    MatNativeDateModule,
    AuthenticatieModule,
    ChartsModule,
    MatTabsModule,
    AppRoutingModule,
    ScrollingModule,
    MatCardModule,
    FinanceModule,
    MatDialogModule,
    ReactiveFormsModule,
    FormsModule,
    MatRadioModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  entryComponents: [NewTransactionComponent]
})
export class AppModule {}
