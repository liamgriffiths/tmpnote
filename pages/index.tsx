import { useState } from "react";
import type { NextPage } from "next";
import Head from "next/head";

import Logo from "../components/Logo";
import Start from "../components/Start";
import Create from "../components/Create";
import Share from "../components/Share";
import GoneForever from "../components/GoneForever";

type Initial = {
  status: "initial";
};

type Started = {
  status: "started";
};

type Created = {
  status: "created";
  id: string;
  link: string;
};

type Destroyed = {
  status: "destroyed";
};

type State = Initial | Started | Created | Destroyed;

const Home: NextPage = () => {
  const [state, setState] = useState<State>({ status: "initial" });
  const status = state.status;

  return (
    <>
      <Head>
        <title>tmpnote | Create & Share Encrypted Notes</title>
        <meta name="description" content="Create & Share Encrypted Notes" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <main className="flex flex-col h-screen">
        <div className="flex flex-col justify-center items-center h-1/5">
          <Logo />
        </div>

        {status === "initial" && (
          <Start onStart={() => setState({ status: "started" })} />
        )}
        {status === "started" && (
          <Create
            onSuccess={(id, link) => setState({ status: "created", id, link })}
          />
        )}
        {status === "created" && (
          <Share
            id={state.id}
            link={state.link}
            onDestroySuccess={() => setState({ status: "destroyed" })}
          />
        )}
        {status === "destroyed" && <GoneForever />}
      </main>
    </>
  );
};

export default Home;
