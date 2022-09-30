import {
  TrashIcon,
  ClipboardIcon,
  EllipsisVerticalIcon,
} from "@heroicons/react/24/outline";
import { Citation } from "@prisma/client";
import { useState } from "react";
import { trpc } from "../utils/trpc";
import Notification from "./Notification";

const DropDown = ({ c }: { c: Citation }) => {
  const [open, setOpen] = useState(false);
  let timeout: string | number | NodeJS.Timeout | undefined;
  const ctx = trpc.useContext();
  const removeCitationFromDb = trpc.useMutation("citation.delete", {
    onSuccess: () => ctx.invalidateQueries(["citation.getAll"]),
  });

  const showNotification = () => {
    clearTimeout(timeout);
    timeout = setTimeout(() => setOpen(false), 3000);
    setOpen(true);
  };

  return (
    <div className="dropdown dropdown-top">
      <label tabIndex={0} className="btn-sqaure btn btn-ghost btn-sm ml-2">
        <EllipsisVerticalIcon className="w-5" />
      </label>
      <div
        tabIndex={0}
        className="card dropdown-content compact rounded-box w-fit bg-base-100 shadow"
      >
        <div className="flex p-4">
          <button
            className="btn-sqaure btn btn-ghost btn-sm ml-1"
            onClick={() => {
              if (
                window.confirm(`Are you sure you want to delete ${c.content}`)
              ) {
                removeCitationFromDb.mutate({
                  id: c.id,
                });
              }
            }}
          >
            <TrashIcon className="w-4" />
          </button>
          <button
            className="btn-sqaure btn btn-ghost btn-sm ml-2"
            onClick={() => navigator.clipboard.writeText(c.content)}
          >
            <ClipboardIcon className="w-4" onClick={showNotification} />
          </button>
        </div>
      </div>
      {open && <Notification message="Citation copied to clipboard" />}
    </div>
  );
};

export default DropDown;
