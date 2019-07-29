import { Transaction } from './transaction';
import { Category } from './category';
import { Goal } from './goal';
import { Investment } from './investment';
import { Loan } from './loan';
import { Income } from './income';
import { Outcome } from './outcome';
import { BankAccount } from './account';

export class User {
  private _oversight: number;
  private _debt: number;
  private _shortOversight: number;
  constructor(
    private _ID: number,
    private _firstname: string,
    private _lastname: string,
    private _email: string,
    private _active: boolean,
    private _accounts: BankAccount[],
    private _transactions?: Transaction[],
    private _categories?: Category[],
    private _goals?: Goal[],
    private _investments?: Investment[],
    private _loans?: Loan[]
  ) {
    this._transactions.map(trans => Transaction.fromJSON(trans));
    this._categories.map(cats => Category.fromJSON(cats));
    this._goals.map(goals => Goal.fromJSON(goals));
    this._investments.map(invs => Investment.fromJSON(invs));
    this._loans.map(loans => Loan.fromJSON(loans));
    this._debt = this.calculateDebt();
    this._oversight = this.calculateOversight();
    this._shortOversight = this.calculateShortOversight();
  }

  get ID(): number {
    return this._ID;
  }
  get firstname(): string {
    return this._firstname;
  }
  get lastname(): string {
    return this._lastname;
  }
  get email(): string {
    return this._email;
  }
  get active(): boolean {
    return this._active;
  }

  get oversight(): number {
    return this._oversight;
  }
  get debt(): number {
    return this._debt;
  }
  get accounts(): BankAccount[] {
    return this._accounts;
  }
  get transactions(): Transaction[] {
    return this._transactions;
  }
  get categories(): Category[] {
    return this._categories;
  }
  get goals(): Goal[] {
    return this._goals;
  }

  get investments(): Investment[] {
    return this._investments;
  }
  get loans(): Loan[] {
    return this._loans;
  }

  public static fromJSON(json: any): User {
    return new User(
      json.ID,
      json.firstname,
      json.lastname,
      json.email,
      json.active,
      json.accounts,
      json.transactions,
      json.categories,
      json.goals,
      json.investment,
      json.loans
    );
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

    this._accounts.map(account => {
      oversight += account.balance;
    });

    this.investments.map(investment => {
      oversight += investment.current;
    });

    return oversight - this.debt;
  }

  public calculateShortOversight(): number {
    let shortOversight = 0;
    this.getIncomesFromMonth(new Date()).forEach(
      income => (shortOversight += income.amount)
    );
    this.getOutcomesFromMonth(new Date()).forEach(
      outcome => (shortOversight -= outcome.amount)
    );

    return shortOversight;
  }

  getAllTransactions(): Transaction[] {
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
  getTransactionById(ID: number): Transaction {
    return this.transactions.find(trans => trans.ID === ID);
  }
  getTransactionsByName(name: string): Transaction[] {
    return this.transactions.filter(trans => trans.name === name);
  }
  getAllOutcomes(): Transaction[] {
    return this.getAllTransactions()
      .filter(trans => trans instanceof Outcome)
      .reverse();
  }
  getAllIncomes(): Transaction[] {
    return this.getAllTransactions()
      .filter(trans => trans instanceof Income)
      .reverse();
  }
  createOutcome(name, amount, date, category, period) {
    return null;
  }
  createIncome(name, amount, date, category, period) {
    return null;
  }
  deleteOutcome(ID: number) {
    return null;
  }
  deleteIncome(ID: number) {
    return null;
  }
  getTransactionsFromMonth(date: Date) {
    return this.getAllTransactions().filter(
      trans =>
        trans.date.getMonth() === date.getMonth() &&
        trans.date.getFullYear() === trans.date.getFullYear()
    );
  }

  getIncomesFromMonth(date: Date) {
    return this.getAllIncomes().filter(
      trans =>
        trans.date.getMonth() === date.getMonth() &&
        trans.date.getFullYear() === trans.date.getFullYear()
    );
  }
  getIncomesFromYear(date: Date) {
    return this.getAllIncomes().filter(
      trans => trans.date.getFullYear() === trans.date.getFullYear()
    );
  }
  getOutcomesFromMonth(date: Date) {
    return this.getAllOutcomes().filter(
      trans =>
        trans.date.getMonth() === date.getMonth() &&
        trans.date.getFullYear() === trans.date.getFullYear()
    );
  }

  getOutcomesFromYear(date: Date) {
    return this.getAllOutcomes().filter(
      trans => trans.date.getFullYear() === trans.date.getFullYear()
    );
  }

  getAllCategories(): Category[] {
    return this.categories;
  }
  getIncomeCategories(): Category[] {
    return this.categories.filter(cat => cat.type === 'income');
  }
  getOutcomeCategories(): Category[] {
    return this.categories.filter(cat => cat.type === 'outcome');
  }
  getCategoryById(ID: number): Category {
    return this.categories.find(cat => cat.ID === ID);
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
}
