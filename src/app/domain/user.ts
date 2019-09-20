import { Transaction } from "./transaction";
import { Category } from "./category";
import { Goal } from "./goal";
import { Investment } from "./investment";
import { Loan } from "./loan";
import { Outcome } from "./outcome";
import { BankAccount } from "./account";
import { FormGroup } from "@angular/forms";

export class User {
  public oversight?: number;
  public debt?: number;
  public shortOversight?: number;
  public incomes?: Transaction[];
  public outcomes?: Transaction[];
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
  ) {
    this.accounts = [];
    this.accounts.push(
      new BankAccount("BE 0000 0000 0000", 2000.65, "Fortis", "Zichtrekening")
    );
  }

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
    let debt: number = 0;

    this.loans.map(loan => {
      debt += loan.loan as number;
      debt -= loan.current as number;
    });

    return debt;
  }
  public calculateOversight(): number {
    let oversight: number = 0;
    if (this.accounts) {
      this.accounts.map(account => {
        oversight += account.balance as number;
      });
    }
    if (this.investments) {
      this.investments.map(investment => {
        oversight += investment.current as number;
      });
    }

    return oversight - this.debt;
  }

  public calculateShortOversight(): number {
    let shortOversight: number = 0;
    if (this.getIncomesFromMonth(new Date())) {
      this.getIncomesFromMonth(new Date()).forEach(income => {
        const forcedNumber: number = parseFloat(income.amount.toString());
        shortOversight += forcedNumber as number;
      });
    }
    if (this.getOutcomesFromMonth(new Date())) {
      this.getOutcomesFromMonth(new Date()).forEach(outcome => {
        const forcedNumber: number = parseFloat(outcome.amount.toString());
        shortOversight -= forcedNumber as number;
      });
    }
    return shortOversight as number;
  }

  getAllTransactions(): Transaction[] {
    this.transactions = [...this.incomes, ...this.outcomes];
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

  getAllOutcomes(): Transaction[] {
    return this.outcomes;
  }
  getAllIncomes(): Transaction[] {
    return this.incomes;
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
        trans => trans.date.getFullYear() === date.getFullYear()
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
        trans => trans.date.getFullYear() === date.getFullYear()
      );
    }
  }

  calculateTotalSpendOnCategory(category: Category) {
    const date: Date = new Date();
    if (this.getAllTransactions()) {
      const transactions: Transaction[] = this.getAllTransactions().filter(
        t => t.category.id === category.id
      );
      let sum = 0;
      transactions.forEach(e => (sum += e.amount));
      return sum;
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

  getAllInvestments(): Investment[] {
    return this.investments;
  }
  getInvestmentById(ID: number): Investment {
    return this.investments.find(inv => inv.ID === ID);
  }
  getInvestmentByName(name: string): Investment {
    return this.investments.find(inv => inv.name === name);
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
  getAllYears(): number[] {
    let years = new Set<number>();
    if (this.getAllTransactions()) {
      this.getAllTransactions().map(trans =>
        years.add(trans.date.getFullYear())
      );
      return Array.from(years.values());
    }
  }

  getAllPeriods(): string[] {
    return ["daily", "weekly", "monthly", "yearly"];
  }
}
