"use client";

import React from "react";
import { events as allEvents } from "../data/events";

type EventType = {
  title: string;
  desc: string;
  date: string;
  tags: string[];
  image: string;
};

type Props = {
  events: EventType[];
};

export default function Events({ events }: Props) {
  return (
    <section className="text-black py-6">
      <h2 className="text-xl font-semibold mb-6 uppercase">Events of This Month</h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
        {events.map((event, index) => (
          <div key={index} className="flex gap-4 border border-gray-200 rounded-lg p-4 shadow-sm bg-white">
            <div className="w-1/3 min-w-[120px]">
            <img
              src={event.image || "/placeholder.jpg"}
              alt={event.title}
              className="w-full h-full object-cover rounded-md"
            />
            </div>
            <div className="w-2/3 flex flex-col justify-between">
              <p className="text-sm text-gray-400 mb-1">• {event.date}</p>
              <h3 className="text-md font-bold mb-1">{event.title}</h3>
              <p className="text-sm text-gray-600 line-clamp-2">{event.desc}</p>
              <div className="flex flex-wrap gap-1 mt-2">
                {event.tags.map((tag, i) => (
                  <span
                    key={i}
                    className="text-xs bg-gray-100 px-2 py-1 rounded border text-gray-600"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
