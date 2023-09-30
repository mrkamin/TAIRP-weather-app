import ReverseGeoCoding from './reversegeocoding.js';

const Mylocation = () => {
  const succes = (position) => {
    const { latitude } = position.coords;
    const { longitude } = position.coords;

    ReverseGeoCoding(latitude, longitude);
  };
  const error = () => {
    if (!succes.ok) {
      throw new Error('HTTP errro! Status:');
    }
  };
  navigator.geolocation.getCurrentPosition(succes, error);
};
export default Mylocation;