import axios from 'axios';

const API_URL = 'http://localhost:7070';

// Signup function for everyone
export const signup = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/signup`, userData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Signup Error:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Signup failed. Please try again.' };
    }
};

// Login function once sign up is done
export const login = async (userData) => {
    try {
        const response = await axios.post(`${API_URL}/login`, userData, {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json',
            },
        });
        return response.data;
    } catch (error) {
        console.error('Login Error:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Login failed. Please check your credentials.' };
    }
};

// Fetch events function
export const fetchEvents = async () => {
    try {
        const response = await axios.get(`${API_URL}/events`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('error:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Failed to fetch' };
    }
};

// Create event function (for admin only), jaldi jaake admin ban
export const createEvent = async (eventData) => {
    try {
        const response = await axios.post(`${API_URL}/events`, eventData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Create Event Error:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Failed to create event. Please try again.' };
    }
};

// Update event function (for admin only), abey jao admin bano
export const updateEvent = async (eventId, eventData) => {
    try {
        const response = await axios.put(`${API_URL}/events/${eventId}`, eventData, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Update Event Error:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Failed to update event. Please try again.' };
    }
};

// Delete event function (for admin only), smjh nhi aaya? bhai admin bano
export const deleteEvent = async (eventId) => {
    try {
        const response = await axios.delete(`${API_URL}/events/${eventId}`, { withCredentials: true });
        return response.data;
    } catch (error) {
        console.error('Delete Event Error:', error.response?.data || error.message);
        throw error.response?.data || { message: 'Failed to delete event. Please try again.' };
    }
};
