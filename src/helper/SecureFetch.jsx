// src/helper/SecureFetch.jsx

export const useAuthHeader = () => {
    const token = localStorage.getItem('authToken');
    return {
      'Content-Type': 'application/json',
      'Authorization': `Bearer ${token}`
    };
};

export const secureFetch = async (url, options = {}) => {
    const headers = useAuthHeader();
    const response = await fetch(url, { ...options, headers });
    const data = await response.json();
    return { response, data };
};

  