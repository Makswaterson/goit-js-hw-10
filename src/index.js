import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';
import { partInfoCountryMarkup, fullInfoCountryMarkup } from './createMarkup';
const DEBOUNCE_DELAY = 300;

const refs = {
  searchInput: document.querySelector('#search-box'),
  countryList: document.querySelector('.country-list'),
  countryInfo: document.querySelector('.country-info'),
};
const { searchInput, countryList, countryInfo } = refs;

searchInput.addEventListener('input', debounce(onHandleSearch, DEBOUNCE_DELAY));

function onHandleSearch(event) {
  const country = event.target.value.trim().toLowerCase();
  cleanInfoList();
  if (!country) {
    return;
  } else {
    fetchCountries(country)
      .then(data => {
        cleanInfoList();
        if (data.length >= 2 && data.length <= 10) {
          countryList.innerHTML = partInfoCountryMarkup(data);
        } else if (data.length > 10) {
          cleanInfoList();
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else {
          cleanInfoList();
          if (data.length === 1) {
            countryInfo.innerHTML = fullInfoCountryMarkup(data);
          }
        }
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
        console.log(error.message);
      });
  }
}

function cleanInfoList() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}
