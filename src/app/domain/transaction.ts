import { Category } from './category';
import { BankAccount } from './account';

export class Transaction {
  constructor(
    private _name: string,
    private _amount: number,
    private _date: Date,
    private _category: Category,
    private _account: BankAccount,
    private _ID?: number
  ) {
  }

  get ID(): number {
    return this._ID;
  }
  get name(): string {
    return this._name;
  }
  get amount(): number {
    return this._amount;
  }
  get date(): Date {
    return this._date;
  }
  get category(): Category {
    return this._category;
  }
  get account(): BankAccount {
    return this._account;
  }

  static fromJSON(json: any): Transaction {
    return new Transaction(
      json.name,
      json.amount,
      json.date,
      json.category,
      json.account,
      json.ID
    );
  }
}
