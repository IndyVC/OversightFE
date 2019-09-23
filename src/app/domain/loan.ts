import { Audit } from "./audit";

export class Loan {
  public id: string;
  constructor(
    public name: string,
    public currentAmount: number,
    public totalAmount: number,
    public dateStart: Date,
    public dateEnd: Date
  ) {}

  static fromJSON(json: any): Loan {
    return new Loan(
      json.name,
      parseFloat(json.currentAmount),
      parseFloat(json.totalAmount),
      json.dateStart.toDate(),
      json.dateEnd.toDate()
    );
  }

  updateCurrentAmount(update: number) {
    this.currentAmount = update;
  }
}
