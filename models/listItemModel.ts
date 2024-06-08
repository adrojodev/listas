import { Schema, model, models } from "mongoose";

export interface ListItem {
  title: string;
  text: string;
  url?: string;
  image?: string;
}

const listItemSchema = new Schema<ListItem>({
  title: { type: String, required: true },
  text: { type: String, required: true },
  url: String,
  image: String,
});

export const ListItemSchema =
  models.ListItem || model("ListItem", listItemSchema);
