import { Schema, Types, model, models } from "mongoose";
import { ListItem } from "./listItemModel";

export interface List {
  title: string;
  description: string;
  items?: Types.ObjectId[];
  creatorId: Types.ObjectId;
}

const listSchema = new Schema<List>(
  {
    title: {
      type: String,
      required: true,
    },
    description: String,
    items: [Schema.Types.ObjectId],
    creatorId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export const ListSchema = models.List || model("List", listSchema);
