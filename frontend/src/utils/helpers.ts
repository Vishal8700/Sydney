import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatDate(dateStr: string): string {
  // Handle various date formats
  if (dateStr.includes('-')) {
    // Range format: "1 Feb-2 Feb"
    return dateStr;
  }
  
  try {
    const date = new Date(dateStr);
    return new Intl.DateTimeFormat('en-AU', {
      day: 'numeric',
      month: 'short',
      year: 'numeric',
    }).format(date);
  } catch (e) {
    return dateStr; // Return original if parsing fails
  }
}

export function truncateText(text: string, maxLength: number): string {
  if (typeof text !== 'string' || text.length <= maxLength) return text || '';
  return text.substring(0, maxLength) + '...';
}

export function getCategoryColor(category: string): string {
  const colors: Record<string, { bg: string, text: string, border: string }> = {
    business: { bg: 'bg-blue-100', text: 'text-blue-800', border: 'border-blue-200' },
    community: { bg: 'bg-green-100', text: 'text-green-800', border: 'border-green-200' },
    events: { bg: 'bg-purple-100', text: 'text-purple-800', border: 'border-purple-200' },
    exhibit: { bg: 'bg-amber-100', text: 'text-amber-800', border: 'border-amber-200' },
    festivals: { bg: 'bg-pink-100', text: 'text-pink-800', border: 'border-pink-200' },
    food: { bg: 'bg-orange-100', text: 'text-orange-800', border: 'border-orange-200' },
    performance: { bg: 'bg-red-100', text: 'text-red-800', border: 'border-red-200' },
    sport: { bg: 'bg-emerald-100', text: 'text-emerald-800', border: 'border-emerald-200' },
  };
  
  return colors[category] ? 
    `${colors[category].bg} ${colors[category].text} ${colors[category].border}` : 
    'bg-gray-100 text-gray-800 border-gray-200';
}