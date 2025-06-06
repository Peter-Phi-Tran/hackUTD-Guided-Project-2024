import React, { useState, useEffect } from 'react';
import { getFirestore, doc, getDoc, updateDoc } from 'firebase/firestore';
import axios from 'axios';

function WeatherComponent() {
    const db = getFirestore();
    const [weather, setWeather] = useState(null);
    const [date, setDate] = useState('');

    const fetchDate = async () => {
        const dateDoc = await getDoc(doc(db, 'settings', 'picnicDate'));
        if (dateDoc.exists()) {
            const savedDate = dateDoc.data().date;
            setDate(savedDate);
            fetchWeather(savedDate);
        } else {
            console.log("No date found in Firestore.");
        }
    };

    useEffect(() => {
        fetchDate();
    }, []);

    const fetchWeather = async (selectedDate) => {
        console.log("Fetching weather for:", selectedDate);
        try {
            const response = await axios.get('https://api.weatherapi.com/v1/forecast.json', {
                params: {
                    key: '7e31febc7d1048a1b97202944250606', // Replace with valid API key
                    q: 'Euless',
                    dt: selectedDate,
                },
            });
            console.log("Weather response:", response.data);
            setWeather(response.data.forecast.forecastday[0].day);
        } catch (error) {
            console.error("Error fetching weather:", error);
        }
    };

    const handleDateChange = (e) => {
        setDate(e.target.value);
    };

    const handleDateUpdate = async () => {
        try {
            await updateDoc(doc(db, 'settings', 'picnicDate'), { date });
            console.log("Date updated successfully in Firestore.");
            fetchWeather(date);
        } catch (error) {
            console.error("Error updating date:", error);
        }
    };

    return (
        <div className="p-4">
            <h2 className="mb-2 text-lg font-semibold">Weather Forecast</h2>
            <label className="block mb-2">
                We are planning on:
                <input 
                    type="date" 
                    value={date} 
                    onChange={handleDateChange} 
                    className="p-2 w-full mt-1 mb-3 border border-gray-300 rounded focus:border-blue-500 focus:outline-none"
                />
            </label>
            <button 
                onClick={handleDateUpdate} 
                className="py-2 px-4 mb-4 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
            >
                Update Date
            </button>
            {weather && (
                <div className="mt-4 p-3 bg-gray-50 rounded">
                    <p className="font-medium">Temperature: {weather.avgtemp_f}°F</p>
                    <p className="text-gray-600">Condition: {weather.condition.text}</p>
                </div>
            )}
        </div>
    );
}

export default WeatherComponent;