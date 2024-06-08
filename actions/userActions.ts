"use server";

import connectDB from "../config/database";
import { UserSchema, type User } from "../models/userModel";

export async function getUser(id: string) {
  try {
    await connectDB();
    const data = await UserSchema.findById(id);

    return { data };
  } catch (error) {
    console.log("Something went wrong:", error);
    return false;
  }
}

export async function createUser(list: User) {
  try {
    await connectDB();
    const data = await UserSchema.create(list);

    return { data };
  } catch (error) {
    console.log("Something went wrong:", error);
    return false;
  }
}

export async function updateUser(id: string, user: User) {
  try {
    await connectDB();
    const data = await UserSchema.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });

    return { data };
  } catch (error) {
    console.log("Something went wrong:", error);
    return false;
  }
}

export async function deleteUser(id: string) {
  try {
    await connectDB();
    await UserSchema.findByIdAndDelete(id);

    return true;
  } catch (error) {
    console.log("Something went wrong:", error);
    return false;
  }
}
