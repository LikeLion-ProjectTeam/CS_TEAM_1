import React from 'react';

const events = [
    {
      title: 'Learning how to ---',
      desc: 'Do you want to get your own ability to build ---?',
      date: '29 Jan 2022',
      tags: ['Dev', 'Autism', 'Learning'],
    },
    {
      title: 'Bill speaking lessons',
      desc: 'Help to fill in and learn how to write ---',
      date: '19 Jan 2022',
      tags: ['Jobs', 'Learning'],
    },
    {
      title: 'Meet up 2/28',
      desc: 'Let’s be friends and share stories.',
      date: '18 Jan 2022',
      tags: ['Communication', 'Learning'],
    },
  ];
  

const Events = () => {
  return (
    <section className="px-16 py-10">
      <h2 className="font-bold text-xl mb-6">EVENTS OF THIS MONTH</h2>
      <div className="grid grid-cols-3 gap-6">
      {events.map((event, index) => (
        <div key={index} className="border rounded-xl p-4 shadow hover:shadow-lg transition duration-300">
            <p className="text-sm text-gray-400 mb-2">{event.date}</p>
            <h4 className="text-lg font-semibold">{event.title}</h4>
            <p className="text-gray-600 text-sm">{event.desc}</p>
            {/* Tags */}
            <div className="flex gap-2 mt-2 flex-wrap">
                {event.tags.map((tag, i) => (
                    <span key={i} className="text-xs bg-gray-100 px-2 py-1 rounded-full border">
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
