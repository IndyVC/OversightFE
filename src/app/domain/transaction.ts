import { Category } from "./category";
import { BankAccount } from "./account";
import { CategoryService } from "../services/category/category.service";

export class Transaction {
  public id;
  public category: Category;
  public categoryService: CategoryService;
  constructor(
    public name: string,
    public amount: number,
    public date: Date,
    public account: BankAccount
  ) {}
}
