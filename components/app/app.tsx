import { IconMenu2, IconPlus, IconX } from "@tabler/icons";
import { reaction } from "mobx";
import { Observer } from "mobx-react-lite";
import { useEffect, useMemo, useState } from "react";
import AppManager, { Screen } from "../../lib/AppManager";
import { loadFinance, saveFinance } from "../../lib/FinanceManager";
import { loadSettings, saveSettings } from "../../lib/SettingsManager";
import { AppProvider, useApp } from "./AppProvider";
import Dashboard from "./dashboard/Dashboard";
import ItemList from "./ItemList";
import NewItem from "./NewItem";
import Settings from "./settings/Settings";

const Drawer = ({
  show,
  setShowMenu,
}: {
  show: boolean;
  setShowMenu: (s: boolean) => void;
}) => {
  const app = useApp();

  return (
    <div
      style={{ left: show ? 0 : undefined }}
      className="absolute w-[200px] pt-2 border-t border-main bg-secondary top-nav bottom-0 -left-full transition-all"
    >
      <ul>
        <li className="px-2 py-2 sm:py-1 text-sm sm:text-lg">
          <button
            onClick={() => {
              app.updateScreen(Screen.DASHBOARD);
              setShowMenu(false);
            }}
          >
            🧭 Dashboard
          </button>
        </li>
        <li className="px-2 py-2 sm:py-1 text-sm sm:text-lg">
          <button
            onClick={() => {
              app.updateScreen(Screen.LIST);
              setShowMenu(false);
            }}
          >
            📝 List of items
          </button>
        </li>
        <li className="px-2 py-2 sm:py-1 text-sm sm:text-lg">
          <button
            onClick={() => {
              app.updateScreen(Screen.SETTINGS);
              setShowMenu(false);
            }}
          >
            <span style={{ fontFamily: "Noto Color Emoji" }}>⚙️</span> Settings
          </button>
        </li>
      </ul>
    </div>
  );
};

const App = () => {
  const [showMenu, setShowMenu] = useState(false);

  const appManager = useMemo(() => new AppManager(), []);

  useEffect(() => {
    appManager.settingsManager.setSettings(loadSettings());
    appManager.financeManager.setFinance(loadFinance());
  }, []);

  useEffect(() => {
    return reaction(() => appManager.settingsManager.settings, saveSettings, {
      fireImmediately: false,
    });
  }, [appManager]);

  useEffect(() => {
    return reaction(() => appManager.financeManager.finance, saveFinance, {
      fireImmediately: false,
    });
  }, [appManager]);

  return (
    <AppProvider app={appManager}>
      <Observer>
        {() => (
          <div className="w-full h-full flex flex-col items-stretch">
            <div className="relative w-full h-nav bg-secondary flex items-center">
              <button
                className="absolute px-2"
                onClick={() => setShowMenu(!showMenu)}
              >
                {showMenu ? <IconX /> : <IconMenu2 />}
              </button>
              <p className="w-full font-semibold text-center">
                💵 Finance tracker
              </p>
            </div>
            <Drawer show={showMenu} setShowMenu={setShowMenu} />
            <div className="h-[calc(100%-var(--navHeight))] px-2 pb-4 sm:px-0">
              {appManager.screen === Screen.DASHBOARD && <Dashboard />}
              {appManager.screen === Screen.LIST && <ItemList />}
              {appManager.screen === Screen.NEW_ITEM && <NewItem />}
              {appManager.screen === Screen.SETTINGS && <Settings />}
            </div>
            {appManager.screen !== Screen.NEW_ITEM && (
              <button
                className="fixed w-[50px] h-[50px] bottom-[20px] right-[20px] p-1 bg-secondary rounded-full flex items-center justify-center"
                onClick={() => appManager.updateScreen(Screen.NEW_ITEM)}
              >
                <IconPlus className="w-[30px] h-[30px]" />
              </button>
            )}
          </div>
        )}
      </Observer>
    </AppProvider>
  );
};

export default App;
