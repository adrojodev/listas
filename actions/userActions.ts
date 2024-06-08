"use server";

import connectDB from "../config/database";
import { UserSchema, type User } from "../models/userModel";

export async function getUser(id: string): Promise<{ data: User }> {
  try {
    await connectDB();
    const data = await UserSchema.findById(id);

    return { data };
  } catch (error) {
    throw new Error(`Error getting user: ${error}`);
  }
}

export async function createUser(list: User): Promise<{ data: User }> {
  try {
    await connectDB();
    const data = await UserSchema.create(list);

    return { data };
  } catch (error) {
    throw new Error(`Error creating user: ${error}`);
  }
}

export async function updateUser(id: string, user: User): Promise<boolean> {
  try {
    await connectDB();
    const data = await UserSchema.findByIdAndUpdate(id, user, {
      new: true,
      runValidators: true,
    });

    return true;
  } catch (error) {
    throw new Error(`Error updating user: ${error}`);
  }
}

export async function deleteUser(id: string): Promise<boolean> {
  try {
    await connectDB();
    await UserSchema.findByIdAndDelete(id);

    return true;
  } catch (error) {
    throw new Error(`Error deleting user: ${error}`);
  }
}
