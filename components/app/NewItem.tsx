import { observer } from "mobx-react-lite";
import { useState } from "react";
import { v4 as uuid } from "uuid";
import { ExpenseItem, IncomeItem, Item } from "../../lib/model/model";
import { useApp } from "./AppProvider";

const NewItem = observer(() => {
  const app = useApp();
  const financeManager = app.financeManager;
  const settingsManager = app.settingsManager;

  const [isIncome, setIsIncome] = useState(false);
  const [itemName, setItemName] = useState("");
  const [categoryId, setCategoryId] = useState("");
  const [subcategory, setSubcategory] = useState("");
  const [accountId, setAccountId] = useState("0");
  const [amount, setAmount] = useState(0);

  const addItem = () => {
    console.log("Adding new item");
    const account = settingsManager.accounts.find(
      (acc) => acc.id === accountId
    );
    console.log({ account });
    if (account === undefined) return;

    const category = isIncome
      ? settingsManager.incomeCategories.find((cat) => cat.id === categoryId)
      : settingsManager.expenseCategories.find((cat) => cat.id === categoryId);
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
      className="space-y-4 pt-4 text-sm w-full flex flex-col items-stretch"
    >
      <div className="flex space-x-2">
        <button
          className={`${
            isIncome ? "bg-gray-200 text-gray-800" : ""
          } py-1 border rounded-full w-full transition-all`}
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
            !isIncome ? "bg-gray-200 text-gray-800" : ""
          } border rounded-full w-full transition-all`}
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
      <div className="w-full flex flex-col space-y-2">
        <label className="">Name</label>
        <input
          type="text"
          className="text-gray-800 px-2 py-1 ring-0 rounded text-sm"
          value={itemName}
          onChange={(e) => setItemName(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-col space-y-2">
        <label className="">Category</label>
        <div className="col-span-2 flex flex-wrap gap-2">
          {(isIncome
            ? settingsManager.incomeCategories
            : settingsManager.expenseCategories
          ).map((category) => {
            const isSelected = categoryId === category.id;
            return (
              <button
                key={category.id}
                className={`${
                  isSelected ? "bg-gray-200 text-gray-800" : ""
                } border px-2 py-1 rounded-full text-sm`}
                onClick={() => setCategoryId(category.id)}
              >
                {category.icon} {category.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col space-y-2">
        <label className="">Subcategory</label>
        <input
          type="text"
          className="text-gray-800 px-2 py-1 text-sm border-0 rounded"
          value={subcategory}
          onChange={(e) => setSubcategory(e.target.value)}
        />
      </div>
      <div className="w-full flex flex-col space-y-2">
        <label className="">Account</label>
        <div className="flex justify-between space-x-2">
          {settingsManager.accounts.map((account) => {
            const isSelected = accountId === account.id;
            return (
              <button
                key={account.id}
                type="button"
                className={`${
                  isSelected ? "bg-gray-200 text-gray-800" : ""
                } flex-grow border px-2 py-1 rounded-full text-sm`}
                onClick={() => setAccountId(account.id)}
              >
                {account.icon} {account.name}
              </button>
            );
          })}
        </div>
      </div>
      <div className="w-full flex flex-col space-y-2">
        <label className="">Amount</label>
        <input
          type="number"
          className="text-gray-800 px-2 py-1 text-sm border-0 rounded"
          value={amount}
          onChange={(e) => setAmount(Number(e.target.value))}
        />
      </div>
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
});

export default NewItem;
