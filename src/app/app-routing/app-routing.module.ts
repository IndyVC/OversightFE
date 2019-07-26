import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {
  RouterModule,
  Routes,
  Router,
  PreloadAllModules
} from '@angular/router';
import { TransactieComponent } from '../finance/transacties/transactie.component';

const routes: Routes = [
  { path: 'transacties', component: TransactieComponent },
  { path: '', pathMatch: 'full', redirectTo: 'transacties' }
];
@NgModule({
  declarations: [],
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
