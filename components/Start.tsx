import React from "react";

type Props = {
  onStart: () => void;
};

const Start = (props: Props) => {
  return (
    <div className="flex flex-col items-center">
      <h1 className="font-thin text-5xl m-4">Create & Share Encrypted Notes</h1>

      <div className="text-center m-10">
        <pre>Self-destructs when read.</pre>
        <pre>Self-destructs in 7 days.</pre>
        <pre>Encrypted withTweetNaCL.js.</pre>
        <pre>No trackers or ads.</pre>
        <pre>Open-source on GitHub.</pre>
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
