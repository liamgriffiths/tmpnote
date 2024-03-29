import React, { useState, useEffect } from "react";
import type { NextPage } from "next";
import { GetServerSideProps } from "next";

import Page from "../../components/Page";
import _404 from "../../components/_404";
import { newId, read } from "../../lib/db";
import { decrypt } from "../../lib/crypto";

type Props = {
  cipher: string | null;
};

const getId = (params: unknown) => {
  const { id } = params as { id?: string | null };
  if (!id) return null;
  return newId(id);
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const id = getId(context.params);
  if (!id) return { props: { cipher: null } };

  const cipher = await read(id);
  return { props: { cipher } };
};

const Show: NextPage<Props> = (props) => {
  const [plaintext, setPlaintext] = useState<string>("");

  // must useEffect to access window
  useEffect(() => {
    if (!props.cipher) return;
    setPlaintext(decrypt(props.cipher, window.location.hash.slice(1)));
  }, []);

  if (!props.cipher) {
    return (
      <Page>
        <_404 />
      </Page>
    );
  }

  return (
    <Page>
      <div className="flex flex-col justify-center items-center">
        <pre className="w-11/12 max-w-4xl h-80 bg-slate-50 p-4 m-4 drop-shadow-2xl rounded">
          {plaintext}
        </pre>
      </div>
    </Page>
  );
};

export default Show;
