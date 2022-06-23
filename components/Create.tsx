import React, { useState } from "react";
import { encrypt } from "../lib/crypto";
import { create } from "../lib/api/notes";

type Success = {
  status: "success";
  id: string;
  link: string;
};

type Failure = {
  status: "failure";
  error: string;
};

type Initial = {
  status: "initial";
};

type Waiting = {
  status: "waiting";
};

export type State = Success | Failure | Waiting | Initial;

const success = (id: string, secret: string, w: Window): Success => ({
  status: "success",
  id,
  link: `${w.location.origin}/notes/${id}#${secret}`,
});

const failure = (error: string): Failure => ({ error, status: "failure" });
const initial: Initial = { status: "initial" };
const waiting: Waiting = { status: "waiting" };

type Props = {
  onSuccess: (id: string, link: string) => void;
};

const Create = (props: Props) => {
  const [state, setState] = useState<State>(initial);

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setState(waiting);

    // @ts-ignore
    const note = e.target.note.value as string;
    const encrypted = encrypt(note);

    create(encrypted.cipher)
      .then((res) => {
        if (res.status === "success") {
          const s = success(res.id, encrypted.secret, window);
          setState(s);
          props.onSuccess(s.id, s.link);
        } else if (res.status === "failure") {
          setState(failure(res.message));
        }
      })
      .catch((err) => setState(failure(err.message)));
  };

  const disabled = state.status === "waiting" || state.status === "success";

  const buttonLabel = {
    initial: "Save",
    waiting: "Saving...",
    success: "Saved",
    failure: "Try again",
  }[state.status];

  return (
    <form className="flex flex-col items-center" onSubmit={onSubmit}>
      <textarea
        className="bg-zinc-50 p-4 m-4 rounded w-11/12 max-w-4xl h-80 fg-black text-xl drop-shadow-2xl"
        name="note"
        placeholder="Say something nice..."
        disabled={disabled}
        autoFocus
      />
      <button
        className="bg-blue-500 hover:bg-blue-700 text-white text-xl font-medium py-2 px-4 m-4 rounded drop-shadow-2xl w-80 h-16"
        type="submit"
        disabled={disabled}
      >
        {buttonLabel}
      </button>
      {state.status === "failure" && (
        <p className="text-red-600">{state.error}</p>
      )}
    </form>
  );
};

export default Create;
