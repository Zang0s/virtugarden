import { NextResponse } from "next/server";
import Stripe from "stripe";

// Pobieranie klucza Stripe
const stripeSecretKey = process.env.STRIPE_SECRET_KEY;

if (!stripeSecretKey) {
  throw new Error("Stripe secret key is not defined in .env.local");
}

const stripe = new Stripe(stripeSecretKey, {
  apiVersion: "2024-12-18.acacia",
});

// API Route: obsługa POST
export async function POST(request: Request) {
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL;
    if (!baseUrl) {
      throw new Error("NEXT_PUBLIC_BASE_URL is not defined in .env.local");
    }

    const { cart } = await request.json();

    if (!cart || !Array.isArray(cart)) {
      throw new Error("Invalid cart data");
    }

    const lineItems = cart.map((item: any) => {
      const price = parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * 100;

      if (isNaN(price) || price <= 0) {
        throw new Error(`Invalid price for item: ${item.name}`);
      }

      return {
        price_data: {
          currency: "pln",
          product_data: {
            name: item.name,
          },
          unit_amount: Math.round(price),
        },
        quantity: item.quantity,
      };
    });

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: lineItems,
      mode: "payment",
      success_url: `${baseUrl}/success`,
      cancel_url: `${baseUrl}/cancel`,
    });

    return NextResponse.json({ url: session.url });
  } catch (error) {
    if (error instanceof Error) {
      console.error("Stripe API error:", error.message);
    } else {
      console.error("Stripe API error:", error);
    }
    return NextResponse.json(
      { error: "Nie udało się utworzyć sesji Stripe" },
      { status: 500 }
    );
  }
}
