import { observer } from "mobx-react-lite";

const Item = observer(
  ({
    name,
    icon,
    onRemove,
  }: {
    name: string;
    icon: string;
    onRemove: () => void;
  }) => {
    return (
      <li className="flex items-stretch">
        <span
          style={{ fontFamily: "Noto Color Emoji" }}
          className="shrink-0 text-xl px-3 border rounded-l-md flex items-center bg-gray-100"
        >
          {icon}
        </span>
        <span className="grow py-2 pl-3 border border-l-0 bg-gray-100 text-gray-800 flex items-center">
          {name}
        </span>
        <button
          style={{ fontFamily: "Noto Color Emoji" }}
          className="shrink-0 text-xl px-3 border border-l-0 bg-gray-100 flex items-center"
        >
          ✏️
        </button>
        <button
          className="shrink-0 text-xl px-3 border border-l-0 rounded-r-md bg-gray-100 flex items-center"
          onClick={onRemove}
        >
          🗑️
        </button>
      </li>
    );
  }
);

export default Item;
