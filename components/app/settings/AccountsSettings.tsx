import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { useApp } from "../AppProvider";
import Item from "./Item";
import Section from "./Section";

const AccountsSettings = observer(() => {
  const app = useApp();
  const [showAddAccount, setShowAddAccount] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const accountInputRef = useRef<HTMLInputElement>(null);
  const [accountIcon, setAccountIcon] = useState("😀");
  const [accountName, setAccountName] = useState("");

  useEffect(() => {
    const accountInput = accountInputRef.current;
    if (showAddAccount && accountInput !== null) {
      accountInput.focus();
    }
  }, [showAddAccount]);

  const addAccount = () => {
    if (accountName === "") return;
    app.settingsManager.addAccount({
      icon: accountIcon,
      name: accountName,
    });
    setAccountIcon("😀");
    setAccountName("");
    setShowAddAccount(false);
  };

  return (
    <Section name={"Spending accounts"}>
      <>
        {app.settingsManager.accounts.length === 0 && (
          <p className="text-center text-sm">There are no accounts</p>
        )}
        <ul className="space-y-1">
          {app.settingsManager.accounts.map((account) => (
            <Item
              key={account.id}
              name={account.name}
              icon={account.icon}
              onRemove={() => app.settingsManager.removeAccount(account.id)}
            />
          ))}
        </ul>
        {showAddAccount && (
          <form
            className="mt-1 flex items-stretch"
            onSubmit={(e) => {
              e.preventDefault();
              addAccount();
            }}
          >
            <button
              type="button"
              style={{ fontFamily: "Noto Color Emoji" }}
              className="shrink-0 text-xl px-3 border rounded-l-md bg-gray-200"
              onClick={() => setShowPicker(true)}
            >
              <div>{accountIcon}</div>
            </button>
            <input
              ref={accountInputRef}
              placeholder="New account name"
              className="grow border border-l-0 border-gray-200 rounded-r-md text-gray-800"
              type="text"
              value={accountName}
              onChange={(e) => setAccountName(e.target.value)}
            />
          </form>
        )}
        <button
          onClick={() => {
            if (!showAddAccount) {
              setShowAddAccount(true);
            } else {
              addAccount();
            }
          }}
          className="w-full mt-1 py-2 border rounded-md"
        >
          {showAddAccount ? "New account" : "Add account"}
        </button>
        {showPicker && (
          <div className="absolute inset-0 flex justify-center items-center z-10 bg-gray-800/50">
            <Picker
              data={data}
              previewPosition={"none"}
              onEmojiSelect={(data: any, e: PointerEvent) => {
                e.stopPropagation();
                setAccountIcon(data.native);
                setShowPicker(false);
              }}
            />
          </div>
        )}
      </>
    </Section>
  );
});

export default AccountsSettings;
