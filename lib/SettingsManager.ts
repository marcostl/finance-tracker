import { v4 as uuid } from "uuid";
import { action, computed, makeObservable, observable, toJS } from "mobx";
import { Account, Category, CategoryType } from "./model/model";

const SETTINGS_STORAGE_KEY = "SPENDULUM_SETTINGS";

export type Settings = {
  accounts: Account[];
  expenseCategories: Category[];
  incomeCategories: Category[];
};

export const EMPTY_SETTINGS: Settings = {
  accounts: [],
  expenseCategories: [],
  incomeCategories: [],
};

export const saveSettings = (settings: Settings) => {
  if (window.localStorage) {
    window.localStorage.setItem(SETTINGS_STORAGE_KEY, JSON.stringify(settings));
  }
};

export const loadSettings = (): Settings => {
  if (typeof window === "undefined") {
    return EMPTY_SETTINGS;
  }

  const settings = window.localStorage.getItem(SETTINGS_STORAGE_KEY);
  if (settings === null) return EMPTY_SETTINGS;

  return JSON.parse(settings) as Settings;
};

class SettingsManager {
  accounts: Account[];
  expenseCategories: Category[];
  incomeCategories: Category[];

  constructor() {
    this.accounts = [];
    this.expenseCategories = [];
    this.incomeCategories = [];

    makeObservable(this, {
      accounts: observable,
      expenseCategories: observable,
      incomeCategories: observable,

      setSettings: action,

      addAccount: action,
      removeAccount: action,
      addCategory: action,
      removeCategory: action,

      settings: computed,
    });
  }

  setSettings(settings: Settings) {
    this.accounts = settings.accounts;
    this.expenseCategories = settings.expenseCategories;
    this.incomeCategories = settings.incomeCategories;
  }

  addAccount(account: Omit<Account, "id">) {
    this.accounts.push({ ...account, id: uuid() });
  }

  removeAccount(id: string) {
    this.accounts = this.accounts.filter((acc) => acc.id !== id);
  }

  addCategory(category: Omit<Category, "id">, type: CategoryType) {
    const id = uuid();
    if (type === "EXPENSE") {
      this.expenseCategories.push({ ...category, id });
    } else {
      this.incomeCategories.push({ ...category, id });
    }
  }

  removeCategory(id: string, type: CategoryType) {
    if (type === "EXPENSE") {
      this.expenseCategories = this.expenseCategories.filter(
        (cat) => cat.id !== id
      );
    } else {
      this.incomeCategories = this.incomeCategories.filter(
        (cat) => cat.id !== id
      );
    }
  }

  get settings() {
    return {
      accounts: toJS(this.accounts),
      expenseCategories: toJS(this.expenseCategories),
      incomeCategories: toJS(this.incomeCategories),
    };
  }
}

export default SettingsManager;
