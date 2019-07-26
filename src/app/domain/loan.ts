import { Period } from './period.enum';
import { Audit } from './audit';

export class Loan {
  constructor(
    private _ID: number,
    private _name: string,
    private _loan: number,
    private _current: number,
    private _amount: number,
    private _dateStart: Date,
    private _dateEnd: Date,
    private _description: string,
    private _period: Period,
    private _audits: Audit[]
  ) {
    if(this._audits!=null)this._audits.map(audit => Audit.fromJSON(audit));
  }

  get ID(): number {
    return this._ID;
  }
  get name(): string {
    return this._name;
  }
  get loan(): number {
    return this._loan;
  }
  get current(): number {
    return this._current;
  }
  get amount(): number {
    return this._amount;
  }
  get dateStart(): Date {
    return this._dateStart;
  }
  get dateEnd(): Date {
    return this._dateEnd;
  }
  get description(): string {
    return this._description;
  }
  get period(): Period {
    return this._period;
  }

  static fromJSON(json: any): Loan {
    return new Loan(
      json.ID,
      json.name,
      json.loan,
      json.current,
      json.amount,
      json.dateStart,
      json.dateEnd,
      json.description,
      json.period,
      json.audits
    );
  }
  public updateCurrent(newCurrent: number): void {
    this._current = newCurrent;
    if (this._current === newCurrent) {
      this._dateEnd = new Date();
    }
    this.addAudit(newCurrent);
  }

  public addAudit(amount: number) {
    this._audits.push(new Audit(this.ID, name, new Date(), amount));
  }
}
