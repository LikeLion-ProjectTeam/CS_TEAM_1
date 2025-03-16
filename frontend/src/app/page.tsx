import Features from '../components/Features';
import Events from '../components/Events';
import Supports from '../components/Supports';

export default function Home() {
  return (
    <main className="bg-white text-black">
      {/* Hero */}
      <section className="flex items-center justify-center h-[400px] bg-gray-100 text-center">
        <div>
          <h1 className="text-3xl font-bold mb-4">
            We are here to be your eyes and ears.
          </h1>
          <p className="text-gray-600">A world we step together, a world we live together.</p>
        </div>
      </section>

      {/* Features */}
      <Features />

      {/* Events */}
      <Events />

      {/* Supports */}
      <Supports />
    </main>
  );
}

