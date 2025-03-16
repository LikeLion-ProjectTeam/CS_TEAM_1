import React from 'react';

const features = [
  { title: 'Support', desc: 'Lorem ipsum dolor sit amet.', icon: '🦾' },
  { title: 'Finding jobs', desc: 'Consectetur adipiscing elit.', icon: '💼' },
  { title: 'Connect', desc: 'Connect people around.', icon: '🔗' },
  { title: 'Information', desc: 'Share important info.', icon: 'ℹ️' },
  { title: 'Communication', desc: 'Effective messaging.', icon: '💬' },
  { title: 'Result', desc: 'Track outcomes.', icon: '✅' },
];

const Features = () => (
  <div className="grid grid-cols-3 gap-8 px-16 py-10 text-center">
    {features.map((f, idx) => (
      <div key={idx} className="border rounded-xl p-4 shadow hover:shadow-lg transition duration-300">
        <div className="w-16 h-16 bg-gray-300 rounded-full mx-auto mb-4 flex items-center justify-center text-2xl">
          {f.icon}
        </div>
        <h3 className="text-lg font-semibold">{f.title}</h3>
        <p className="text-gray-600 text-sm">{f.desc}</p>
      </div>
    ))}
  </div>
);

export default Features;
