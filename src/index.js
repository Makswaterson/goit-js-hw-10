import './css/styles.css';
import debounce from 'lodash.debounce';
import { Notify } from 'notiflix/build/notiflix-notify-aio';
import fetchCountries from './fetchCountries';
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
          console.log(data);

          console.log(markup);
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
            console.log(markup);
          }
        }
      })
      .catch(error => {
        Notify.failure('Oops, there is no country with that name');
        console.log(error.message);
      });
  }
}

function partInfoCountryMarkup(countries) {
  return countries
    .map(({ flags, name }) => {
      return `<li class="country-list_item">
  <img class="country-info-img" width="30px" height="20px" src="${flags.svg}" alt="${name.common}">
    <p class="country-list__name">${name.official}</p>
  </img>
</li>`;
    })
    .join('');
}

function fullInfoCountryMarkup(country) {
  return country
    .map(({ flags, name, capital, population, languages }) => {
      return `
    <div>
  <img
    class="country-info-img"
    width="40px"
    height="20px"
    src="${flags.svg}"
    alt="${name.common}"
  />
  <p class="country-list__name"><strong>${name.official}</strong></p>
  <p><strong>Capital:</strong><span>${capital}</span></p>
  <p><strong>Population:</strong><span>${population}</span></p>
  <p><strong>Languages:</strong><span>${Object.values(languages).join(
    ','
  )}</span></p>
</div>`;
    })
    .join('');
}

function cleanInfoList() {
  countryInfo.innerHTML = '';
  countryList.innerHTML = '';
}
