import React, { useState, useEffect } from 'react';
import { AlertCircle } from 'lucide-react';
import Logo from './components/Logo';
import SearchBar from './components/SearchBar';
import CurrentUVCard from './components/CurrentUVCard';
import HourlyForecast from './components/HourlyForecast';
import { fetchUVData, searchLocation } from './api/api';

function App() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [uvData, setUvData] = useState(null);
  const [locationName, setLocationName] = useState('');

  useEffect(() => {
    document.title = "UV40 - Real-time UV Index";
  }, []);

  const loadUVData = async (lat, lng, name) => {
    setLoading(true);
    setError(null);
    try {
      const data = await fetchUVData(lat, lng);
      setUvData(data);
      if (name) setLocationName(name);
    } catch (err) {
      setError('Failed to fetch UV data. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = async (query) => {
    setLoading(true);
    setError(null);
    try {
      const location = await searchLocation(query);
      if (location) {
        setLocationName(location.display_name.split(',')[0]);
        await loadUVData(location.lat, location.lon);
      } else {
        setError('Location not found.');
        setLoading(false);
      }
    } catch (err) {
      setError('Failed to search location.');
      setLoading(false);
    }
  };

  const handleUseLocation = () => {
    if (!navigator.geolocation) {
      setError('Geolocation is not supported by your browser');
      return;
    }

    setLoading(true);
    navigator.geolocation.getCurrentPosition(
      async (position) => {
        try {
          await loadUVData(position.coords.latitude, position.coords.longitude, 'My Location');
        } catch (e) {
          setError('Failed to get weather data for your location');
        }
      },
      () => {
        setError('Unable to retrieve your location');
        setLoading(false);
      }
    );
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col font-sans text-gray-900 selection:bg-black/10">
      {/* Header */}
      <header className="pt-10 pb-8 flex flex-col items-center justify-center">
        <Logo />
      </header>

      <main className="flex-1 w-full max-w-lg mx-auto pb-10">
        <SearchBar onSearch={handleSearch} onUseLocation={handleUseLocation} loading={loading} />

        {error && (
          <div className="mx-4 mb-6 p-4 bg-red-50 text-red-600 rounded-2xl flex items-center gap-3 text-sm font-medium border border-red-100 animate-in fade-in slide-in-from-top-2">
            <AlertCircle className="w-5 h-5 flex-shrink-0" />
            {error}
          </div>
        )}

        {loading && !uvData && (
          <div className="flex justify-center py-20">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-gray-900"></div>
          </div>
        )}

        {uvData && !loading && (
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
            {locationName && <div className="text-center mb-6 text-xl font-medium text-gray-500">{locationName}</div>}
            <CurrentUVCard now={uvData.now} />
            <HourlyForecast forecast={uvData.forecast} />
          </div>
        )}
      </main>
    </div>
  );
}

export default App;
