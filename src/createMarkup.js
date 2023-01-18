export function partInfoCountryMarkup(countries) {
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

export function fullInfoCountryMarkup(country) {
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
