import { observer } from "mobx-react-lite";
import { ReactNode } from "react";

const Section = observer(
  ({ name, children }: { name: string; children: ReactNode }) => {
    return (
      <div>
        <h2 className="uppercase pb-2">{name}</h2>
        {children}
      </div>
    );
  }
);

export default Section;
