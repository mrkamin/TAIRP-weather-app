import FetchData from './modules/fetchdata.js';
import {
  search,
  getMyLocation,
  errorMassage,
  unitSelect,
} from './modules/varaibles.js';
import ForwardGeoCoding from './modules/forwardgeocoding.js';

window.onload = () => {
  ForwardGeoCoding();
};
// Add an event listener to handle unit selection changes
unitSelect.addEventListener('change', () => {
  const selectedUnit = unitSelect.value;
  const location = search.value.trim();

  if (location) {
    FetchData(location, selectedUnit);
  }
});

getMyLocation.addEventListener('click', () => {
  errorMassage.innerHTML = '';
  ForwardGeoCoding();
});

search.addEventListener('keydown', (e) => {
  if (e.keyCode === 13) {
    e.preventDefault();
    errorMassage.innerHTML = '';
    const location = search.value.trim();
    const selectedUnit = unitSelect.value;
    if (location) {
      FetchData(location, selectedUnit);
    } else {
      console.error('Please enter a location');
    }
  }
});