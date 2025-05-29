import { motion } from 'framer-motion';
import { Calendar } from 'lucide-react';
import { useEvents } from '../contexts/EventsContext';
import { CategoryFilter } from '../components/ui/CategoryFilter';
import { EventCard } from '../components/ui/EventCard';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { Event, EventCategory } from '../types';

export const EventsPage = () => {
  const { isLoading, getFilteredEvents } = useEvents();
  const filteredEvents = getFilteredEvents();
  const categories = Object.keys(filteredEvents) as EventCategory[];

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
        <Header />
        <main className="container mx-auto px-4 py-16">
          <div className="text-center">
            <Calendar className="h-12 w-12 mx-auto text-blue-600 dark:text-blue-400 animate-pulse" />
            <h2 className="text-2xl font-bold mt-4 text-gray-800 dark:text-white">Loading events...</h2>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900">
      <Header />
      <main className="container mx-auto px-4 py-16">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">All Events</h1>
          
          <CategoryFilter />

          {categories.length === 0 ? (
            <div className="text-center py-16">
              <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-4">
                No events match your selected categories
              </h3>
              <p className="text-gray-600 dark:text-gray-400">
                Try selecting different categories to see more events.
              </p>
            </div>
          ) : (
            <div className="space-y-12">
              {categories.map((category) => (
                <motion.div
                  key={category}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5 }}
                  className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md"
                >
                  <h2 className="text-2xl font-semibold text-gray-900 dark:text-white mb-6">
                    {category.charAt(0).toUpperCase() + category.slice(1)} Events
                  </h2>
                  <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    {filteredEvents[category].map((event: Event) => (
                      <EventCard
                        key={event.event_id}
                        event={event}
                        category={category}
                      />
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          )}
        </motion.div>
      </main>
     
    </div>
  );
};