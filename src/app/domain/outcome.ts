import { Transaction } from "./transaction";
import { BankAccount } from './account';

export class Outcome extends Transaction {
  static fromJSON(json: any): Outcome {
    return new Outcome(
      json.name,
      parseFloat(json.amount.toString()),
      json.date.toDate(),
      json.account
    );
  }

  super() {
  }
}
