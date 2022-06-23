import React from "react";
import Link from "next/link";

type Props = {
  onStart: () => void;
};

const Start = (props: Props) => {
  const TweetNaclLink = () => (
    <span className="underline">
      <Link href="https://tweetnacl.js.org/">TweetNaCL.js</Link>
    </span>
  );

  const GitHubLink = () => (
    <span className="underline">
      <Link href="https://github.com/liamgriffiths/tmpnote">GitHub</Link>
    </span>
  );

  return (
    <div className="flex flex-col items-center">
      <h1 className="font-thin text-5xl m-4">Create & Share Encrypted Notes</h1>

      <div className="text-center m-10 font-mono">
        <div>Self-destructs when read.</div>
        <div>Self-destructs in 7 days.</div>
        <div>Encrypted with <TweetNaclLink />.</div>
        <div>No trackers or ads.</div>
        <div> Open-source on <GitHubLink />.</div>
      </div>

      <button
        onClick={props.onStart}
        className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-medium py-2 px-4 m-4 rounded drop-shadow-2xl w-80 h-16"
      >
        New Note
      </button>
    </div>
  );
};

export default Start;
