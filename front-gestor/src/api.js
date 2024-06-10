import axios from 'axios';

const API_URL = 'http://localhost:8000/api';

// Task API functions
export const fetchTasks = async (user) => {
    const response = await axios.get(`${API_URL}/tasks/`, {
        params: { user }
    });
    return response.data;
};

export const createTask = async (taskData) => {
    const response = await axios.post(`${API_URL}/tasks/`, taskData, {
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const updateTask = async (title, taskData, user) => {
    const response = await axios.put(`${API_URL}/tasks/${title}/`, taskData, {
        params: { user },
        headers: {
            'Content-Type': 'multipart/form-data',
        },
    });
    return response.data;
};

export const deleteTask = async (title, user) => {
    const response = await axios.delete(`${API_URL}/tasks/${title}/`, {
        params: { user }
    });
    return response.data;
};

// Checklist API functions
export const fetchChecklistItems = async (user) => {
    const response = await axios.get(`${API_URL}/checklist/`, {
        params: { user }
    });
    return response.data;
};

export const createChecklistItem = async (checklistData) => {
    const response = await axios.post(`${API_URL}/checklist/`, checklistData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const updateChecklistItem = async (id, checklistData) => {
    const response = await axios.put(`${API_URL}/checklist/${id}/`, checklistData, {
        headers: {
            'Content-Type': 'application/json',
        },
    });
    return response.data;
};

export const deleteChecklistItem = async (id) => {
    try {
        const response = await axios.delete(`${API_URL}/checklist/${id}/`);
        return response.data;
    } catch (error) {
        console.error(`Error deleting checklist item with id ${id}:`, error);
        throw error;
    }
};