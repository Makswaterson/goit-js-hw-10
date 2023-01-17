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
const { searchInput, countryList, countryInfo } = refs;

searchInput.addEventListener('input', debounce(onHandleSearch, DEBOUNCE_DELAY));

function onHandleSearch(event) {
  const country = event.target.value.trim().toLowerCase();
  if (!country) {
    return;
  } else {
    fetchCountries(country)
      .then(data => {
        if (data.length > 10) {
          Notify.info(
            'Too many matches found. Please enter a more specific name.'
          );
        } else if (data.length >= 2 && data.length <= 10) {
          // Кожен елемент списку складається з прапора та назви країни.;
        } else {
          // з даними про країну: прапор, назва, столиця, населення і мови.
        }
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
        console.log(error.message);
      });
  }
}
