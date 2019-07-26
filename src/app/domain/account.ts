export class BankAccount {
  constructor(
    private _accountNumber: string,
    private _balance: number,
    private _bank: string,
    private _type: string
  ) {}

  get accountNumber() {
    return this._accountNumber;
  }
  get balance(): number {
    return this._balance;
  }
  get bank(): string {
    return this._bank;
  }
  get type(): string {
    return this._type;
  }

  public static fromJSON(json: any): BankAccount {
    return new BankAccount(
      json.accountNumber,
      json.balance,
      json.bank,
      json.type
    );
  }

  public increaseBalance(amount: number) {
    this._balance += amount;
  }
  public decreaseBalance(amount: number) {
    this._balance -= amount;
  }
}
