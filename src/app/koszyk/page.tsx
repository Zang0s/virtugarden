"use client";
import Menu from "@/components/Menu";
import { useCart } from "../../context/CartContext";
import { useRouter } from "next/router";


export default function CartPage() {
  const { cart, addToCart, removeFromCart, getTotalPrice } = useCart();
  const router = useRouter();

  const handleCheckout = async () => {
    if (cart.length === 0) {
      alert("Twój koszyk jest pusty.");
      return;
    }

    try {
      const response = await fetch("/api/checkout", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ cart }),
      });

      const data = await response.json();
      if (response.ok) {
        router.push(data.url); // Przekierowanie do płatności
      } else {
        alert("Błąd podczas przechodzenia do płatności.");
      }
    } catch (error) {
      console.error("Błąd:", error);
    }
  };

  


  return (
    <section className="min-h-screen bg-gray-100">
        <Menu />
        <div className="max-w-3xl mx-auto p-6">
      <h1 className="text-4xl font-bold text-gray-800 mb-6">Twój Koszyk</h1>
      {cart.length === 0 ? (
        <p className="text-gray-700">Koszyk jest pusty.</p>
      ) : (
        <>
          <ul className="space-y-4">
            {cart.map((item) => (
              <li
                key={item.id}
                className="flex justify-between items-center p-4 bg-white shadow rounded"
              >
                <div>
                  <h3 className="text-xl font-semibold text-gray-700">{item.name}</h3>
                  <p className="text-gray-600">
                    {item.price} x {item.quantity}
                  </p>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => addToCart(item)}
                    className="bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded"
                  >
                    +
                  </button>
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
                  >
                    -
                  </button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-6 text-right">
            <h2 className="text-2xl font-bold text-gray-700">Łączna kwota: {getTotalPrice().toFixed(2)} zł</h2>
          </div>
          <button onClick={handleCheckout} className="mt-6 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded">
            Przejdź do płatności
          </button>
        </>
      )}
    </div>
    </section>
  );
}
