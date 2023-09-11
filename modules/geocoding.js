// geocoding.js

const API_KEY = 'a950b1a143ab4c6391b3823a840e12ce';

async function geocode(locationName) {
    const response = await fetch(`https://api.opencagedata.com/geocode/v1/json?q=${encodeURIComponent(locationName)}&key=${API_KEY}`);
    const data = await response.json();
    return {
        lat: data.results[0]?.geometry.lat,
        lng: data.results[0]?.geometry.lng,
    };
}

export { geocode };
