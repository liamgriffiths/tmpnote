import React from "react";

type Props = {
  onStart: () => void;
};

const Start = (props: Props) => {
  return (
    <div className="border-blue-600 border p-4 m-4">
      <h1>Create & Share Encrypted Notes</h1>
      <pre>
        Self-destructs when read. Self-destructs in 7 days. Encrypted with
        TweetNaCL.js. No trackers or ads. Open-source on GitHub.
      </pre>

      <button
        onClick={props.onStart}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        New Note
      </button>
    </div>
  );
};

export default Start;
