import { action, computed, makeObservable, observable, toJS } from "mobx";
import { ExpenseItem, IncomeItem, Item } from "./model/model";

const FINANCE_STORAGE_KEY = "SPENDULUM_FINANCE";

export type Finance = {
  incomeItems: IncomeItem[];
  expenseItems: ExpenseItem[];
};

export const EMPTY_FINANCE: Finance = {
  incomeItems: [],
  expenseItems: [],
};

export const saveFinance = (finance: Finance) => {
  if (window.localStorage) {
    window.localStorage.setItem(FINANCE_STORAGE_KEY, JSON.stringify(finance));
  }
};

export const loadFinance = (): Finance => {
  if (typeof window === "undefined") {
    return EMPTY_FINANCE;
  }

  const finance = window.localStorage.getItem(FINANCE_STORAGE_KEY);
  if (finance === null) return EMPTY_FINANCE;

  return JSON.parse(finance) as Finance;
};

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
      setFinance: action,

      items: computed,
      finance: computed,
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

  setFinance(finance: Finance) {
    this.incomeItems = finance.incomeItems;
    this.expenseItems = finance.expenseItems;
  }

  get items(): (ExpenseItem | IncomeItem)[] {
    return [...this.incomeItems, ...this.expenseItems].sort(
      (item1, item2) => 0
    );
  }

  get finance(): Finance {
    return {
      incomeItems: toJS(this.incomeItems),
      expenseItems: toJS(this.expenseItems),
    };
  }
}

export default FinanceManager;
