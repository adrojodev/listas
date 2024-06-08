import { List } from "@phosphor-icons/react/dist/ssr";

import { Avatar, AvatarFallback } from "../ui/avatar";
import { Button } from "../ui/button";

export const Navbar = () => {
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
      <Button size="icon" variant="secondary" className="shrink-0">
        <List size={16} weight="bold" />
      </Button>
    </nav>
  );
};
