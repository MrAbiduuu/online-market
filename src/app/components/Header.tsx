import Image from "next/image";
import React from "react";
import Navbar from "./Navbar";
import Link from "next/link";

const Header = () => {
  const date = new Date().toLocaleDateString("bn-BD", {
    dateStyle: "full",
  });

  return (
    <div>
      <div className="container mx-auto flex items-center justify-between px-4 pt-2">
        {/* logo */}
        <Link href={`/`} className="flex items-center gap-3">
          <div className="rounded-xl bg-green-300 p-1 shadow-sm">
            <Image
              src="/logo-icon.png"
              alt="logo"
              width={40}
              height={40}
              className="rounded-xl p-2"
            />
          </div>

          <div className="flex flex-col">
            <h1 className="text-2xl font-bold tracking-tight text-gray-900">
              বাজার দর
            </h1>

            <div className="mt-1 text-sm text-gray-500">{date}</div>
          </div>
        </Link>

        {/* signin signup */}
        <div className="flex items-center gap-3">
          <button className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 transition duration-200 hover:border-green-900 hover:text-green-900">
            সাইন ইন
          </button>

          <button className="rounded-lg bg-green-800 px-5 py-2 font-semibold text-white shadow-sm transition duration-200 hover:bg-green-900 hover:shadow-md">
            সাইন আপ
          </button>
        </div>
      </div>
      <Navbar />
    </div>
  );
};

export default Header;
