import dbConnect from "@/db/config/dbConnect";
import User from "@/db/models/user";
import bcrypt from "bcryptjs";

dbConnect();

export async function POST(request) {
  const { user, password } = await request.json();

  // Check if email and password are provided
  if (!user || !password) {
    return new Response("Invalid username or password", { status: 400 });
  }

  // Find the user in the database
  const currentUser = await User.findOne({ user });

  // If user is not found, return an error
  if (!currentUser) {
    return new Response("Invalid username or password", { status: 400 });
  }

  const isPasswordValid = await bcrypt.compare(password, currentUser.password);
  if (isPasswordValid) {
    return new Response(currentUser.user, { status: 200 });
  } else {
    return new Response("Invalid username or password", { status: 400 });
  }
}
