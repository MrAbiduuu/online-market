import Link from "next/link";
import React from "react";

interface Nav {
  id: string;
  slug: string;
  nameBn: string;
  icon: string;
}

const Navbar = async () => {
  const res = await fetch(
    "https://api.abcz.workers.dev/api/bazardor/categories",
  );

  const navs: Nav[] = await res.json();

  return (
    <nav className="border-b border-gray-200 bg-white shadow-sm">
      <div className="container mx-auto overflow-x-auto px-4">
        <div className="flex min-w-max items-center justify-left gap-2 py-3">
          <Link
            href="/"
            className="rounded-lg px-4 py-1 text-sm font-semibold text-gray-700 transition hover:bg-red-50 hover:text-red-600"
          >
            🏠 হোম
          </Link>

          {navs.map((nav) => (
            <Link
              key={nav.id}
              href={`/category/${nav.slug}`}
              className="font-bold flex items-center gap-1 rounded-lg px-3 py-1 text-gray-600 transition hover:bg-red-50 hover:text-red-600"
            >
              <span className="text-xl">{nav.icon}</span>
              <span>{nav.nameBn}</span>
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
