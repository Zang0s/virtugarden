"use client";

import { useCart } from "../context/CartContext";

export default function OfferSection() {
  const { addToCart } = useCart();

  const products = [
    { id: 1, name: "Symulator Lotu VR", description: "Realistyczne wrażenia lotu.", price: "50 zł/dzień", quantity: 1 },
    { id: 2, name: "Gra Przygodowa VR", description: "Wejdź do świata pełnego tajemnic.", price: "40 zł/dzień", quantity: 1 },
    { id: 3, name: "Fitness VR", description: "Trenuj z najlepszymi instruktorami.", price: "30 zł/dzień", quantity: 1 },
  ];

  return (
    <section id="oferta" className="py-16 bg-white">
      <h2 className="text-3xl font-bold text-center mb-8">Nasza Oferta</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto px-4">
        {products.map((product) => (
          <div key={product.id} className="border rounded-lg shadow p-6 text-center">
            <h3 className="text-2xl font-semibold mb-2">{product.name}</h3>
            <p className="text-gray-600 mb-4">{product.description}</p>
            <p className="font-bold mb-4">{product.price}</p>
            <button
              onClick={() => addToCart(product)}
              className="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded transition"
            >
              Dodaj do koszyka
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}
