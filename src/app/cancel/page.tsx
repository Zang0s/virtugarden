"use client";

import Link from "next/link";

export default function CancelPage() {
  return (
    <section className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center p-6 bg-white rounded shadow-lg">
        <h1 className="text-4xl font-bold text-red-600 mb-4">Płatność anulowana</h1>
        <p className="text-gray-700 mb-6">
          Anulowałeś proces płatności. Możesz wrócić do koszyka i spróbować ponownie.
        </p>
        <Link
          href="/koszyk"
          className="inline-block bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded text-lg"
        >
          Wróć do koszyka
        </Link>
      </div>
    </section>
  );
}
