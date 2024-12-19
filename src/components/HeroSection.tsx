export default function HeroSection() {
    return (
      <section className="h-screen flex flex-col justify-center items-center text-center bg-gray-100">
        <h1 className="text-5xl font-bold text-gray-800 mb-4">
          Wypożycz Oprogramowanie VR
        </h1>
        <p className="text-xl text-gray-600 max-w-2xl mb-6">
          VirtuGarden oferuje najlepsze oprogramowanie na Google VR – wypożycz już teraz
          i ciesz się niesamowitymi wrażeniami!
        </p>
        <a
          href="#oferta"
          className="bg-blue-500 hover:bg-blue-600 text-white py-3 px-6 rounded text-lg transition"
        >
          Przeglądaj ofertę
        </a>
      </section>
    );
  }
  