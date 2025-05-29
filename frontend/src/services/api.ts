import axios from 'axios';
import { ApiResponse } from '../types';

const API_BASE_URL = 'http://localhost:5000';

export const fetchEvents = async (): Promise<ApiResponse> => {
  try {
    const response = await axios.get<ApiResponse>(`${API_BASE_URL}/api/events/all`);
    return response.data;
  } catch (error) {
    console.error('Error fetching events:', error);
    throw error;
  }
};