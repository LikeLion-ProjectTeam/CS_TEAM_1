"use client";

import React, { useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Features from "../components/Features";
import Events from "../components/Events";
import Supports from "../components/Supports";
import Footer from "../components/Footer";
import { SupportType, EventType } from "../types";
import { events as allEvents } from "../data/events";
import { fetchTagSearch, fetchMultiSearch } from "../lib/searchApi";

export default function Home() {
  const [search, setSearch] = useState("");
  const [events, setEvents] = useState<EventType[]>([]);
  const [supports, setSupports] = useState<SupportType[]>([]);

useEffect(() => {
  async function loadData() {
    try {
      // First try multi-search
      const multiResults = await fetchMultiSearch({
        keyword: "disability",
        hashtags: ["support"],
        category: "event"
      });
      setEvents(multiResults.results || []);

      // Then try tag search
      const tagResults = await fetchTagSearch("deaf");
      setSupports(tagResults);
      
    } catch (err) {
      console.error("Failed to load data:", err);
      // Fallback to placeholder data if API fails
      setEvents(allEvents);
      setSupports([]); // Or some default support data
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

      {/* Hero */}
      <section className="relative h-[500px] w-full overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img
            src="/hero.jpg"
            alt="Hero"
            className="w-full h-full object-cover filter blur-sm brightness-50 scale-105"
          />
        </div>
        <div className="relative z-10 flex h-full flex-col items-center justify-center text-white text-center px-4">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">
            We are here to be your eyes and ears.
          </h1>
          <p className="text-lg sm:text-xl max-w-xl">
            A world we step together, a world we live together.
          </p>
        </div>
      </section>

      {/* Features */}
      <section className="py-12 px-6 max-w-6xl mx-auto bg-white">
        <Features />
      </section>

      {/* Events */}
      <section className="py-12 px-6 max-w-6xl mx-auto bg-white">
        <Events events={filteredEvents.length ? filteredEvents : allEvents} />
      </section>

      {/* Supports */}
      <section className="py-12 px-6 max-w-6xl mx-auto bg-white">
        <Supports supports={filteredSupports} />

        {/* Pagination */}
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
