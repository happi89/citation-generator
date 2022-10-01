import DropDown from "./DropDown";
import { Citation } from "@prisma/client";

export default function CitationList({ citations }: { citations: Citation[] }) {
  return (
    <div className="my-6 flex flex-col">
      <ul>
        {citations?.map((c: Citation, i: number) => (
          <li key={i} className="my-2 flex items-center">
            {i + 1}.{" "}
            {c.content.split(",").map((c, i) => {
              return i === 3 ? <i>,{c}</i> : `,${c}`;
            })}
            <DropDown c={c} />
          </li>
        ))}
      </ul>
    </div>
  );
}
