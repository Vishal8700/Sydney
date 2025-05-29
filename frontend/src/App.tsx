import React from 'react';
import { Toaster } from 'react-hot-toast';
import { Routes, Route } from 'react-router-dom'; // Import Routes and Route
import { Header } from './components/layout/Header';
import { VideoHero } from './components/home/VideoHero';
import { Hero } from './components/home/Hero';
import { FeaturedEvents } from './components/home/FeaturedEvents';
import { Newsletter } from './components/home/Newsletter';
import { Footer } from './components/layout/Footer';
import { ThemeProvider } from './contexts/ThemeContext';
import { EventsProvider } from './contexts/EventsContext';
import { EventsPage } from './pages/Events'; // Import EventsPage
import MoreAboutSydney from './components/home/MoreAbout';
import SydneyDealCard from './components/home/SydneyDealCard';

// Create a new component for the Home page layout
const HomePage = () => (
  <>
  <VideoHero />
    <Hero />
    <FeaturedEvents />
    <SydneyDealCard/>
    <MoreAboutSydney/>
    <Newsletter />
    
  </>
);

function App() {
  return (
    <ThemeProvider>
      <Header />
      <EventsProvider>
        <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors duration-300 pt-16 md:pt-20"> {/* Added padding top for fixed header */}
          <Toaster position="top-right" />
          <main>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/events" element={<EventsPage />} />
              {/* Add other routes here as needed */}
            </Routes>
          </main>
          <Footer />
        </div>
      </EventsProvider>
    </ThemeProvider>
  );
}

export default App;