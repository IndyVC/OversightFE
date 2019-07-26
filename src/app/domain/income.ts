import { Transaction } from './transaction';

export class Income extends Transaction {
  super() {
    this.account.increaseBalance(this.amount);
  }
}
