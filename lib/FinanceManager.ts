import { action, computed, makeObservable, observable } from "mobx";
import { ExpenseItem, IncomeItem, Item } from "./model/model";

class FinanceManager {
  incomeItems: IncomeItem[];
  expenseItems: ExpenseItem[];

  constructor() {
    this.incomeItems = [];
    this.expenseItems = [];

    makeObservable(this, {
      incomeItems: observable,
      expenseItems: observable,

      addIncomeItem: action,
      addExpenseItem: action,

      items: computed,
    });
  }

  addIncomeItem = (item: IncomeItem) => {
    console.log("New income", item);
    this.incomeItems.push(item);
  };

  addExpenseItem = (item: ExpenseItem) => {
    console.log("New expense", item);
    this.expenseItems.push(item);
  };

  get items(): (ExpenseItem | IncomeItem)[] {
    return [...this.incomeItems, ...this.expenseItems].sort(
      (item1, item2) => 0
    );
  }
}

export default FinanceManager;
