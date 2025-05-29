import { createContext, useState, useContext, ReactNode, useEffect } from 'react';
import { ApiResponse, Event, EventCategory, UserPreferences } from '../types';
import { fetchEvents } from '../services/api';
import toast from 'react-hot-toast';

interface EventsContextType {
  events: ApiResponse | null;
  isLoading: boolean;
  error: Error | null;
  userPreferences: UserPreferences;
  togglePreferredCategory: (category: EventCategory) => void;
  getFilteredEvents: () => Record<string, Event[]>;
}

const EventsContext = createContext<EventsContextType | undefined>(undefined);

const EVENTS_CACHE_KEY = 'eventsDataCache';
const CACHE_DURATION_MS = 12 * 60 * 60 * 1000; // 12 hours

const getStoredPreferences = (): UserPreferences => {
  const stored = localStorage.getItem('userPreferences');
  if (stored) {
    return JSON.parse(stored);
  }
  return {
    preferredCategories: [],
  };
};

export const EventsProvider = ({ children }: { children: ReactNode }) => {
  const [events, setEvents] = useState<ApiResponse | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);
  const [userPreferences, setUserPreferences] = useState<UserPreferences>(getStoredPreferences);

  useEffect(() => {
    const loadEvents = async () => {
      try {
        setIsLoading(true);

        const cachedData = localStorage.getItem(EVENTS_CACHE_KEY);
        if (cachedData) {
          const { data, timestamp } = JSON.parse(cachedData);
          if (Date.now() - timestamp < CACHE_DURATION_MS) {
            setEvents(data);
            toast.success('Loaded events from cache.');
            return; // Exit early if using cached data
          } else {
            localStorage.removeItem(EVENTS_CACHE_KEY); // Cache expired
          }
        }

        const data = await fetchEvents();
        setEvents(data);
        localStorage.setItem(EVENTS_CACHE_KEY, JSON.stringify({ data, timestamp: Date.now() }));
        toast.success('Fetched and cached new events.');

      } catch (err) {
        setError(err instanceof Error ? err : new Error('Failed to fetch events'));
        toast.error('Failed to load events. Please try again later.');
      } finally {
        setIsLoading(false);
      }
    };

    loadEvents();
  }, []);

  useEffect(() => {
    localStorage.setItem('userPreferences', JSON.stringify(userPreferences));
  }, [userPreferences]);

  const togglePreferredCategory = (category: EventCategory) => {
    setUserPreferences(prev => {
      const exists = prev.preferredCategories.includes(category);
      
      const updated = exists 
        ? { ...prev, preferredCategories: prev.preferredCategories.filter(c => c !== category) }
        : { ...prev, preferredCategories: [...prev.preferredCategories, category] };
      
      return updated;
    });
  };

  const getFilteredEvents = () => {
    if (!events) return {};
    
    // If no preferred categories, return all categories
    if (userPreferences.preferredCategories.length === 0) {
      return events.category_groups;
    }
    
    // Filter to only include preferred categories
    return Object.fromEntries(
      Object.entries(events.category_groups).filter(([category]) => 
        userPreferences.preferredCategories.includes(category as EventCategory)
      )
    );
  };

  return (
    <EventsContext.Provider value={{ 
      events, 
      isLoading, 
      error, 
      userPreferences, 
      togglePreferredCategory,
      getFilteredEvents
    }}>
      {children}
    </EventsContext.Provider>
  );
};

export const useEvents = (): EventsContextType => {
  const context = useContext(EventsContext);
  if (context === undefined) {
    throw new Error('useEvents must be used within an EventsProvider');
  }
  return context;
};