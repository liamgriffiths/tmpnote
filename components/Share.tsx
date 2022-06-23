import React, { useState } from "react";
import { destroy } from "../lib/api/notes";

type State = "initial" | "success" | "failed" | "waiting";

type Props = {
  id: string;
  link: string;
  onDestroySuccess: () => void;
};

const Share = (props: Props) => {
  const [copyState, setCopyState] = useState<State>("initial");
  const [destroyState, setDestroyState] = useState<State>("initial");

  const onCopyClick = async () => {
    try {
      await navigator.clipboard.writeText(props.link);
      setCopyState("success");
    } catch (err) {
      setCopyState("failed");
    }
  };

  const onDestroyClick = async () => {
    try {
      const res = await destroy(props.id);
      if (res.status === "success") {
        setDestroyState("success");
        props.onDestroySuccess();
      } else {
        setDestroyState("failed");
      }
    } catch (err) {
      setDestroyState("failed");
    }
  };

  const copyLabel = {
    initial: "Copy",
    success: "Copied!",
    failed: "Couldn't copy",
    waiting: "Copying...",
  }[copyState];

  const destroyLabel = {
    initial: "Changed your mind? Destroy it now.",
    success: "Destroyed!",
    failed: "Try again",
    waiting: "Destroying...",
  }[destroyState];

  return (
    <div className="flex flex-col items-center">
      <h2>Use this link to share your note</h2>
      <textarea
        className="ring-2 ring-green-500 ring-offset-2 ring-offset-green-300 bg-green-50 p-4 m-4 rounded w-11/12 max-w-4xl h-32 fg-black text-xl drop-shadow-2xl"
        readOnly
        contentEditable={false}
        value={props.link}
      />
      <button
        onClick={onCopyClick}
        className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-medium py-2 px-4 m-4 rounded drop-shadow-2xl w-80 h-16"
      >
        {copyLabel}
      </button>
      <a
        onClick={onDestroyClick}
        className="text-red-500 hover:bg-red-500 hover:text-white hover:drop-shadow-2xl cursor-pointer font-medium py-2 px-4 rounded m-10"
      >
        {destroyLabel}
      </a>
    </div>
  );
};

export default Share;
