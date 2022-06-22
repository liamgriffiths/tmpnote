import React, { useState, useEffect } from 'react';
import type { NextPage } from "next";
import { GetServerSideProps } from "next";
import { newId, read } from "../../lib/db";
import { decrypt } from "../../lib/crypto";
// import Head from 'next/head'
// import Image from 'next/image'
// import styles from '../styles/Home.module.css'

// get the static props on the server
// decode on the client!

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

  if (!props.cipher) return <p>No cipher found</p>;

  return <pre>{plaintext}</pre>;
};

export default Show;
