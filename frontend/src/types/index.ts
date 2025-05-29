export interface Event {
  date_time: string;
  description: string;
  event_id: string;
  image_alt: string;
  image_url: string;
  location: string;
  price: string;
  scraped_at: string;
  source: string;
  source_category: string;
  ticket_link: string;
  title: string;
}

export interface ApiResponse {
  api_info: {
    name: string;
    scraped_at: string;
    sources: string[];
    version: string;
  };
  category_counts: Record<string, number>;
  category_groups: Record<string, Event[]>;
}

export type EventCategory = 
  | 'business' 
  | 'community' 
  | 'events' 
  | 'exhibit' 
  | 'festivals' 
  | 'food' 
  | 'performance' 
  | 'sport';

export type ThemeMode = 'light' | 'dark';

export interface UserPreferences {
  preferredCategories: EventCategory[];
}