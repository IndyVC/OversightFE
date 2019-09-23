import { Transaction } from "./transaction";
import { BankAccount } from "./account";
import { Category } from "./category";

export class Income extends Transaction {
  static fromJSON(json: any): Income {
    return new Income(
      json.name,
      parseFloat(json.amount.toString()),
      json.date.toDate(),
      json.account
    );
  }
  super() {
    this.account.increaseBalance(this.amount);
  }
}
