import dbConnect from "@/lib/mongodb";

export async function GET() {
  try {
    await dbConnect();
    return new Response("Połączono z MongoDB!");
  } catch (error) {
    return new Response("Błąd połączenia z MongoDB!", { status: 500 });
  }
}
