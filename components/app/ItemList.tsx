import { toJS } from "mobx";
import { observer } from "mobx-react-lite";
import { useApp } from "./AppProvider";

const ItemList = observer(() => {
  const financeManager = useApp().financeManager;
  console.log(toJS(financeManager.items));

  return (
    <div className="space-y-2 py-2">
      {financeManager.items.map((item) => {
        return (
          <div key={item.id} className="flex items-stretch">
            <div className="flex-grow border rounded-l-md pl-2 py-1">
              <p className="font-bold">{item.name}</p>
              <p className="font-extralight">
                {item.account.icon} {item.account.name}
              </p>
            </div>
            <div className="w-[150px] border-t border-b border-r text-lg px-2 flex items-center">
              <p className="w-full text-right">{item.amount} €</p>
            </div>
            <div className="border-t border-b border-r rounded-r-md text-3xl px-2 flex items-center">
              <p>{item.category.icon}</p>
            </div>
          </div>
        );
      })}
    </div>
  );
});

export default ItemList;
