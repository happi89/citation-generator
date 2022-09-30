import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import CitationForm from "../components/CitationForm";
import { trpc } from "../utils/trpc";
import CitationList from "../components/CitationList";
import { useState } from "react";

const Home: NextPage = () => {
  const [open, setOpen] = useState(false);
  const { data: session } = useSession();
  const { data: citations, isLoading } = trpc.useQuery([
    "citation.getAll",
    { userId: String(session?.user?.id) },
  ]);

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
          <>
            <button
              className="btn btn-primary"
              onClick={() => {
                signIn("discord");
              }}
            >
              Login with discord
            </button>
            <button
              className="btn btn-primary ml-8"
              onClick={() => {
                signIn("google");
              }}
            >
              Login with google
            </button>
          </>
        ) : (
          <>
            <button className="btn btn-primary mb-8" onClick={() => signOut()}>
              Logout
            </button>
            <h1 className="mb-4 text-center text-2xl font-bold">
              Citation Generator
            </h1>
            <CitationList citations={citations || []} />
            <button className="btn btn-primary" onClick={() => setOpen(!open)}>
              {open ? "Close" : "Add Citation"}
            </button>
            {open && <CitationForm setOpen={setOpen} open={open} />}
          </>
        )}
      </main>
    </>
  );
};

export default Home;
