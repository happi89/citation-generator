import Login from "./../components/Login";
import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const Home: NextPage = () => {
  const router = useRouter();
  const { data: session } = useSession();

  useEffect(() => {
    if (session?.user) {
      router.push("/citations");
    }
  }, [router, session?.user]);

  return (
    <>
      <Head>
        <title>Citation Generator</title>
        <meta name="description" content="Citation Generator" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="container mx-auto min-h-screen p-8">
        <Login />
      </main>
    </>
  );
};

export default Home;
