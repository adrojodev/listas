import { Avatar, AvatarFallback } from "../ui/avatar";

export const ListCard = () => {
  return (
    <div className="bg-card border border-input py-2">
      <div className="w-full px-2 flex justify-between">
        <div className="flex">
          <Avatar>
            <AvatarFallback>SN</AvatarFallback>
          </Avatar>
          <div className=""></div>
        </div>
      </div>
    </div>
  );
};
