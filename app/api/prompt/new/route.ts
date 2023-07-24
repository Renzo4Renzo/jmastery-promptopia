import { connectToDB } from "@utils/database";
import Prompt from "@models/prompt";
import User from "@models/user";

import { v4 as uuidv4 } from "uuid";

export const POST = async (request: Request) => {
  const { userEmail, prompt, tag } = await request.json();

  try {
    await connectToDB();

    const databaseUser = await User.findOne({ email: userEmail });
    const userId = databaseUser.id.toString();

    const newPrompt = new Prompt({ id: uuidv4(), creatorId: userId, prompt, tag });
    await newPrompt.save();

    return new Response(JSON.stringify(newPrompt), { status: 201 });
  } catch (error) {
    console.log("error:", error);
    return new Response("Failed to create a new prompt", { status: 500 });
  }
};
