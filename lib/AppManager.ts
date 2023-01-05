import { action, makeObservable, observable } from "mobx";
import FinanceManager from "./FinanceManager";
import SettingsManager from "./SettingsManager";

export enum Screen {
  DASHBOARD = "dashboard",
  LIST = "list",
  SETTINGS = "settings",
  NEW_ITEM = "new_item",
}

class AppManager {
  screen: Screen;
  financeManager: FinanceManager;
  settingsManager: SettingsManager;

  constructor() {
    this.screen = Screen.SETTINGS;
    this.financeManager = new FinanceManager();
    this.settingsManager = new SettingsManager();

    makeObservable(this, {
      screen: observable,

      updateScreen: action,
    });
  }

  updateScreen(screen: Screen) {
    this.screen = screen;
  }
}

export default AppManager;
