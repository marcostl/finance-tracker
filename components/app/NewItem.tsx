import { useState } from "react";
import {
  Account,
  Category,
  ExpenseItem,
  IncomeItem,
  Item,
} from "../../lib/model/model";
import { useApp } from "./AppProvider";
import { v4 as uuid } from "uuid";

const ItemType = ({
  value,
  setValue,
}: {
  value: string;
  setValue: (s: string) => void;
}) => {
  return (
    <div className="col-span-2 flex justify-around space-x-2">
      <button className={``}>Income</button>
      <button>Expense</button>
    </div>
  );
};

const incomeCategories: Category[] = [{ id: "0", name: "Salary", icon: "🏢" }];
const expenseCategories: Category[] = [
  { id: "0", name: "Household", icon: "🏡" },
  { id: "1", name: "Bills", icon: "💡" },
  { id: "2", name: "Groceries", icon: "🛒" },
  { id: "3", name: "Leisure", icon: "🛹" },
  { id: "4", name: "Shopping", icon: "🛍️" },
  { id: "5", name: "Health", icon: "🏥" },
];

const accounts: Account[] = [
  { id: "0", name: "Family", icon: "👩🏼‍❤️‍👨🏻" },
  { id: "1", name: "Bir", icon: "👩🏼" },
  { id: "2", name: "Marcos", icon: "🧑🏻" },
];

const NewItem = () => {
  const financeManager = useApp().financeManager;
  console.log({ financeManager });

  const [isIncome, setIsIncome] = useState(false);
  const [itemName, setItemName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [accountId, setAccountId] = useState("0");
  const [amount, setAmount] = useState(0);

  const addItem = () => {
    console.log("Adding new item");
    const account = accounts.find((acc) => acc.id === accountId);
    console.log({ account });
    if (account === undefined) return;

    const category = isIncome
      ? incomeCategories.find((cat) => cat.id === categoryId)
      : expenseCategories.find((cat) => cat.id === categoryId);
    if (category === undefined) return;

    const item: Item = {
      id: uuid(),
      name: itemName,
      amount,
      account,
      category,
      subcategory,
      date: `${Date.now()}`,
    };

    if (isIncome) {
      const incomeItem: IncomeItem = { ...item, type: "income" };
      financeManager.addIncomeItem(incomeItem);
    } else {
      const expenseItem: ExpenseItem = { ...item, type: "expense" };
      financeManager.addExpenseItem(expenseItem);
    }
  };

  return (
    <form
      onSubmit={(e) => e.preventDefault()}
      style={{
        gridTemplateColumns: "min-content 1fr",
      }}
      className="space-y-1 grid gap-1 items-center pt-2 text-sm"
    >
      <p className="text-right mt-1">Entry type</p>
      <div className="flex space-x-2">
        <button
          className={`${
            isIncome
              ? "bg-white text-gray-800 border-transparent border-2"
              : "border-white border-2"
          } rounded w-full transition-all`}
          onClick={() => {
            if (!isIncome) {
              setIsIncome(true);
              setCategoryId("");
            }
          }}
        >
          Income
        </button>
        <button
          className={`${
            !isIncome
              ? "bg-white text-gray-800 border-transparent border-2"
              : "border-white border-2"
          } rounded w-full transition-all`}
          onClick={() => {
            if (isIncome) {
              setIsIncome(false);
              setCategoryId("");
            }
          }}
        >
          Expense
        </button>
      </div>
      <label className="text-right">Name</label>
      <input
        type="text"
        className="text-gray-800 px-2 py-1 ring-0 rounded text-sm"
        value={itemName}
        onChange={(e) => setItemName(e.target.value)}
      />
      <label className="text-right">Category</label>
      <select
        className="text-gray-800 px-2 py-1 text-sm border-0 rounded"
        onChange={(e) => setCategoryId(e.target.value)}
      >
        <option value={""}>Select category</option>
        {(isIncome ? incomeCategories : expenseCategories).map((category) => {
          return (
            <option key={category.id} value={category.id}>
              {category.icon} {category.name}
            </option>
          );
        })}
      </select>
      <label className="text-right">Subcategory</label>
      <input
        type="text"
        className="text-gray-800 px-2 py-1 text-sm border-0 rounded"
        value={subcategory}
        onChange={(e) => setSubcategory(e.target.value)}
      />
      <label className="text-right">Account</label>
      <div className="flex justify-between">
        {accounts.map((account) => {
          return (
            <button
              key={account.id}
              type="button"
              className={`${accountId === account.id ? "underline" : ""}`}
              onClick={() => setAccountId(account.id)}
            >
              {account.icon} {account.name}
            </button>
          );
        })}
      </div>
      <label className="text-right">Amount</label>
      <input
        type="number"
        className="text-gray-800 px-2 py-1 text-sm border-0 rounded"
        value={amount}
        onChange={(e) => setAmount(Number(e.target.value))}
      />
      <div className="col-span-2 flex space-x-2">
        <button
          type="button"
          className="w-full py-1 bg-secondary rounded"
          onClick={addItem}
        >
          Add new entry
        </button>
      </div>
    </form>
  );
};

export default NewItem;
