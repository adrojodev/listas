import Link from "next/link";
import { List, SignIn, SignOut, User } from "@phosphor-icons/react/dist/ssr";
import { useUser } from "@auth0/nextjs-auth0/client";

import { Button } from "../ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "../ui/dropdown-menu";
import { APP_ROUTES } from "@/constants/routes";

export const MenuNavbarButton = () => {
  const { user } = useUser();

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button size="icon" variant="secondary" className="shrink-0">
          <List size={16} weight="bold" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent>
        {user ? (
          <>
            <DropdownMenuItem asChild>
              <Link className="gap-2" href={APP_ROUTES.USER_PROFILE}>
                <User weight="bold" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link className="gap-2" href={APP_ROUTES.LOGOUT}>
                <SignOut weight="bold" />
                Logout
              </Link>
            </DropdownMenuItem>
          </>
        ) : (
          <DropdownMenuItem asChild>
            <Link className="gap-2" href={APP_ROUTES.LOGIN}>
              <SignIn weight="bold" />
              Login / Sign Up
            </Link>
          </DropdownMenuItem>
        )}
      </DropdownMenuContent>
    </DropdownMenu>
  );
};
