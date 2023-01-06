import { observer } from "mobx-react-lite";
import { useMemo } from "react";
import { Category, IncomeItem, Item } from "../../../lib/model/model";
import { useApp } from "../AppProvider";

const getCategoryName = (categoryId: string, categories: Category[]) => {
  const category = categories.find((cat) => cat.id === categoryId);
  if (category === undefined) return;

  return `${category.icon} ${category.name}`;
};

const computeSummary = (items: Item[], categories: Category[]) => {
  const summary = items.reduce((summary: { [key: string]: number }, item) => {
    const categoryId = item.category.id;
    if (summary[categoryId] === undefined) {
      summary[categoryId] = 0;
    }
    summary[categoryId] += item.amount;
    return summary;
  }, {});

  const summaryWithNames: Record<string, number> = {};

  Object.entries(summary).forEach(([categoryId, amount]) => {
    const categoryName = getCategoryName(categoryId, categories);
    if (categoryName === undefined) return;
    summaryWithNames[categoryName] = amount;
  });

  return summaryWithNames;
};

const Dashboard = observer(() => {
  const app = useApp();
  const settingsManager = app.settingsManager;
  const financeManager = app.financeManager;

  const incomeSummary = useMemo(
    () =>
      computeSummary(
        financeManager.incomeItems,
        settingsManager.incomeCategories
      ),
    [financeManager]
  );
  const expenseSummary = useMemo(
    () =>
      computeSummary(
        financeManager.expenseItems,
        settingsManager.expenseCategories
      ),
    [financeManager]
  );

  return (
    <div className="space-y-4 mt-4">
      <div>
        <p>Income</p>
        <ul className="px-4">
          {Object.entries(incomeSummary).map(([category, amount]) => {
            return (
              <li key={category} className="flex justify-between">
                <p>{category}</p>
                <p>{amount}</p>
              </li>
            );
          })}
        </ul>
      </div>
      <div>
        <p>Expenses</p>
        <ul className="px-4">
          {Object.entries(expenseSummary).map(([category, amount]) => {
            return (
              <li key={category} className="flex justify-between">
                <p>{category}</p>
                <p>{amount}</p>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
});

export default Dashboard;
