"use client";

import Link from "next/link";
import { useFieldArray, useForm } from "react-hook-form";
import { Plus, TrashSimple, X } from "@phosphor-icons/react/dist/ssr";

import { Button } from "@/components/ui/button";
import { APP_ROUTES } from "@/constants/routes";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { createList } from "../../../../actions/listActions";

interface ListItem {
  listItems: { title: string; text: string }[];
}

interface FormValues {
  title: string;
  description: string;
  listItems: ListItem[];
}

export default function CreatePage() {
  const {
    register: formRegister,
    handleSubmit,
    formState,
  } = useForm<FormValues>();

  const { register: itemsRegister, control: itemsControl } = useForm<ListItem>({
    defaultValues: { listItems: [{ title: "", text: "" }] },
  });

  const {
    fields: listItemsArray,
    append: appendListItem,
    remove: removeListItem,
  } = useFieldArray({
    control: itemsControl,
    name: "listItems",
  });

  const onSubmit = async (data: FormValues) => {
    await createList({
      title: data.title,
      description: data.description,
      creatorId: "60f7b3b3b3b3b3b3b3b3b3b3",
      items: listItemsArray,
    });
  };

  return (
    <section className="flex flex-col px-2 pt-2 pb-4">
      <form
        onSubmit={handleSubmit(onSubmit)}
        className="relative flex flex-col gap-4"
      >
        <header className="flex w-full justify-between">
          <Button variant="outline" size="icon" asChild>
            <Link href={APP_ROUTES.HOME}>
              <X />
            </Link>
          </Button>
          <Button disabled={formState.isSubmitting} type="submit">
            {formState.isSubmitting ? "Creating..." : "Create"}
          </Button>
        </header>
        <h2 className="text-3xl">Create a new list</h2>
        <div className="flex flex-col gap-3">
          <div className="flex flex-col gap-1">
            <Label htmlFor="title">Title</Label>
            <Input
              id="title"
              placeholder="Best food in México City"
              {...formRegister("title")}
            />
          </div>
          <div className="flex flex-col gap-1">
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              placeholder="Find the best places to it in the whole city!"
              {...formRegister("description")}
            />
          </div>
        </div>
        <hr className="border-input" />
        {listItemsArray.map((_, index) => (
          <div key={index} className="flex flex-col w-full py-1">
            <div className="flex gap-1 w-full">
              <span className="pt-0.5">{index + 1}.</span>
              <div className="flex flex-col w-full">
                <input
                  {...itemsRegister(`listItems.${index}.title`, {
                    required: true,
                  })}
                  type="text"
                  placeholder="Title"
                  className="px-2 text-lg font-semibold bg-background w-full outline-none placeholder:text-muted-foreground"
                />
                <textarea
                  placeholder="Description"
                  className="px-2 text-sm bg-background outline-none placeholder:text-muted-foreground"
                  {...itemsRegister(`listItems.${index}.text`, {
                    required: true,
                  })}
                />
              </div>
              {index !== 0 && (
                <Button
                  onClick={() => removeListItem(index)}
                  size="icon"
                  variant="ghost"
                  className="shrink-0"
                >
                  <TrashSimple />
                </Button>
              )}
            </div>
            <hr className="border-input" />
          </div>
        ))}
        <Button
          onClick={() => appendListItem({ title: "", text: "" })}
          size="sm"
          variant="secondary"
          className="gap-1"
        >
          Add item <Plus size={16} weight="bold" />
        </Button>
      </form>
    </section>
  );
}
