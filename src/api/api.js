export const fetchUVData = async (lat, lng) => {
    try {
        const response = await fetch(`https://currentuvindex.com/api/v1/uvi?latitude=${lat}&longitude=${lng}`);
        if (!response.ok) {
            throw new Error('Failed to fetch UV data');
        }
        return await response.json();
    } catch (error) {
        console.error('Error fetching UV data:', error);
        throw error;
    }
};

export const searchLocation = async (query) => {
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}`);
        if (!response.ok) {
            throw new Error('Failed to search location');
        }
        const data = await response.json();
        if (data && data.length > 0) {
            return {
                lat: parseFloat(data[0].lat),
                lon: parseFloat(data[0].lon),
                display_name: data[0].display_name
            };
        }
        return null;
    } catch (error) {
        console.error('Error searching location:', error);
        throw error;
    }
};

export const getSuggestions = async (query) => {
    if (!query || query.length < 3) return [];
    try {
        const response = await fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(query)}&limit=5`);
        if (!response.ok) return [];
        const data = await response.json();
        return data.map(item => ({
            display_name: item.display_name,
            lat: parseFloat(item.lat),
            lon: parseFloat(item.lon)
        }));
    } catch (error) {
        console.error("Error fetching suggestions:", error);
        return [];
    }
};
