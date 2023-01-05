import { useState } from "react";
import { Tab } from "@headlessui/react";

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(" ");
}

const itemTypes = ["Income", "Expense"];

export default function Tabs() {
  return (
    <div className="w-full">
      <Tab.Group>
        <Tab.List className="flex space-x-2">
          {itemTypes.map((type) => (
            <Tab
              key={type}
              className={({ selected }) =>
                classNames(
                  "w-full rounded py-1 text-sm font-medium leading-5",
                  "focus:outline-none",
                  selected
                    ? "text-main bg-font"
                    : "text-font bg-main bg-font/[0.12] "
                )
              }
            >
              {type}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
    </div>
  );
}
