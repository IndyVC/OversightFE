import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  Routes,
  Router,
  PreloadAllModules
} from '@angular/router';
import { TransactieComponent } from '../finance/transacties/transactie.component';
import { LoginComponent } from '../authenticatie/login/login.component';
import { RegistreerComponent } from '../authenticatie/registreer/registreer.component';
import { LandingPageComponent } from '../landing-page/landing-page.component';

const routes: Routes = [
  { path: 'landingPage',component:LandingPageComponent},
  { path: 'register',component: RegistreerComponent},
  { path: 'login',component:LoginComponent},
  { path: 'transacties', component: TransactieComponent },
  { path: '', pathMatch: 'full', redirectTo: 'landingPage' }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
