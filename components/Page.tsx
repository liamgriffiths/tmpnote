import React from "react";
import Head from "next/head";
import Logo from "./Logo";

type Props = {
  children?: JSX.Element | JSX.Element[];
};

const Page = (props: Props) => {
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

        {props.children}
      </main>
    </>
  );
};

export default Page;
