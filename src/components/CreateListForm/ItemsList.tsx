"use client";

import React from "react";
import { TrashSimple } from "@phosphor-icons/react/dist/ssr";

import { Button } from "../ui/button";

export const ItemsList = () => {
  const [items, setItems] = React.useState([
    { id: 1, title: "", description: "" },
  ]);

  function deleteItem(id: number) {
    const newItems = items.filter((i) => i.id !== id);

    console.log({ newItems });
    setItems((prev) => prev.filter((i) => i.id !== id));
  }

  function updateItem(id: number, key: string, value: string) {
    setItems((prev) =>
      prev.map((item) => {
        if (item.id === id) {
          return { ...item, [key]: value };
        }

        return item;
      })
    );
  }

  return (
    <div className="flex flex-col items-start gap-2">
      <div className="flex flex-col w-full">
        {items.map((item, index) => (
          <div key={index} className="flex flex-col w-full py-1">
            <div className="flex gap-1 w-full">
              <span className="pt-0.5">{index + 1}.</span>
              <div className="flex flex-col w-full">
                <input
                  onChange={(e) => updateItem(item.id, "title", e.target.value)}
                  value={item.title}
                  type="text"
                  placeholder="Title"
                  className="px-2 text-lg font-semibold bg-background w-full outline-none"
                />
                <textarea
                  onChange={(e) =>
                    updateItem(item.id, "description", e.target.value)
                  }
                  placeholder="Description"
                  className="px-2 text-sm bg-background outline-none"
                  defaultValue={item.description}
                />
              </div>
              {index !== 0 && (
                <Button
                  onClick={() => deleteItem(item.id)}
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
      </div>
    </div>
  );
};
