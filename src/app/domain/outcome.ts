import { Transaction } from "./transaction";

export class Outcome extends Transaction {
  static fromJSON(json: any): Outcome {
    return new Outcome(
      json.name,
      parseFloat(json.amount),
      json.date,
      json.account
    );
  }

  super() {
    this.account.decreaseBalance(this.amount);
  }
}
