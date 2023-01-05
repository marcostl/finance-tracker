import { action, makeObservable, observable } from "mobx";
import FinanceManager from "./FinanceManager";

export enum Screen {
  DASHBOARD = "dashboard",
  LIST = "list",
  NEW_ITEM = "new_item",
}

class AppManager {
  screen: Screen;
  financeManager: FinanceManager;

  constructor() {
    this.screen = Screen.DASHBOARD;
    this.financeManager = new FinanceManager();

    makeObservable(this, { screen: observable, updateScreen: action });
  }

  updateScreen(screen: Screen) {
    this.screen = screen;
  }
}

export default AppManager;
