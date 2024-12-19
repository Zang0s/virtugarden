import { NextResponse } from "next/server";
import Stripe from "stripe";

const stripeSecretKey = process.env.STRIPE_SECRET_KEY;


const stripe = new Stripe(stripeSecretKey);

export async function POST(request: Request) {
    try {
        const { cart } = await request.json();

        const lineItems = cart.map((item: any) => ({
            price_data: {
                currency: "pln",
                product_data: {
                    name: item.name,
                },
                unit_amount: parseFloat(item.price.replace(/[^0-9.-]+/g, "")) * 100,
            },
            quantity: item.quantity,
        }));
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ["card"],
            line_items: lineItems,
            mode: "payment",
            success_url: `${process.env.NEXT_PUBLIC_BASE_URL}/success`,
            cancel_url: `${process.env.NEXT_PUBLIC_BASE_URL}/cancel`,
        });
        return NextResponse.json({ url: session.url });
    } catch (error) {
        console.error("Błąd:", error);
        return NextResponse.json({ error: "Nie udało się utworzyć sesji Stripe" }, { status: 500 });
    }
}