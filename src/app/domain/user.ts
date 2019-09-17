import { Transaction } from "./transaction";
import { Category } from "./category";
import { Goal } from "./goal";
import { Investment } from "./investment";
import { Loan } from "./loan";
import { Income } from "./income";
import { Outcome } from "./outcome";
import { BankAccount } from "./account";
import { FormGroup } from "@angular/forms";

export class User {
  public oversight?: number;
  public debt?: number;
  public shortOversight?: number;
  constructor(
    public firstname: string,
    public lastname: string,
    public email: string,
    public active: boolean,
    public accounts?: BankAccount[],
    public transactions?: Transaction[],
    public categories?: Category[],
    public goals?: Goal[],
    public investments?: Investment[],
    public loans?: Loan[]
  ) {}

  public static fromJSON(json: any): User {
    const user: User = new User(
      json.firstname,
      json.lastname,
      json.email,
      json.active
    );
    return user;
  }

  public calculateDebt(): number {
    let debt = 0;

    this.loans.map(loan => {
      debt += loan.loan;
      debt -= loan.current;
    });

    return debt;
  }
  public calculateOversight(): number {
    let oversight = 0;
    if (this.accounts) {
      this.accounts.map(account => {
        oversight += account.balance;
      });
    }
    if (this.investments) {
      this.investments.map(investment => {
        oversight += investment.current;
      });
    }

    return oversight - this.debt;
  }

  public calculateShortOversight(): number {
    let shortOversight = 0;
    if (this.getIncomesFromMonth(new Date())) {
      this.getIncomesFromMonth(new Date()).forEach(
        income => (shortOversight += income.amount)
      );
    }
    if (this.getOutcomesFromMonth(new Date())) {
      this.getOutcomesFromMonth(new Date()).forEach(
        outcome => (shortOversight -= outcome.amount)
      );
    }

    return shortOversight;
  }

  getAllTransactions(): Transaction[] {
    if (this.transactions) {
      return this.transactions.sort((recent, old) => {
        if (recent.date.getFullYear() !== old.date.getFullYear()) {
          return recent.date.getFullYear() - old.date.getFullYear();
        } else if (recent.date.getMonth() !== old.date.getMonth()) {
          return recent.date.getMonth() - old.date.getMonth();
        } else if (recent.date.getDate() !== old.date.getDate()) {
          return recent.date.getDate() - old.date.getDate();
        } else if (recent.date.getTime() !== old.date.getTime()) {
          return recent.date.getMilliseconds() - old.date.getMilliseconds();
        }
      });
    }
  }
  getTransactionById(ID: number): Transaction {
    return this.transactions.find(trans => trans.ID === ID);
  }
  getTransactionsByName(name: string): Transaction[] {
    return this.transactions.filter(trans => trans.name === name);
  }
  getAllOutcomes(): Transaction[] {
    if (this.getAllTransactions()) {
      return this.getAllTransactions()
        .filter(trans => trans instanceof Outcome)
        .reverse();
    }
  }
  getAllIncomes(): Transaction[] {
    if (this.getAllTransactions()) {
      return this.getAllTransactions()
        .filter(trans => trans instanceof Income)
        .reverse();
    }
  }
  createOutcome(form: FormGroup) {
    return null;
  }
  createIncome(form: FormGroup) {
    const income = new Income(
      form.value.name,
      form.value.amount,
      form.value.date,
      form.value.category,
      form.value.account
    );
    console.log(income);
  }
  deleteOutcome(ID: number) {
    return null;
  }
  deleteIncome(ID: number) {
    return null;
  }
  getTransactionsFromMonth(date: Date) {
    if (this.getAllTransactions()) {
      return this.getAllTransactions().filter(
        trans =>
          trans.date.getMonth() === date.getMonth() &&
          trans.date.getFullYear() === trans.date.getFullYear()
      );
    }
  }

  getIncomesFromMonth(date: Date) {
    if (this.getAllIncomes()) {
      return this.getAllIncomes().filter(
        trans =>
          trans.date.getMonth() === date.getMonth() &&
          trans.date.getFullYear() === trans.date.getFullYear()
      );
    }
  }
  getIncomesFromYear(date: Date) {
    if (this.getAllTransactions()) {
      return this.getAllIncomes().filter(
        trans => trans.date.getFullYear() === trans.date.getFullYear()
      );
    }
  }
  getOutcomesFromMonth(date: Date) {
    if (this.getAllOutcomes()) {
      return this.getAllOutcomes().filter(
        trans =>
          trans.date.getMonth() === date.getMonth() &&
          trans.date.getFullYear() === date.getFullYear()
      );
    }
  }

  getOutcomesFromYear(date: Date) {
    if (this.getAllOutcomes()) {
      return this.getAllOutcomes().filter(
        trans => trans.date.getFullYear() === trans.date.getFullYear()
      );
    }
  }

  calculateTotalSpendOnCategory(category: Category) {
    const date: Date = new Date();
    if (this.getAllTransactions()) {
      const transactions: Transaction[] = this.getAllTransactions().filter(
        t =>
          t.category.type === category.type &&
          t.category.name === category.name &&
          (t.date.getMonth() === date.getMonth() &&
            t.date.getFullYear() === date.getFullYear())
      );
      let sum = 0;
      transactions.forEach(e => (sum += e.amount));
      return sum;
    }
  }
  calculateSpendThisMonthOnCategory(category: Category) {
    if (this.getAllTransactions()) {
      const transactions: Transaction[] = this.getAllTransactions().filter(
        t =>
          t.category.type === category.type && t.category.name === category.name
      );
    }
  }
  getAllCategories(): Category[] {
    return this.categories;
  }
  getIncomeCategories(): Category[] {
    return this.categories.filter(cat => cat.type === "income");
  }
  getOutcomeCategories(): Category[] {
    return this.categories.filter(cat => cat.type === "outcome");
  }

  getCategoryByName(name: string): Category {
    return this.categories.find(cat => cat.name === name);
  }
  deleteCategory(ID: number) {
    return null;
  }
  createCategory(name, icon) {
    return null;
  }

  getAllInvestments(): Investment[] {
    return this.investments;
  }
  getInvestmentById(ID: number): Investment {
    return this.investments.find(inv => inv.ID === ID);
  }
  getInvestmentByName(name: string): Investment {
    return this.investments.find(inv => inv.name === name);
  }
  deleteInvestment(ID: number) {
    return null;
  }
  createInvestment(name, start, dateStart) {
    return null;
  }

  getAllLoans(): Loan[] {
    return this.loans;
  }
  getLoanById(ID: number): Loan {
    return this.loans.find(loan => loan.ID === ID);
  }
  getLoanByName(name: string): Loan {
    return this.loans.find(loan => loan.name === name);
  }
  deleteLoan(ID: number) {
    return null;
  }
  createLoan(name, loan, dateStart, dateEnd, description, period) {
    return null;
  }

  getAllYears(): number[] {
    let years = new Set<number>();
    this.getAllTransactions().map(trans => years.add(trans.date.getFullYear()));
    return Array.from(years.values());
  }

  getAllPeriods(): string[] {
    return ["daily", "weekly", "monthly", "yearly"];
  }
}
