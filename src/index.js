import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';
const DEBOUNCE_DELAY = 300;

const refs = {
  searchInput: document.querySelector('#search-box'),
  countryList: document.querySelector('country-list'),
  countryInfo: document.querySelector('country-info'),
};

//   .then(data => {})
//   .catch(error => {});
