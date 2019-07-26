export class Audit {
  constructor(
    private _ID: number,
    private _name: string,
    private _date: Date,
    private _amount: number
  ) {}

  public get ID(): number {
    return this._ID;
  }
  public get name(): string {
    return this._name;
  }
  public get date(): Date {
    return this._date;
  }
  public get amount(): number {
    return this._amount;
  }
  static fromJSON(json: any): Audit {
    return new Audit(json.ID, json.name, json.date, json.amount);
  }
}
