import { APP_ROUTES } from "../../constants/routes";
import { Plus } from "@phosphor-icons/react/dist/ssr";
import Link from "next/link";

export const CreateButton = () => {
  return (
    <Link
      href={APP_ROUTES.CREATE}
      className="fixed top-auto left-auto right-4 bottom-4 bg-primary p-4 text-primary-foreground rounded-full border shadow-lg"
    >
      <Plus size={24} weight="bold" />
    </Link>
  );
};
