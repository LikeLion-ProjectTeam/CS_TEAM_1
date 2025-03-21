import React from 'react';

type EventType = {
  title: string;
  desc: string;
  date: string;
  tags: string[];
};

const Events = ({ events }: { events: EventType[] }) => {
  return (
    <section className="px-16 py-10">
      <h2 className="font-bold text-xl mb-6">EVENTS OF THIS MONTH</h2>
      <div className="grid grid-cols-3 gap-6">
        {events.map((event, index) => (
          <div key={index} className="border rounded-lg p-4 shadow-sm">
            <p className="text-sm text-gray-400 mb-2">{event.date}</p>
            <h4 className="font-semibold mb-2">{event.title}</h4>
            <p className="text-sm text-gray-600">{event.desc}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
              {event.tags.map((tag, i) => (
                <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded">
                  {tag}
                </span>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default Events;

