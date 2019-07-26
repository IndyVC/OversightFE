import { Category } from './category';
import { Period } from './period.enum';
import { BankAccount } from './account';

export class Transaction {
  constructor(
    private _ID: number,
    private _name: string,
    private _amount: number,
    private _date: Date,
    private _category: Category,
    private _period: Period,
    private _account: BankAccount
  ) {
    this._category = Category.fromJSON(this._category);
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
  get period(): Period {
    return this._period;
  }
  get account(): BankAccount {
    return this._account;
  }

  static fromJSON(json: any): Transaction {
    return new Transaction(
      json.ID,
      json.name,
      json.amount,
      json.date,
      json.category,
      json.period,
      json.account
    );
  }
}
