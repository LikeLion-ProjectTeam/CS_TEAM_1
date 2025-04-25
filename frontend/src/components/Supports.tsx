'use client';
import React from 'react';

type SupportType = {
  title: string;
  desc: string;
  date: string;
  location: string;
  tags: string[];
};

const Supports = ({ supports }: { supports: SupportType[] }) => {
  return (
    <section className="px-16 py-10 bg-white text-black">
    <h2 className="font-bold text-xl mb-6">SUPPORTS</h2>
      <div className="grid grid-cols-3 gap-6">
        {supports.map((support, index) => (
          <div key={index} className="bg-white text-black p-4 rounded-lg shadow">
            <p className="text-sm text-gray-400 mb-2">
              {support.location} • {support.date}
            </p>
            <h4 className="font-semibold mb-2">{support.title}</h4>
            <p className="text-sm text-gray-600">{support.desc}</p>
            <div className="flex gap-2 mt-2 flex-wrap">
            {support.tags.map((tag, i) => {
              let colorClass = "bg-gray-100 text-gray-800"; // default

              if (tag === "Jobs") colorClass = "bg-blue-100 text-blue-800";
              else if (tag === "Autism") colorClass = "bg-purple-100 text-purple-800";
              else if (tag === "Learning") colorClass = "bg-pink-100 text-pink-800";
              else if (tag === "Communication") colorClass = "bg-green-100 text-green-800";
              else if (tag === "SaaS") colorClass = "bg-red-100 text-red-800";
              else if (tag === "Self") colorClass = "bg-yellow-100 text-yellow-800";

              return (
                <span
                  key={i}
                  className={`text-xs ${colorClass} px-2 py-1 rounded`}
                >
                  {tag}
                </span>
              );
            })}
            </div>
          </div>
        ))}
      </div>
</section>

  );
};

export default Supports;
