'use client';
import React from 'react';

type EventType = {
  title: string;
  desc: string;
  date: string;
  tags: string[];
};

const Events = ({ events }: { events: EventType[] }) => {
  return (
    <section className="px-16 py-10 bg-white text-black">
      <h2 className="font-bold text-xl mb-6">EVENTS OF THIS MONTH</h2>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
      {/* Left column: Featured event */}
      <div className="lg:col-span-2">
        {events[0] && (
          <div className="bg-white text-black p-6 rounded-lg shadow-md">
            <p className="text-sm text-gray-400 mb-2">{events[0].date}</p>
            <h4 className="font-semibold mb-2">{events[0].title}</h4>
            <p className="text-sm text-gray-600 mb-4">{events[0].desc}</p>
            <div className="flex gap-2 flex-wrap">
              {events[0].tags.map((tag, i) => (
                <span
                  key={i}
                  className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        )}
      </div>

      {/* Right column: 2 stacked cards */}
      <div className="flex flex-col gap-6">
        {events.slice(1, 3).map((event, i) => (
          <div
            key={i}
            className="bg-white text-black p-4 rounded-lg shadow-md"
          >
            <p className="text-sm text-gray-400 mb-1">{event.date}</p>
            <h4 className="font-semibold mb-1">{event.title}</h4>
            <p className="text-sm text-gray-600 mb-2">{event.desc}</p>
            <div className="flex gap-2 flex-wrap">
              {event.tags.map((tag, j) => (
                <span
                  key={j}
                  className="bg-gray-100 text-gray-800 text-xs px-2 py-1 rounded"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
</section>

  );
};

export default Events;
