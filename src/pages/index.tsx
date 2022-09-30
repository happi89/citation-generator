import type { NextPage } from "next";
import Head from "next/head";
import { signIn, signOut, useSession } from "next-auth/react";
import { useRouter } from "next/router";
import CitationForm from "../components/CitationForm";
import { trpc } from "../utils/trpc";
import CitationList from "../components/CitationList";

const Home: NextPage = () => {
  const { data: session } = useSession();
  const { data: citations, isLoading } = trpc.useQuery([
    "citation.getAll",
    { userId: String(session?.user?.id) },
  ]);
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  const router = useRouter();

  if (isLoading) return <div>Loading</div>;
  console.log(citations);

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
          <>
            <button className="btn btn-primary" onClick={() => signOut()}>
              Logout
            </button>
            <h1 className="mb-[-4rem] text-center text-2xl font-bold">
              Citation Generator
            </h1>
            <CitationForm />
            <CitationList citations={citations || []} />
          </>
        )}
      </main>
    </>
  );
};

export default Home;
