import { Transaction } from './transaction';

export class Category {
  constructor(
    private _ID: number,
    private _name: string,
    private _icon: string,
    private _color: string,
    private _type: string
  ) {}

  get ID(): number {
    return this._ID;
  }
  get name(): string {
    return this._name;
  }
  get icon(): string {
    return this._icon;
  }
  get color(): string {
    return this._color;
  }
  get type(): string {
    return this._type;
  }
  static fromJSON(json: any): Category {
    return new Category(json.ID, json.name, json.icon, json.color, json.type);
  }
}
