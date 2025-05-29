import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Filter, ArrowDown, ArrowUp, Calendar } from 'lucide-react';
import { useEvents } from '../../contexts/EventsContext';
import { EventCard } from '../ui/EventCard';
import { CategoryFilter } from '../ui/CategoryFilter';
import { EventCategory, Event } from '../../types';

export const ExploreSection = () => {
  const { isLoading, getFilteredEvents } = useEvents();
  const [expandedCategories, setExpandedCategories] = useState<string[]>([]);
  
  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => 
      prev.includes(category) 
        ? prev.filter(c => c !== category)
        : [...prev, category]
    );
  };
  
  if (isLoading) {
    return (
      <section id="events\" className="py-16 bg-gray-50 dark:bg-gray-900">
        <div className="container mx-auto px-4">
          <div className="text-center">
            <Calendar className="h-12 w-12 mx-auto text-blue-600 dark:text-blue-400 animate-pulse" />
            <h2 className="text-2xl font-bold mt-4 text-gray-800 dark:text-white">Loading events...</h2>
            <p className="text-gray-600 dark:text-gray-400 mt-2">Please wait while we fetch the latest events for you.</p>
          </div>
        </div>
      </section>
    );
  }
  
  const filteredEvents = getFilteredEvents();
  const categories = Object.keys(filteredEvents) as EventCategory[];
  
  const isEmpty = categories.length === 0;
  
  return (
    <section id="events" className="py-16 bg-gray-50 dark:bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-10">
          <div>
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-2">
              Explore Events
            </h2>
            <p className="text-gray-600 dark:text-gray-400 max-w-2xl">
              Discover and filter events based on your preferences. Select your favorite categories below to personalize your experience.
            </p>
          </div>
          
          <div className="mt-4 md:mt-0 flex items-center">
            <div className="inline-flex items-center px-4 py-2 bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700">
              <Filter className="h-4 w-4 text-blue-600 dark:text-blue-400 mr-2" />
              <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Filters Active</span>
            </div>
          </div>
        </div>
        
        <CategoryFilter />
        
        {isEmpty ? (
          <div className="text-center py-16">
            <h3 className="text-xl font-medium text-gray-800 dark:text-white mb-4">
              No events match your current filters
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6">
              Please select some categories to see events.
            </p>
          </div>
        ) : (
          <div className="space-y-12">
            {categories.map((category) => (
              <div key={category} className="bg-white dark:bg-gray-800 rounded-xl p-6 shadow-md border border-gray-200 dark:border-gray-700">
                <div 
                  className="flex items-center justify-between cursor-pointer"
                  onClick={() => toggleCategory(category)}
                >
                  <div className="flex items-center">
                    <h3 className="text-xl font-semibold text-gray-900 dark:text-white mr-3">
                      {category.charAt(0).toUpperCase() + category.slice(1)}
                    </h3>
                    <span className="text-sm px-2 py-0.5 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-200">
                      {filteredEvents[category].length} events
                    </span>
                  </div>
                  {expandedCategories.includes(category) ? (
                    <ArrowUp className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  ) : (
                    <ArrowDown className="h-5 w-5 text-gray-500 dark:text-gray-400" />
                  )}
                </div>
                
                <AnimatePresence>
                  {expandedCategories.includes(category) && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3 }}
                      className="overflow-hidden"
                    >
                      <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {filteredEvents[category].slice(0, 6).map((event: Event) => (
                          <EventCard 
                            key={event.event_id} 
                            event={event}
                            category={category as EventCategory}
                          />
                        ))}
                      </div>
                      
                      {filteredEvents[category].length > 6 && (
                        <div className="mt-6 text-center">
                          <button className="px-4 py-2 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-200 rounded-lg font-medium hover:bg-blue-200 dark:hover:bg-blue-800 transition-colors">
                            View all {filteredEvents[category].length} {category} events
                          </button>
                        </div>
                      )}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>
        )}
      </div>
    </section>
  );
};