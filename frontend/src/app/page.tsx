import React, { useState } from 'react';
import Navbar from '../components/Navbar';
import Events from '../components/Events';
import Supports from '../components/Supports';
import { events as allEvents } from '../data/events';
import { supports as allSupports } from '../data/supports';

export default function Home() {
  const [search, setSearch] = useState('');

  const filteredEvents = allEvents.filter((event) =>
    event.title.toLowerCase().includes(search.toLowerCase())
  );

  const filteredSupports = allSupports.filter((support) =>
  support.title.toLowerCase().includes(search.toLowerCase())
);

<Supports supports={filteredSupports} />

  return (
    <main>
      <Navbar setSearch={setSearch} />

      {/* Hero, Features */}

      <Events events={filteredEvents} />
      <Supports supports={filteredSupports} />
    </main>
  );
}
