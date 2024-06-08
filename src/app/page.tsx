import { Navbar } from "@/components/Navbar";
import { getLists } from "../../actions/listActions";
import { CreateButton } from "@/components/CreateButton";

export default async function Home() {
  const lists = await getLists();

  return (
    <main className="bg-background flex flex-col pt-2 px-2 gap-4">
      <Navbar />
      <h2 className="text-3xl">Your lists</h2>
      <CreateButton />
    </main>
  );
}
