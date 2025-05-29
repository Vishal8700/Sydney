# sydney_events_api.py (Standalone Python API)
import requests
from bs4 import BeautifulSoup
import json
import re
from datetime import datetime
from urllib.parse import urljoin, urlparse
import time
from selenium import webdriver
from selenium.webdriver.chrome.options import Options
import hashlib
import sys


class SydneyEventsAPI:
	def __init__(self):
		self.session = requests.Session()
		self.session.headers.update({
			'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36',
		})

		# All URLs for both sources
		self.sources = {
			'sydney_com': {
				'base_url': 'https://www.sydney.com',
				'urls': {
					"events": "https://www.sydney.com/destinations/sydney/sydney-city/city-centre/events",
					"festivals": "https://www.sydney.com/destinations/sydney/sydney-city/city-centre/events?19346-classification[]=FESTIVAL",
					"performance": "https://www.sydney.com/destinations/sydney/sydney-city/city-centre/events?19346-classification[]=PERFORMANC",
					"exhibit": "https://www.sydney.com/destinations/sydney/sydney-city/city-centre/events?19346-classification[]=EXHIBIT",
					"food": "https://www.sydney.com/destinations/sydney/sydney-city/city-centre/events?19346-classification[]=EVTFOOD",
					"sport": "https://www.sydney.com/destinations/sydney/sydney-city/city-centre/events?19346-classification[]=SPORT",
					"community": "https://www.sydney.com/destinations/sydney/sydney-city/city-centre/events?19346-classification[]=EVTCOMNTY"
				}
			},
			'visit_nsw': {
				'base_url': 'https://www.visitnsw.com',
				'urls': {
					"events": "https://www.visitnsw.com/events",
					"general": "https://www.visitnsw.com/events?17896-classification[]=EVTCLASS",
					"community": "https://www.visitnsw.com/events?17896-classification[]=EVTCOMNTY",
					"performance": "https://www.visitnsw.com/events?17896-classification[]=PERFORMANC",
					"exhibit": "https://www.visitnsw.com/events?17896-classification[]=EXHIBIT",
					"festivals": "https://www.visitnsw.com/events?17896-classification[]=FESTIVAL",
					"food": "https://www.visitnsw.com/events?17896-classification[]=EVTFOOD",
					"markets": "https://www.visitnsw.com/events?17896-classification[]=EVTMARKET",
					"sport": "https://www.visitnsw.com/events?17896-classification[]=SPORT",
					"business": "https://www.visitnsw.com/events?17896-classification[]=EVTBUS"
				}
			}
		}

	def setup_selenium_driver(self):
		"""Setup headless Chrome driver"""
		chrome_options = Options()
		chrome_options.add_argument('--headless')
		chrome_options.add_argument('--no-sandbox')
		chrome_options.add_argument('--disable-dev-shm-usage')
		chrome_options.add_argument('--window-size=1920,1080')
		chrome_options.add_argument('--disable-logging')
		chrome_options.add_argument('--log-level=3')
		return webdriver.Chrome(options=chrome_options)

	def scrape_all_events(self, max_pages=2):
		"""Main API method - scrape all events and return organized data"""
		print("🚀 Starting Sydney Events API...")
		print("📊 Scraping all categories from Sydney.com and Visit NSW...")

		# Initialize category groups
		category_groups = {
			'events': [],
			'festivals': [],
			'performance': [],
			'exhibit': [],
			'food': [],
			'sport': [],
			'community': [],
			'markets': [],
			'business': [],
			'general': []
		}

		# Scrape Sydney.com
		print("\n🏢 Scraping Sydney.com...")
		sydney_events = self.scrape_sydney_com_all_categories(max_pages)

		# Scrape Visit NSW
		print("\n🗺️  Scraping Visit NSW...")
		visit_nsw_events = self.scrape_visit_nsw_all_categories(max_pages)

		# Combine all events
		all_events = sydney_events + visit_nsw_events
		print(f"\n📈 Total raw events collected: {len(all_events)}")

		# Group events by category using intelligent categorization
		for event in all_events:
			category = self.categorize_event(event)
			if category in category_groups:
				category_groups[category].append(event)
			else:
				category_groups['events'].append(event)  # Default category

		# Remove duplicates within each category
		for category in category_groups:
			category_groups[category] = self.remove_duplicates(category_groups[category])

		# Calculate statistics
		total_events = sum(len(events) for events in category_groups.values())
		sydney_com_total = sum(
			len([e for e in events if e.get('source') == 'Sydney.com']) for events in category_groups.values())
		visit_nsw_total = sum(
			len([e for e in events if e.get('source') == 'Visit NSW']) for events in category_groups.values())

		# Create final response
		response = {
			'success': True,
			'api_info': {
				'name': 'Sydney Events API',
				'version': '1.0.0',
				'scraped_at': datetime.now().isoformat(),
				'sources': ['Sydney.com', 'Visit NSW']
			},
			'statistics': {
				'total_events': total_events,
				'sydney_com_count': sydney_com_total,
				'visit_nsw_count': visit_nsw_total,
				'categories_with_events': len([cat for cat, events in category_groups.items() if events])
			},
			'category_counts': {category: len(events) for category, events in category_groups.items() if events},
			'category_groups': category_groups
		}

		print(f"\n✅ API Response Ready!")
		print(f"📊 Total events: {total_events}")
		print(f"🏢 Sydney.com: {sydney_com_total}")
		print(f"🗺️  Visit NSW: {visit_nsw_total}")
		print(f"📂 Categories with events: {len([cat for cat, events in category_groups.items() if events])}")

		return response

	def scrape_sydney_com_all_categories(self, max_pages=2):
		"""Scrape all categories from Sydney.com at once"""
		all_events = []

		try:
			driver = self.setup_selenium_driver()

			# Scrape each category URL
			for category, url in self.sources['sydney_com']['urls'].items():
				print(f"  📄 Scraping {category}: {url}")

				try:
					driver.get(url)
					time.sleep(4)

					# Scroll to load content
					driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
					time.sleep(2)

					soup = BeautifulSoup(driver.page_source, 'html.parser')
					events = self.extract_sydney_com_events(soup, category)

					all_events.extend(events)
					print(f"    ✅ Found {len(events)} events")

					time.sleep(2)  # Be respectful

				except Exception as e:
					print(f"    ❌ Error: {e}")
					continue

			driver.quit()

		except Exception as e:
			print(f"❌ Sydney.com scraping error: {e}")

		print(f"🏢 Sydney.com total: {len(all_events)} events")
		return all_events

	def scrape_visit_nsw_all_categories(self, max_pages=2):
		"""Scrape all categories from Visit NSW at once"""
		all_events = []

		try:
			driver = self.setup_selenium_driver()

			# Scrape each category URL
			for category, url in self.sources['visit_nsw']['urls'].items():
				print(f"  📄 Scraping {category}: {url}")

				try:
					driver.get(url)
					time.sleep(5)

					# Scroll to load content
					driver.execute_script("window.scrollTo(0, document.body.scrollHeight);")
					time.sleep(3)

					soup = BeautifulSoup(driver.page_source, 'html.parser')
					events = self.extract_visit_nsw_events(soup, category)

					all_events.extend(events)
					print(f"    ✅ Found {len(events)} events")

					time.sleep(3)  # Be respectful

				except Exception as e:
					print(f"    ❌ Error: {e}")
					continue

			driver.quit()

		except Exception as e:
			print(f"❌ Visit NSW scraping error: {e}")

		print(f"🗺️  Visit NSW total: {len(all_events)} events")
		return all_events

	def extract_sydney_com_events(self, soup, source_category):
		"""Extract events from Sydney.com with category context"""
		events = []

		product_wrapper = soup.find('div', class_='product-list__results-wrapper')
		if not product_wrapper:
			return events

		event_items = product_wrapper.select('div[itemprop="Event"], div[data-type="Event"]')

		for item in event_items:
			try:
				event_data = self.extract_sydney_com_event_data(item, source_category)
				if event_data:
					events.append(event_data)
			except Exception as e:
				continue

		return events

	def extract_sydney_com_event_data(self, item, source_category):
		"""Extract event data from Sydney.com item with category"""
		event_data = {}

		# Title
		title_elem = item.select_one('h3.title__product-list-title-heading, h3')
		if title_elem:
			event_data['title'] = title_elem.get_text(strip=True)

		# Link
		link_elem = item.find('a', href=True)
		if link_elem:
			event_data['ticket_link'] = urljoin(self.sources['sydney_com']['base_url'],
												link_elem.get('href'))

		# Location
		location_elem = item.select_one('span.title__area-name')
		if location_elem:
			event_data['location'] = location_elem.get_text(strip=True)
		else:
			event_data['location'] = "Sydney"

		# Description
		desc_elem = item.select_one('div[itemprop="description"]')
		if desc_elem:
			event_data['description'] = desc_elem.get_text(strip=True)

		# Image
		img_elem = item.find('img')
		if img_elem:
			src = img_elem.get('src') or img_elem.get('data-src')
			if src:
				event_data['image_url'] = urljoin(self.sources['sydney_com']['base_url'], src)
				event_data['image_alt'] = img_elem.get('alt', '')

		# Extract date and price
		text_content = item.get_text()
		event_data['date_time'] = self.extract_date_from_text(text_content)
		event_data['price'] = self.extract_price_from_text(text_content)

		# Metadata
		event_data['source'] = 'Sydney.com'
		event_data['source_category'] = source_category
		event_data['event_id'] = self.generate_event_id(event_data)
		event_data['scraped_at'] = datetime.now().isoformat()

		return event_data if event_data.get('title') else None

	def extract_visit_nsw_events(self, soup, source_category):
		"""Extract events from Visit NSW with category context"""
		events = []

		# Look for event containers
		selectors = [
			'div[class*="event"]',
			'div[class*="listing"]',
			'div[class*="card"]',
			'article',
			'.event-item',
			'.listing-item',
			'.product-item'
		]

		for selector in selectors:
			containers = soup.select(selector)
			if containers:
				for container in containers[:15]:  # Limit per category
					try:
						event_data = self.extract_visit_nsw_event_data(container, source_category)
						if event_data and event_data.get('title') and len(event_data['title']) > 5:
							events.append(event_data)
					except Exception as e:
						continue

				if events:
					break

		return events

	def extract_visit_nsw_event_data(self, container, source_category):
		"""Extract event data from Visit NSW container with category"""
		event_data = {}

		# Title
		title_selectors = ['h1', 'h2', 'h3', 'h4', '.title', '[class*="title"]']
		for selector in title_selectors:
			title_elem = container.select_one(selector)
			if title_elem:
				title_text = title_elem.get_text(strip=True)
				if len(title_text) > 3:
					event_data['title'] = title_text
					break

		# Link
		link_elem = container.find('a', href=True)
		if link_elem:
			href = link_elem.get('href')
			if href:
				event_data['ticket_link'] = urljoin(self.sources['visit_nsw']['base_url'], href)

		# Image
		img_elem = container.find('img')
		if img_elem:
			src = img_elem.get('src') or img_elem.get('data-src')
			if src:
				if src.startswith('http'):
					event_data['image_url'] = src
				else:
					event_data['image_url'] = urljoin(self.sources['visit_nsw']['base_url'], src)
				event_data['image_alt'] = img_elem.get('alt', '')

		# Location
		location_selectors = ['.location', '[class*="location"]', '[class*="venue"]']
		for selector in location_selectors:
			location_elem = container.select_one(selector)
			if location_elem:
				location_text = location_elem.get_text(strip=True)
				if len(location_text) > 2:
					event_data['location'] = location_text
					break

		if not event_data.get('location'):
			event_data['location'] = "NSW, Australia"

		# Description
		desc_selectors = ['.description', '[class*="description"]', 'p']
		for selector in desc_selectors:
			desc_elem = container.select_one(selector)
			if desc_elem:
				desc_text = desc_elem.get_text(strip=True)
				if len(desc_text) > 20:
					event_data['description'] = desc_text[:300] + "..." if len(desc_text) > 300 else desc_text
					break

		# Extract date and price
		text_content = container.get_text()
		event_data['date_time'] = self.extract_date_from_text(text_content)
		event_data['price'] = self.extract_price_from_text(text_content)

		# Metadata
		event_data['source'] = 'Visit NSW'
		event_data['source_category'] = source_category
		event_data['event_id'] = self.generate_event_id(event_data)
		event_data['scraped_at'] = datetime.now().isoformat()

		return event_data

	def categorize_event(self, event):
		"""Intelligently categorize events based on title, description, and source category"""
		title = (event.get('title', '') + ' ' + event.get('description', '')).lower()
		source_category = event.get('source_category', '').lower()

		# Use source category as primary hint
		if source_category in ['festivals', 'festival']:
			return 'festivals'
		elif source_category in ['performance', 'performanc']:
			return 'performance'
		elif source_category in ['exhibit', 'exhibition']:
			return 'exhibit'
		elif source_category in ['food', 'evtfood']:
			return 'food'
		elif source_category in ['sport', 'sports']:
			return 'sport'
		elif source_category in ['community', 'evtcomnty']:
			return 'community'
		elif source_category in ['markets', 'evtmarket']:
			return 'markets'
		elif source_category in ['business', 'evtbus']:
			return 'business'

		# Fallback to keyword-based categorization
		if any(word in title for word in ['festival', 'fest', 'carnival']):
			return 'festivals'
		elif any(word in title for word in
				 ['concert', 'music', 'band', 'singer', 'performance', 'show', 'theatre', 'theater']):
			return 'performance'
		elif any(word in title for word in ['exhibition', 'exhibit', 'gallery', 'museum', 'art']):
			return 'exhibit'
		elif any(word in title for word in ['food', 'wine', 'dining', 'restaurant', 'cuisine', 'cooking']):
			return 'food'
		elif any(word in title for word in ['sport', 'game', 'match', 'race', 'competition']):
			return 'sport'
		elif any(word in title for word in ['market', 'farmers', 'craft', 'vendor']):
			return 'markets'
		elif any(word in title for word in ['business', 'conference', 'workshop', 'seminar', 'networking']):
			return 'business'
		elif any(word in title for word in ['community', 'local', 'neighborhood', 'volunteer']):
			return 'community'

		return 'events'  # Default category

	def extract_date_from_text(self, text):
		"""Extract date from text"""
		patterns = [
			r'\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec)(?:\s*-\s*\d{1,2}\s+(?:Jan|Feb|Mar|Apr|May|Jun|Jul|Aug|Sep|Oct|Nov|Dec))?',
			r'\d{1,2}/\d{1,2}/\d{4}',
			r'\d{4}-\d{2}-\d{2}'
		]

		for pattern in patterns:
			match = re.search(pattern, text, re.IGNORECASE)
			if match:
				return match.group()

		return "Check event page for dates"

	def extract_price_from_text(self, text):
		"""Extract price from text"""
		patterns = [
			r'from\s*\$\d+',
			r'\$\d+(?:\.\d{2})?',
			r'free',
			r'Free'
		]

		for pattern in patterns:
			match = re.search(pattern, text, re.IGNORECASE)
			if match:
				return match.group()

		return "See event page for pricing"

	def generate_event_id(self, event_data):
		"""Generate unique ID for event"""
		unique_string = f"{event_data.get('title', '')}{event_data.get('location', '')}{event_data.get('ticket_link', '')}"
		return hashlib.md5(unique_string.encode()).hexdigest()[:12]

	def remove_duplicates(self, events):
		"""Remove duplicate events"""
		seen_ids = set()
		unique_events = []

		for event in events:
			event_id = event.get('event_id')
			if event_id and event_id not in seen_ids:
				seen_ids.add(event_id)
				unique_events.append(event)

		return unique_events

	def save_to_file(self, data, filename=None):
		"""Save API response to JSON file"""
		if not filename:
			filename = f"sydney_events_{datetime.now().strftime('%Y%m%d_%H%M%S')}.json"

		with open(filename, 'w', encoding='utf-8') as f:
			json.dump(data, f, indent=2, ensure_ascii=False)

		print(f"💾 Data saved to: {filename}")
		return filename

	def get_category_events(self, category, data):
		"""Get events for a specific category"""
		if 'category_groups' in data and category in data['category_groups']:
			return {
				'success': True,
				'category': category,
				'total_events': len(data['category_groups'][category]),
				'events': data['category_groups'][category]
			}
		else:
			return {
				'success': False,
				'error': f'Category {category} not found',
				'events': []
			}


# Usage Functions
def main():
	"""Main function to run the API"""
	api = SydneyEventsAPI()

	# Get all events organized by category
	response = api.scrape_all_events(max_pages=2)

	# Save to file
	filename = api.save_to_file(response)

	# Print summary
	print(f"\n📋 Summary:")
	print(f"   Total Events: {response['statistics']['total_events']}")
	print(f"   Sydney.com: {response['statistics']['sydney_com_count']}")
	print(f"   Visit NSW: {response['statistics']['visit_nsw_count']}")
	print(f"   Categories: {response['statistics']['categories_with_events']}")
	print(f"   File: {filename}")

	return response


def get_events_by_category(category_name):
	"""Get events for a specific category"""
	api = SydneyEventsAPI()
	all_data = api.scrape_all_events(max_pages=1)
	return api.get_category_events(category_name, all_data)


def get_all_events_json():
	"""Get all events as JSON string"""
	api = SydneyEventsAPI()
	response = api.scrape_all_events(max_pages=2)
	return json.dumps(response, indent=2, ensure_ascii=False)


if __name__ == "__main__":
	# Run the main API
	if len(sys.argv) > 1:
		if sys.argv[1] == "category" and len(sys.argv) > 2:
			# Get specific category
			category = sys.argv[2]
			result = get_events_by_category(category)
			print(json.dumps(result, indent=2, ensure_ascii=False))
		elif sys.argv[1] == "json":
			# Get all as JSON
			print(get_all_events_json())
	else:
		# Default: run main function
		main()
