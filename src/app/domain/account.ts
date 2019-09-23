export class BankAccount {
  public id:string;
  constructor(
    public accountNumber: string,
    public balance: number,
    public bank: string,
    public type: string
  ) {}

  public static fromJSON(json: any): BankAccount {
    return new BankAccount(
      json.accountNumber,
      json.balance,
      json.bank,
      json.type
    );
  }

  public increaseBalance(amount: number) {
    this.balance += amount;
  }
  public decreaseBalance(amount: number) {
    this.balance -= amount;
  }
}
