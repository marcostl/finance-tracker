import { observer } from "mobx-react-lite";
import AccountsSettings from "./AccountsSettings";
import CategorySettings from "./CategorySettings";

const Settings = observer(() => {
  return (
    <div className="pt-4 space-y-4">
      <AccountsSettings />
      <CategorySettings sectionName="Income categories" type="INCOME" />
      <CategorySettings sectionName="Expense categories" type="EXPENSE" />
    </div>
  );
});

export default Settings;
