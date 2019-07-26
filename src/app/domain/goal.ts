export class Goal {
  constructor(
    private _ID: number,
    private _name: string,
    private _description: string,
    private _goal: number,
    private _current: number,
    private _dateStart: Date
  ) {}

  get ID(): number {
    return this._ID;
  }

  get name(): string {
    return this._name;
  }
  get description(): string {
    return this._description;
  }
  get goal(): number {
    return this._goal;
  }
  get current(): number {
    return this._current;
  }
  get dateStart(): Date {
    return this._dateStart;
  }
  static fromJSON(json: any): Goal {
    return new Goal(
      json.ID,
      json.name,
      json.description,
      json.goal,
      json.current,
      json.dateStart
    );
  }

  public updateCurrent(newCurrent: number): void {
    this._current = newCurrent;
  }
}
