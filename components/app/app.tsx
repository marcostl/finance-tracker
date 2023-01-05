import { Observer } from "mobx-react-lite";
import { useMemo } from "react";
import AppManager, { Screen } from "../../lib/AppManager";
import { AppProvider } from "./AppProvider";
import ItemList from "./ItemList";
import NewItem from "./NewItem";

const App = () => {
  const appManager = useMemo(() => new AppManager(), []);

  return (
    <AppProvider app={appManager}>
      <Observer>
        {() => {
          return (
            <>
              <div className="h-[calc(100%-var(--navHeight))] px-2 sm:px-0">
                {appManager.screen === Screen.LIST && <ItemList />}
                {appManager.screen === Screen.NEW_ITEM && <NewItem />}
              </div>
              <div className="h-nav grid grid-cols-3 gap-4 px-2 items-center justify-around">
                <button
                  className={`border-2 border-secondary px-4 py-1 rounded-md ${
                    appManager.screen === Screen.DASHBOARD ? "bg-secondary" : ""
                  }`}
                  onClick={() => appManager.updateScreen(Screen.DASHBOARD)}
                >
                  Dashboard
                </button>
                <button
                  className={`border-2 border-secondary px-4 py-1 rounded-md ${
                    appManager.screen === Screen.LIST ? "bg-secondary" : ""
                  }`}
                  onClick={() => appManager.updateScreen(Screen.LIST)}
                >
                  Item list
                </button>
                <button
                  className={`border-2 border-secondary px-4 py-1 rounded-md ${
                    appManager.screen === Screen.NEW_ITEM ? "bg-secondary" : ""
                  }`}
                  onClick={() => appManager.updateScreen(Screen.NEW_ITEM)}
                >
                  New item
                </button>
              </div>
            </>
          );
        }}
      </Observer>
    </AppProvider>
  );
};

export default App;
