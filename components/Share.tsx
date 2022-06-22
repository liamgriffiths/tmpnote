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
    <div className="border-blue-600 border p-4 m-4">
      <h1>Created.</h1>
      <h2>Share the following link</h2>
      <textarea readOnly contentEditable={false} value={props.link} />
      <button
        onClick={onCopyClick}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
      >
        {copyLabel}
      </button>
      <button
        onClick={onDestroyClick}
        className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
      >
        {destroyLabel}
      </button>
    </div>
  );
};

export default Share;
