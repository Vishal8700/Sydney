# flask_wrapper.py
from flask import Flask, jsonify
from flask_cors import CORS
from sydney_events_api import SydneyEventsAPI
import json

app = Flask(__name__)
CORS(app, resources={r"/*": {"origins": "*"}})

# Initialize API
events_api = SydneyEventsAPI()

@app.route('/api/events/all', methods=['GET'])
def get_all_events():
    """Get all events organized by category"""
    try:
        response = events_api.scrape_all_events(max_pages=2)
        return jsonify(response)
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/events/category/<category_name>', methods=['GET'])
def get_category_events(category_name):
    """Get events for specific category"""
    try:
        all_data = events_api.scrape_all_events(max_pages=1)
        category_data = events_api.get_category_events(category_name, all_data)
        return jsonify(category_data)
    except Exception as e:
        return jsonify({
            'success': False,
            'error': str(e)
        }), 500

@app.route('/api/events/categories', methods=['GET'])
def get_available_categories():
    """Get list of available categories"""
    return jsonify({
        'success': True,
        'categories': [
            'events', 'festivals', 'performance', 'exhibit',
            'food', 'sport', 'community', 'markets', 'business'
        ]
    })

if __name__ == '__main__':
    app.run(debug=True, port=5000 ,host='0.0.0.0')
