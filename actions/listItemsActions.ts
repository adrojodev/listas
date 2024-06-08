"use server";

import mongoose from "mongoose";
import connectDB from "../config/database";
import { ListItemSchema, type ListItem } from "../models/listItemModel";

interface ListItemResponse extends Omit<ListItem, "listId"> {}

interface ListItemIdentifier extends ListItem {
  _id: mongoose.Types.ObjectId;
}

export async function getListItems(): Promise<{ data: ListItem[] }> {
  try {
    await connectDB();
    const data = await ListItemSchema.find();

    return { data };
  } catch (error) {
    throw new Error(`Error getting list items: ${error}`);
  }
}

export async function getListItem(id: string): Promise<{ data: ListItem }> {
  try {
    await connectDB();
    const data = await ListItemSchema.findById(id);

    return { data };
  } catch (error) {
    throw new Error(`Error getting list item: ${error}`);
  }
}

export async function createListItem(
  item: ListItem
): Promise<{ data: ListItem }> {
  try {
    await connectDB();
    const data = await ListItemSchema.create(item);

    return { data };
  } catch (error) {
    throw new Error(`Error creating list item: ${error}`);
  }
}

export async function createListItems(
  items: ListItemResponse[],
  listId: mongoose.Types.ObjectId
): Promise<{ data: ListItemIdentifier[] }> {
  try {
    await connectDB();
    const data = await ListItemSchema.insertMany(
      items.map((item) => ({ ...item, listId: listId }))
    );

    return { data };
  } catch (error: any) {
    throw new Error(`Error creating list items: ${error.message}`);
  }
}

export async function updateListItem(
  id: string,
  item: Partial<ListItem>
): Promise<boolean> {
  try {
    await connectDB();
    const data = await ListItemSchema.findByIdAndUpdate(id, item, {
      new: true,
      runValidators: true,
    });

    return true;
  } catch (error) {
    throw new Error(`Error updating list item: ${error}`);
  }
}

export async function deleteListItem(id: string) {
  try {
    await connectDB();
    await ListItemSchema.findByIdAndDelete(id);

    return true;
  } catch (error) {
    throw new Error(`Error deleting list item: ${error}`);
  }
}
