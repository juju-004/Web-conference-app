import dbConnect from "@/db/config/dbConnect";
import User from "@/db/models/user";
import bcrypt from "bcryptjs";

dbConnect();

export async function POST(request) {
  const { user, password } = await request.json();
  console.log(user, password);

  const existingUser = await User.findOne({ user });
  if (existingUser) {
    return new Response("User already exists", {
      status: 400,
    });
  }

  // Hash the password before storing it in the database
  const hashedPassword = await bcrypt.hash(password, 10);

  // If user is created successfully, return a success message
  const users = await User.create({ user, password: hashedPassword });

  return new Response(users.user, { status: 200 });
}
