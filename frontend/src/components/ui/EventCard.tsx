import { useState } from 'react';
import { motion } from 'framer-motion';
import { MapPin, Calendar, ExternalLink } from 'lucide-react';
import { Event, EventCategory } from '../../types';
import { formatDate, truncateText, cn } from '../../utils/helpers';
import { CategoryBadge } from './CategoryBadge';

interface EventCardProps {
  event: Event;
  category: EventCategory;
}

export const EventCard = ({ event, category }: EventCardProps) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.3 }}
      className={cn(
        "bg-white dark:bg-gray-800 rounded-xl overflow-hidden shadow-md hover:shadow-xl",
        "transition-all duration-300 h-full flex flex-col",
        "border border-gray-200 dark:border-gray-700"
      )}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative overflow-hidden aspect-video">
        <motion.img
          animate={{ scale: isHovered ? 1.05 : 1 }}
          transition={{ duration: 0.4 }}
          src={event.image_url}
          alt={event.image_alt || event.title}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-2 right-2">
          <CategoryBadge category={category} />
        </div>
      </div>
      
      <div className="p-4 flex-grow flex flex-col">
        <h3 className="font-bold text-lg text-gray-900 dark:text-white mb-2">{event.title}</h3>
        
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-4">{truncateText(event.description, 120)}</p>
        
        <div className="mt-auto space-y-2">
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <Calendar className="h-4 w-4 mr-1" />
            <span>{formatDate(event.date_time)}</span>
          </div>
          
          <div className="flex items-center text-sm text-gray-500 dark:text-gray-400">
            <MapPin className="h-4 w-4 mr-1" />
            <span>{event.location}</span>
          </div>
          
          {event.price && (
            <p className="text-sm font-medium text-gray-700 dark:text-gray-300">
              {event.price}
            </p>
          )}
        </div>
      </div>
      
      <div className="p-4 pt-0">
        <motion.a
          whileHover={{ scale: 1.03 }}
          whileTap={{ scale: 0.97 }}
          href={event.ticket_link}
          target="_blank"
          rel="noopener noreferrer"
          className="w-full flex items-center justify-center px-4 py-2 rounded-lg bg-gradient-to-r from-blue-500 to-purple-600 text-white font-medium text-sm transition-all"
        >
          Get Tickets <ExternalLink className="ml-1 h-3 w-3" />
        </motion.a>
      </div>
    </motion.div>
  );
};