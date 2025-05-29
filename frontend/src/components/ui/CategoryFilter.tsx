import { motion } from 'framer-motion';
import { useEvents } from '../../contexts/EventsContext';
import { CategoryBadge } from './CategoryBadge';
import { EventCategory } from '../../types';

export const CategoryFilter = () => {
  const { events, userPreferences, togglePreferredCategory } = useEvents();
  
  if (!events) return null;
  
  const categories = Object.keys(events.category_counts) as EventCategory[];
  
  return (
    <div className="mb-8">
      <div className="mb-4">
        <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
          Filter by Category
        </h3>
        <p className="text-sm text-gray-600 dark:text-gray-400">
          Select your favorite categories to customize your explore page.
        </p>
      </div>
      
      <motion.div 
        className="flex flex-wrap gap-2"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ staggerChildren: 0.1, delayChildren: 0.2 }}
      >
        {categories.map((category) => (
          <motion.div
            key={category}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
          >
            <CategoryBadge
              category={category}
              count={events.category_counts[category]}
              isSelected={userPreferences.preferredCategories.includes(category)}
              onClick={() => togglePreferredCategory(category)}
            />
          </motion.div>
        ))}
      </motion.div>
    </div>
  );
};