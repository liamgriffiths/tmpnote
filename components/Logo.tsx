import React from "react";
import Link from "next/link";

const Logo = () => {
  return (
    <span className="skew-y-2 font-black text-5xl center text-black-500 hover:text-blue-600 drop-shadow-2xl">
      <Link href="/">tmpnote</Link>
    </span>
  );
};

export default Logo;
