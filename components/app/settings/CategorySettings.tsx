import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { observer } from "mobx-react-lite";
import { useEffect, useRef, useState } from "react";
import { CategoryType } from "../../../lib/model/model";
import { useApp } from "../AppProvider";
import Item from "./Item";
import Section from "./Section";

const CategorySettings = observer(
  ({ sectionName, type }: { sectionName: string; type: CategoryType }) => {
    const app = useApp();

    const [showAddCategory, setShowAddCategory] = useState(false);
    const [showPicker, setShowPicker] = useState(false);
    const categoryInputRef = useRef<HTMLInputElement>(null);
    const [categoryIcon, setCategoryIcon] = useState("😀");
    const [categoryName, setCategoryName] = useState("");

    useEffect(() => {
      const categoryInput = categoryInputRef.current;
      if (showAddCategory && categoryInput !== null) {
        categoryInput.focus();
      }
    }, [showAddCategory]);

    const addCategory = () => {
      if (categoryName === "") return;

      app.settingsManager.addCategory(
        { icon: categoryIcon, name: categoryName },
        type
      );

      setCategoryIcon("😀");
      setCategoryName("");
      setShowAddCategory(false);
    };

    const categories =
      type === "EXPENSE"
        ? app.settingsManager.expenseCategories
        : app.settingsManager.incomeCategories;

    return (
      <Section name={sectionName}>
        <>
          {categories.length === 0 && (
            <p className="text-center text-sm">There are no accounts</p>
          )}
          <ul className="space-y-1">
            {categories.map((account) => (
              <Item
                key={account.id}
                name={account.name}
                icon={account.icon}
                onRemove={() =>
                  app.settingsManager.removeCategory(account.id, type)
                }
              />
            ))}
          </ul>
          {showAddCategory && (
            <form
              className="mt-1 flex items-stretch"
              onSubmit={(e) => {
                e.preventDefault();
                addCategory();
              }}
            >
              <button
                type="button"
                style={{ fontFamily: "Noto Color Emoji" }}
                className="shrink-0 text-xl px-3 border rounded-l-md bg-gray-200"
                onClick={() => setShowPicker(true)}
              >
                <div>{categoryIcon}</div>
              </button>
              <input
                ref={categoryInputRef}
                placeholder="New account name"
                className="grow border border-l-0 border-gray-200 rounded-r-md text-gray-800"
                type="text"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)}
              />
            </form>
          )}
          <button
            onClick={() => {
              if (!showAddCategory) {
                setShowAddCategory(true);
              } else {
                addCategory();
              }
            }}
            className="w-full mt-1 py-2 border rounded-md"
          >
            {showAddCategory ? "New account" : "Add account"}
          </button>
          {showPicker && (
            <div className="fixed inset-0 flex justify-center items-center z-10 bg-gray-800/50">
              <Picker
                data={data}
                previewPosition={"none"}
                onEmojiSelect={(data: any, e: PointerEvent) => {
                  e.stopPropagation();
                  setCategoryIcon(data.native);
                  setShowPicker(false);
                }}
              />
            </div>
          )}
        </>
      </Section>
    );
  }
);

export default CategorySettings;
