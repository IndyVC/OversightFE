import { Transaction } from './transaction';

export class Outcome extends Transaction {
  super() {
    this.account.decreaseBalance(this.amount);
  }
}
