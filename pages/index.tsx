import { useState } from "react";
import type { Dispatch, SetStateAction } from "react";
import type { NextPage } from "next";

import Page from "../components/Page";
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

const content = (state: State, setState: Dispatch<SetStateAction<State>>) => {
  const status = state.status;

  switch (status) {
    case "initial":
      return <Start onStart={() => setState({ status: "started" })} />;
    case "started":
      return (
        <Create
          onSuccess={(id, link) => setState({ status: "created", id, link })}
        />
      );
    case "created":
      return (
        <Share
          id={state.id}
          link={state.link}
          onDestroySuccess={() => setState({ status: "destroyed" })}
        />
      );
    case "destroyed":
      return <GoneForever />;
    default:
      return <></>;
  }
};

const Home: NextPage = () => {
  const [state, setState] = useState<State>({ status: "initial" });

  return <Page>{content(state, setState)}</Page>;
};

export default Home;
