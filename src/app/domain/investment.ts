import { Audit } from './audit';

export class Investment {
  constructor(
    private _ID: number,
    private _name: string,
    private _start: number,
    private _current: number,
    private _dateStart: Date,
    private _audits?: Audit[]
  ) {
    if (this._audits != null) this._audits.map(audit => Audit.fromJSON(audit));
  }

  get ID(): number {
    return this._ID;
  }

  get name(): string {
    return this._name;
  }
  get start(): number {
    return this._start;
  }
  get current(): number {
    return this._current;
  }
  get dateStart(): Date {
    return this._dateStart;
  }
  get audits(): Audit[] {
    return this._audits;
  }

  static fromJSON(json: any): Investment {
    return new Investment(
      json.ID,
      json.name,
      json.start,
      json.current,
      json.dateStart,
      json.audits
    );
  }

  public updateCurrent(newCurrent: number): void {
    this._current = newCurrent;
    this.addAudit(newCurrent);
  }

  public addAudit(amount: number) {
    this._audits.push(new Audit(this.ID, name, new Date(), amount));
  }
}
