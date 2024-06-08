import { Schema, model, models } from "mongoose";
import { List } from "./listModel";

export interface User {
  name: string;
  email: string;
  lists: List[];
  savedLists: List[];
}

const userSchema = new Schema<User>(
  {
    name: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    lists: [{ type: Schema.Types.ObjectId, ref: "List" }],
    savedLists: [{ type: Schema.Types.ObjectId, ref: "List" }],
  },
  { timestamps: true }
);

export const UserSchema = models.User || model("User", userSchema);
