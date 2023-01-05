type Category = {
  id: string;
  name: string;
  icon: string;
};

export type Account = {
  id: string;
  name: string;
  icon: string;
};

export type IncomeCategory = Category;
export type ExpenseCategory = Category;

export type Item = {
  id: string;
  name: string;
  date: string;
  amount: number;
  account: Account;
  subcategory: string;
};

export type IncomeItem = Item & {
  type: "income";
  category: IncomeCategory;
};

export type ExpenseItem = Item & {
  type: "expense";
  category: ExpenseCategory;
};
