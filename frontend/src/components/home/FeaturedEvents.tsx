import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useEvents } from '../../contexts/EventsContext';
import { Event, EventCategory } from '../../types';
import { EventCard } from '../ui/EventCard';

export const FeaturedEvents = () => {
  const { events } = useEvents();
  const [featuredEvents, setFeaturedEvents] = useState<{event: Event, category: EventCategory}[]>([]);
  
  useEffect(() => {
    if (!events) return;
    
    // Get random events from different categories
    const featured: {event: Event, category: EventCategory}[] = [];
    const categories = Object.keys(events.category_groups) as EventCategory[];
    
    // Get up to 4 featured events
    for (let i = 0; i < Math.min(4, categories.length); i++) {
      const category = categories[i];
      const categoryEvents = events.category_groups[category];
      
      if (categoryEvents && categoryEvents.length > 0) {
        // Get a random event from this category
        const randomIndex = Math.floor(Math.random() * categoryEvents.length);
        featured.push({
          event: categoryEvents[randomIndex],
          category
        });
      }
    }
    
    setFeaturedEvents(featured);
  }, [events]);
  
  if (!events || featuredEvents.length === 0) return null;
  
  return (
    <section id="featured" className="py-16 bg-white dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <motion.h2 
            className="text-3xl font-bold text-gray-900 dark:text-white mb-4"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            Featured Events
          </motion.h2>
          <motion.p 
            className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
          >
            Check out these highlighted events from across Sydney. Don't miss out!
          </motion.p>
        </div>
        
        <motion.div 
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ staggerChildren: 0.1, delayChildren: 0.3 }}
        >
          {featuredEvents.map(({event, category}) => (
            <motion.div
              key={event.event_id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
            >
              <EventCard event={event} category={category} />
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};