"use client";

import { authClient } from "@/lib/auth-client";
import Link from "next/link";

const UserInfo = () => {
  const { data: session } = authClient.useSession();
  const user = session?.user;

  const handleSignOut = async () => {
    await authClient.signOut();
  };

  return (
    <div>
      {!user ? (
        <div className="flex items-center gap-3">
          <Link
            href="/sign-in"
            className="rounded-lg border border-gray-300 px-5 py-2 font-medium text-gray-700 transition duration-200 hover:border-green-900 hover:text-green-900"
          >
            সাইন ইন
          </Link>

          <Link
            href="/sign-up"
            className="rounded-lg bg-green-800 px-5 py-2 font-semibold text-white shadow-sm transition duration-200 hover:bg-green-900 hover:shadow-md"
          >
            সাইন আপ
          </Link>
        </div>
      ) : (
        <div className="flex items-center gap-1 text-sm font-medium text-gray-700">
          <div className="p-2 bg-gray-200 rounded-2xl flex gap-1 items-center">
            <span
              className="flex h-9 w-10 items-center justify-center rounded-2xl bg-green-900 font-bold text-white"
              title={user.email}
            >
              {user.name?.[0]?.toUpperCase() ||
                user.email?.[0]?.toUpperCase() ||
                "U"}
            </span>
            <p>{user.name}</p>
          </div>

          <div className="dropdown dropdown-end">
            <div tabIndex={0} role="button" className="btn m-1">
              ⌄
            </div>
            <ul
              tabIndex={-1}
              className="dropdown-content menu bg-base-100 rounded-box z-1 w-52 p-2 shadow-sm"
            >
              <li>
                <Link
                  href={`/profile`}
                  className="rounded-lg border border-red-200 px-4 py-2 font-semibold text-red-600 transition duration-200 hover:border-red-600 hover:bg-red-50"
                >
                  Profile
                </Link>
              </li>
              <li>
                <button
                  onClick={handleSignOut}
                  className="rounded-lg border border-red-200 px-4 py-2 font-semibold text-red-600 transition duration-200 hover:border-red-600 hover:bg-red-50"
                >
                  সাইন আউট
                </button>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserInfo;
