import { REVERS_GEOCODING_API } from './api.js';

async function ReverseGeoCoding(latitude, longitude) {
  const response = await fetch(
    `${REVERS_GEOCODING_API}latitude=${latitude}&longitude=${longitude}&localityLanguage=en`,
  );
  const data = await response.json();

  if (data.city && data.city.length > 0) {
    const formattedAddress = data.city;
    return formattedAddress;
  }
  throw new Error('Reverse geocoding failed');
}
export default ReverseGeoCoding;