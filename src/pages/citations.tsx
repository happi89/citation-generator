import { signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import CitationForm from "../components/CitationForm";
import CitationList from "../components/CitationList";
import { trpc } from "../utils/trpc";

const UserPage = () => {
  const [open, setOpen] = useState(false);
  const router = useRouter();
  const { data: session } = useSession();
  const { data: citations, isLoading } = trpc.useQuery([
    "citation.getAll",
    { userId: String(session?.user?.id) },
  ]);

  useEffect(() => {
    if (!session?.user) {
      router.push("/");
    }
  }, [router, session?.user]);

  if (isLoading) return <div>Loading</div>;

  return (
    <div className="container mx-auto min-h-screen p-12 lg:px-40 xl:px-60 2xl:px-96">
      <button
        className="btn btn-primary mb-8"
        onClick={() => {
          signOut();
          router.push("/");
        }}
      >
        Logout
      </button>
      <h1 className="mb-4 text-start text-2xl font-bold">Citation Generator</h1>
      <p className="text-lg font-bold">Hello {session?.user?.name}</p>
      <CitationList citations={citations || []} />
      <button className="btn btn-primary" onClick={() => setOpen(!open)}>
        {open ? "Close" : "Add Citation"}
      </button>
      {open && <CitationForm setOpen={setOpen} open={open} />}
    </div>
  );
};

export default UserPage;
