const express = require('express');
const axios = require('axios');
const router = express.Router();

router.get('/searchByCity', async (req, res) => {
  const { city, checkIn, checkOut, pageNumber = 1, currencyCode = 'INR' } = req.query;

  if (!city || !checkIn || !checkOut) {
    return res.status(400).json({ error: 'Missing required parameters: city, checkIn, checkOut' });
  }

  try {
    // Step 1: Get location info
    const locationRes = await axios.get('https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchLocation', {
      params: { query: city },
      headers: {
        'x-rapidapi-key': process.env.RAPIDAPI_KEY,
        'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com'
      }
    });

    const location = locationRes.data?.data?.[0];
    if (!location) {
      return res.status(404).json({ error: `City '${city}' not found.` });
    }

    const latitude = location.latitude || location.details?.latitude;
    const longitude = location.longitude || location.details?.longitude;

    let hotelRes;

    if (latitude && longitude) {
      // ✅ Prefer coordinates
      hotelRes = await axios.get('https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotelsByLocation', {
        params: {
          latitude,
          longitude,
          checkIn,
          checkOut,
          pageNumber,
          currencyCode
        },
        headers: {
          'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com'
        }
      });
    } else if (location.geoId) {
      // ✅ Fallback to geoId
      hotelRes = await axios.get('https://tripadvisor16.p.rapidapi.com/api/v1/hotels/searchHotels', {
        params: {
          geoId: location.geoId,
          checkIn,
          checkOut,
          pageNumber,
          currencyCode
        },
        headers: {
          'x-rapidapi-key': process.env.RAPIDAPI_KEY,
          'x-rapidapi-host': 'tripadvisor16.p.rapidapi.com'
        }
      });
    } else {
      return res.status(404).json({ error: `Neither coordinates nor geoId found for '${city}'`, raw: location });
    }

    res.json({
      city: location.title?.replace(/<\/?b>/g, '') || city,
      coordinates: latitude && longitude ? { latitude, longitude } : null,
      hotels: hotelRes.data
    });

  } catch (err) {
    console.error('Search error:', err.response?.data || err.message);
    res.status(500).json({ error: err.response?.data || err.message });
  }
});

module.exports = router;
