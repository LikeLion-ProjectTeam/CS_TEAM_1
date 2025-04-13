"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Events from "../components/Events";
import Supports from "../components/Supports";
import Footer from "../components/Footer";
import { fetchEvents, fetchSupports } from "../lib/api";

type EventType = {
    title: string;
    desc: string;
    date: string;
    tags: string[];
  };
  
  type SupportType = {
    title: string;
    desc: string;
    date: string;
    location: string;
    tags: string[];
  };  

export default function Home() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<EventType[]>([]);
  const [supports, setSupports] = useState<SupportType[]>([]);


  useEffect(() => {
    async function loadData() {
      try {
        const e = await fetchEvents();
        const s = await fetchSupports();
        setEvents(e);
        setSupports(s);
      } catch (err) {
        console.error("Failed to fetch:", err);
      }
    }
    loadData();
  }, []);

  const filteredEvents = events.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSupports = supports.filter((support) =>
    support.title.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <main className="bg-white text-black font-sans">
      <Navbar setSearch={setSearch} />

      {/* Hero Section */}
      <section className="relative h-[500px] w-full">
        <img
          src="/hero.jpg"
          alt="Hero"
          className="absolute inset-0 h-full w-full object-cover z-0"
        />
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            We are here to be your eyes and ears.
          </h1>
          <p className="text-lg sm:text-xl max-w-xl">
            A world we step together, a world we live together.
          </p>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-12 px-6 max-w-6xl mx-auto bg-white">
        <Features />
      </section>

      {/* Events Section */}
      <section className="py-12 px-6 max-w-6xl mx-auto bg-white text-black">
        <Events events={filteredEvents} />
      </section>

      {/* Supports Section */}
      <section className="py-12 px-6 max-w-6xl mx-auto bg-white text-black">
        <Supports supports={filteredSupports} />

        {/* Pagination UI */}
        <div className="flex justify-center items-center gap-2 py-10 text-sm">
          <button className="px-2 py-1 text-gray-400" disabled>
            &lt; Previous
          </button>
          {[1, 2, 3, "...", 10].map((n, i) => (
            <button
              key={i}
              className={`px-3 py-1 rounded border transition ${
                n === 1
                  ? "bg-white text-black"
                  : "bg-black text-white border-white hover:bg-white hover:text-black"
              }`}
            >
              {n}
            </button>
          ))}
          <button className="px-2 py-1 border rounded text-gray-400 border-white hover:bg-white hover:text-black">
            Next &gt;
          </button>
        </div>
      </section>

    </main>
  );
}
