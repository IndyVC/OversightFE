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
    public bankaccounts?: BankAccount[],
    public transactions?: Transaction[],
    public categories?: Category[],
    public goals?: Goal[],
    public investments?: Investment[],
    public loans?: Loan[]
  ) {
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
      debt += loan.totalAmount as number;
      debt -= loan.currentAmount as number;
    });

    return debt;
  }
  public calculateOversight(): number {
    let oversight: number = 0;
    if (this.bankaccounts) {
      this.bankaccounts.map(account => {
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

  public calculateShortOversight() {
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
    return parseFloat(shortOversight.toString()).toFixed(2);
    // let oversight: number = 0;
    // this.accounts.forEach(account => {
    //   oversight += account.balance;
    //   this.incomes.filter(income => {
    //     let incomeAccount:number=0;
    //     if (income.account.id === account.id) {
    //       oversight += income.amount;
    //       incomeAccount+=income.amount;
    //     }
    //     account.balance+=incomeAccount;
    //   });
    //   this.outcomes.filter(outcome=>{
    //     let outcomeAccount:number = 0;
    //     if(outcome.account.id === account.id){
    //       oversight -= outcome.amount;
    //       outcomeAccount+=outcome.amount;
    //     }
    //     account.balance-=outcomeAccount;
    //   });
    // });
    // return oversight;
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

  deleteLocalIncome(transaction: Transaction) {
    const index = this.incomes.findIndex(
      income => income.id === transaction.id
    );
    this.incomes.splice(index, 1);
  }
  deleteLocalOutcome(transaction: Transaction) {
    const index = this.outcomes.findIndex(
      outcome => outcome.id === transaction.id
    );
    this.outcomes.splice(index, 1);
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

  getAllCategories(): Category[] {
    return this.categories;
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
