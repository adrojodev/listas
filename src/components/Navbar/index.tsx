"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { MenuNavbarButton } from "./MenuNavbarButton";

export const Navbar = () => {
  const { user } = useUser();

  return (
    <nav className="w-full flex justify-between border border-input rounded-full p-1 gap-1">
      <button>
        <Avatar>
          <AvatarFallback>SN</AvatarFallback>
        </Avatar>
      </button>
      <input
        className="bg-red-500 w-full px-1 outline-none bg-transparent"
        type="text"
        placeholder="Search"
      />
      <MenuNavbarButton />
    </nav>
  );
};
