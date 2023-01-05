export type Category = {
  id: string;
  name: string;
  icon: string;
};

export type CategoryType = "INCOME" | "EXPENSE";

export type Account = {
  id: string;
  name: string;
  icon: string;
};

export type Item = {
  id: string;
  name: string;
  date: string;
  amount: number;
  account: Account;
  subcategory: string;
  category: Category;
};

export type IncomeItem = Item & {
  type: "income";
};

export type ExpenseItem = Item & {
  type: "expense";
};
