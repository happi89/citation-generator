import type { NextPage } from "next";
import Head from "next/head";
import create from "zustand";
import { Citation } from "@prisma/client";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import CitationForm from "../components/CitationForm";
import { trpc } from "../utils/trpc";
import { TrashIcon, ClipboardIcon } from "@heroicons/react/24/outline";

interface CitationState {
  citations: Citation[];
  setCitations: (citations: Citation[]) => void;
  addCitation: (citation: Citation) => void;
  removeCitation: (citationToDelete: Citation) => void;
}

export const useCitationsStore = create<CitationState>((set, get) => ({
  citations: [],
  setCitations: (citations) => set({ citations }),
  addCitation: (citation: Citation) =>
    set((state) => ({ citations: [...state.citations, citation] }), true),
  removeCitation: (citationToDelete: Citation) => {
    const citations = get().citations;
    const updateCitations = citations.filter(
      (citation) => citation.id !== citationToDelete.id
    );
    set(() => ({
      citations: updateCitations,
    }));
  },
}));

const Home: NextPage = () => {
  const { data: citations, isLoading } = trpc.useQuery(["citation.getAll"]);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  useCitationsStore.getState().setCitations(citations!);
  const removeCitation = useCitationsStore((state) => state.removeCitation);
  const { data: session } = useSession();
  const router = useRouter();
  const ctx = trpc.useContext();
  const removeCitationFromDb = trpc.useMutation("citation.delete", {
    onSuccess: () => ctx.invalidateQueries(["citation.getAll"]),
  });
  if (isLoading) return <div>Loading</div>;

  return (
    <>
      <Head>
        <title>Citation Generator</title>
        <meta name="description" content="Citation Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto min-h-screen p-8">
        {!session?.user?.id ? (
          <button
            className="btn btn-primary"
            onClick={() => {
              signIn("discord");
              router.push("/citations");
            }}
          >
            Login with discord
          </button>
        ) : (
          <button className="btn btn-primary" onClick={() => signOut()}>
            Logout
          </button>
        )}
        <h1 className="mb-[-4rem] text-center text-2xl font-bold">
          Citation Generator
        </h1>
        <CitationForm />

        <div className="container mx-auto px-32">
          <h2 className="text-xl font-bold">Citations</h2>
          <ul>
            {citations?.map((c, i) => (
              <li key={i} className="list-divide-secondary my-1">
                {c.content}
                <button
                  className="btn-sqaure btn btn-ghost btn-sm ml-2"
                  onClick={() => {
                    removeCitation(c);
                    removeCitationFromDb.mutate({ id: c.id });
                  }}
                >
                  <TrashIcon className="w-4" />
                </button>
                <button className="btn-sqaure btn btn-ghost btn-sm ml-2">
                  <ClipboardIcon className="w-4" />
                </button>
              </li>
            ))}
          </ul>
        </div>
      </main>
    </>
  );
};

export default Home;
