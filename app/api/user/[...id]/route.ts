import { connectToDB } from "@utils/database";
import User from "@models/user";

export const GET = async (request: Request) => {
  const creatorID = request.url.split("/").slice(-1);

  try {
    await connectToDB();
    const user = await User.findOne({ id: creatorID });

    return new Response(JSON.stringify(user), { status: 200 });
  } catch (error) {
    console.log("error:", error);
    return new Response("Failed to fetch user", { status: 500 });
  }
};
