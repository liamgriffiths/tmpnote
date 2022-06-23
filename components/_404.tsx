import React from "react";

const _404 = () => {
  return (
    <div className="flex justify-center">
      <div className="flex flex-col items-center ring-2 ring-yellow-500 ring-offset-2 ring-offset-yellow-300 bg-yellow-50 p-4 m-4 rounded fg-black text-xl drop-shadow-2xl w-11/12 max-w-xl">
        <h1 className="font-bold text-3xl m-2">Not Found</h1>
        <h2 className="m-4">The note may have already been read or was never here</h2>
      </div>
    </div>
  );
};

export default _404;
