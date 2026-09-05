import { useState } from 'react';
import EventModal from '../components/EventModal';
import Footer from '../components/Footer';
import Navbar from '../components/Navbar';
import PastEvents from '../components/PastEvents';

function EventsPage() {
  const [menuOpen, setMenuOpen] = useState(false);
  const [selectedEvent, setSelectedEvent] = useState(null);

  return (
    <>
      <Navbar menuOpen={menuOpen} setMenuOpen={setMenuOpen} />
      <section className="page-hero events-hero container">
        <span className="kicker">IET / ACTIVITY LOG / 2026</span>
        <h1>Show up.<br /><em>Learn. Ship.</em></h1>
        <p>Workshops, contest watches, talks and build sessions designed for consistent technical progress.</p>
          <div className="events-hero-logo" aria-hidden="true">
            <img src="/iet-bit-mesra.svg" alt="" />
          </div>
      </section>
      <main className="events-page container">
        <PastEvents splitWorkshops onLearnMore={setSelectedEvent} />
      </main>
      <EventModal event={selectedEvent} onClose={() => setSelectedEvent(null)} />
      <Footer />
    </>
  );
}

export default EventsPage;