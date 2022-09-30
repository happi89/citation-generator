import DropDown from "./DropDown";
import { Citation } from "@prisma/client";

export default function CitationList({ citations }: { citations: Citation[] }) {
  return (
    <div className="mx-6 mb-12 flex w-full flex-col items-center">
      <h2 className="text-xl font-bold">Citations</h2>
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
