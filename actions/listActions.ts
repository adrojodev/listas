"use server";

import mongoose from "mongoose";
import connectDB from "../config/database";
import { ListSchema, type List } from "../models/listModel";
import { createListItems } from "./listItemsActions";

interface ListResponse extends Omit<List, "creatorId" | "items"> {
  creatorId: string;
  items: { title: string; text: string }[];
}

export async function getLists(): Promise<{ data: List[] }> {
  try {
    await connectDB();
    const data = await ListSchema.find();

    return { data };
  } catch (error) {
    throw new Error(`Error getting lists: ${error}`);
  }
}

export async function getList(id: string): Promise<{ data: List }> {
  try {
    await connectDB();
    const data = await ListSchema.findById(id);

    return { data };
  } catch (error) {
    throw new Error(`Error getting list: ${error}`);
  }
}

export async function createList(list: ListResponse): Promise<boolean> {
  try {
    await connectDB();
    const creatorId = mongoose.Types.ObjectId.createFromHexString(
      list.creatorId
    );

    if (!creatorId || !list.items?.length) {
      throw new Error("Invalid creator ID or items list");
    }

    const uncompleteData = await ListSchema.create({
      ...list,
      items: undefined,
      creatorId,
    });

    const listItemsData = await createListItems(
      list.items,
      uncompleteData._id as mongoose.Types.ObjectId
    );

    await ListSchema.findByIdAndUpdate(
      uncompleteData._id,
      { items: listItemsData.data.map((item) => item._id) },
      { new: true }
    );

    return true;
  } catch (error: any) {
    throw new Error(error);
  }
}

export async function updateList(
  id: string,
  list: List
): Promise<{ data: List }> {
  try {
    await connectDB();
    const data = await ListSchema.findByIdAndUpdate(id, list, {
      new: true,
      runValidators: true,
    });

    return { data };
  } catch (error) {
    throw new Error(`Error updating list: ${error}`);
  }
}

export async function deleteList(id: string): Promise<boolean> {
  try {
    await connectDB();
    await ListSchema.findByIdAndDelete(id);

    return true;
  } catch (error) {
    throw new Error(`Error deleting list: ${error}`);
  }
}
