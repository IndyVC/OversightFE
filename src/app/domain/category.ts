import { Transaction } from './transaction';

export class Category {
  constructor(
    public name: string,
    public icon: string,
    public color: string,
    public type: string
  ) {}

  public static fromJSON(json:any){
      return new Category(json.name,json.icon,json.color,json.type);
  }
}
