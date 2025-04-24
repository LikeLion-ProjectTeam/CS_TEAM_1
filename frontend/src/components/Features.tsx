import React from 'react';
import { features } from "../data/features";

export default function Features() {
  return (
    <section className="grid grid-cols-1 sm:grid-cols-3 gap-y-12 gap-x-4 text-center text-gray-700 py-12 border-t border-gray-200">
    {features.map((feature, index) => (
      <div key={index} className="px-4">
        <div className="mx-auto w-20 h-20 rounded-full bg-white flex items-center justify-center mb-4">
          {feature.icon && <img src={feature.icon} alt={feature.title} className="mx-auto mb-4 w-20 h-20 sm:w-24 sm:h-24" />}
        </div>
        <h3 className="text-lg font-semibold text-black">{feature.title}</h3>
        <p className="mt-2 text-sm text-gray-600">{feature.desc}</p>
      </div>
    ))}
  </section>
  
  );
}