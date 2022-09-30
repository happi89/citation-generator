import DropDown from "./DropDown";
import { Citation } from "@prisma/client";

export default function CitationList({ citations }: { citations: Citation[] }) {
  return (
    <div className="my-6 flex flex-col">
      <ul>
        {citations?.map((c: Citation, i: number) => (
          <li key={i} className="my-2 flex items-center">
            {c.content}
            <DropDown c={c} />
          </li>
        ))}
      </ul>
    </div>
  );
}
