import { Navbar } from "@/components/Navbar";
import { getLists } from "../../actions/listActions";
import { CreateButton } from "@/components/CreateButton";

export default async function Home() {
  const { data: lists } = await getLists();

  return (
    <main className="bg-background flex flex-col pt-2 px-2 gap-4">
      <Navbar />
      <h2 className="text-3xl">Discover lists</h2>
      <CreateButton />
      {lists.map((list, index) => (
        <div key={index} className="flex justify-between">
          <h1>{list.title}</h1>
          <span className="bg-foreground text-primary-foreground">
            {list.items?.length} {list.items?.length === 1 ? "item" : "items"}
          </span>
        </div>
      ))}
    </main>
  );
}
