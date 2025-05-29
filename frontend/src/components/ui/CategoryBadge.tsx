import { motion } from 'framer-motion';
import { getCategoryColor } from '../../utils/helpers';
import { EventCategory } from '../../types';

interface CategoryBadgeProps {
  category: EventCategory;
  count?: number;
  isSelected?: boolean;
  onClick?: () => void;
}

export const CategoryBadge = ({ 
  category, 
  count,
  isSelected = false,
  onClick
}: CategoryBadgeProps) => {
  const colorClasses = getCategoryColor(category);
  const displayName = category.charAt(0).toUpperCase() + category.slice(1);
  
  return (
    <motion.div
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
      onClick={onClick}
      className={`
        inline-flex items-center px-3 py-1 rounded-full border
        ${colorClasses}
        ${isSelected ? 'ring-2 ring-offset-2 ring-blue-500' : ''}
        ${onClick ? 'cursor-pointer' : ''}
        transition-all duration-200
      `}
    >
      <span className="text-sm font-medium">{displayName}</span>
      {count !== undefined && (
        <span className="ml-2 px-2 py-0.5 text-xs rounded-full bg-white bg-opacity-30">
          {count}
        </span>
      )}
    </motion.div>
  );
};