import React from "react";
import { Citation } from "@prisma/client";
import { TrashIcon, ClipboardIcon } from "@heroicons/react/24/outline";
import { trpc } from "../utils/trpc";

export default function CitationList({ citations }: { citations: Citation[] }) {
  const ctx = trpc.useContext();
  const removeCitationFromDb = trpc.useMutation("citation.delete", {
    onSuccess: () => ctx.invalidateQueries(["citation.getAll"]),
  });
  return (
    <div className="container mx-auto flex flex-col items-center px-32">
      <h2 className="text-xl font-bold">Citations</h2>
      <ul>
        {citations?.map((c: Citation, i: number) => (
          <li key={i} className="list-divide-secondary my-1">
            {c.content}
            <button
              className="btn-sqaure btn btn-ghost btn-sm ml-2"
              onClick={() => {
                removeCitationFromDb.mutate({
                  id: c.id,
                });
              }}
            >
              <TrashIcon className="w-4" />
            </button>
            <button
              className="btn-sqaure btn btn-ghost btn-sm ml-2"
              onClick={() => navigator.clipboard.writeText(c.content)}
            >
              <ClipboardIcon className="w-4" />
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}