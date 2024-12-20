import bcrypt from "bcryptjs";
import dbConnect from "@/lib/mongodb";
import User from "@/models/User";

export async function POST(request: Request) {
  try {
    const { email, password, name } = await request.json();

    if (!email || !password || !name) {
      return new Response("Wszystkie pola są wymagane", { status: 400 });
    }

    await dbConnect();

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return new Response("Użytkownik o tym e-mailu już istnieje", { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = new User({
      email,
      password: hashedPassword,
      name,
    });

    await user.save();

    return new Response("Rejestracja zakończona sukcesem", { status: 201 });
  } catch (error) {
    console.error(error);
    return new Response("Błąd serwera", { status: 500 });
  }
}
