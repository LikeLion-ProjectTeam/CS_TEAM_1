import React from 'react';

const features = [
  { title: "Support", desc: "Lorem ipsum dolor sit amet." },
  { title: "Finding jobs", desc: "Consectetur adipiscing elit." },
  { title: "Connect", desc: "Connect people around." },
  { title: "Information", desc: "Lorem ipsum dolor sit amet." },
  { title: "Communication", desc: "Consectetur adipiscing elit." },
  { title: "Result", desc: "Connect people around." },
];

export default function Features() {
  return (
    <section className="py-12 px-6 max-w-6xl mx-auto">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
        {features.map((f, i) => (
          <div key={i} className="rounded-lg border text-center p-6 bg-white shadow-sm">
            <div className="w-12 h-12 mx-auto rounded-full bg-gray-200 mb-4" />
            <h3 className="font-semibold mb-2">{f.title}</h3>
            <p className="text-sm text-gray-500">{f.desc}</p>
          </div>
        ))}
      </div>
    </section>
  );
}