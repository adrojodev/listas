"use client";

import { useUser } from "@auth0/nextjs-auth0/client";

import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar";
import { MenuNavbarButton } from "./MenuNavbarButton";
import { twMerge } from "tailwind-merge";

export const Navbar = () => {
  const { user } = useUser();

  const userInitials = user?.name?.slice(0, 1).toUpperCase();
  const picture = user?.picture;

  return (
    <nav
      className={twMerge(
        "w-full flex justify-between border border-input rounded-full p-1 gap-1",
        !user && "pl-4"
      )}
    >
      {user && (
        <Avatar>
          {picture ? (
            <AvatarImage src={picture} alt={userInitials} />
          ) : (
            <AvatarFallback>{user?.name}</AvatarFallback>
          )}
        </Avatar>
      )}
      <input
        className="w-full px-1 outline-none bg-transparent"
        type="text"
        placeholder="Search"
      />
      <MenuNavbarButton />
    </nav>
  );
};
