"use strict";
const country = document.querySelector(".container");
const borders = document.querySelector(".borders");
const button = document.querySelector(".btn-search");
const bordersTitle = document.querySelector(".borders-heading");
const input = document.querySelector("#find-country");

// Get Country information from REST API

const getRenderCountry = async (country) => {
  try {
    let url = `https://restcountries.com/v3.1/name/${country}`;
    let response = await fetch(url);
    let dataJson = await response.json();

    findCountryData(dataJson);
    // Get information for every selected country border's function..
    dataJson[0].borders.forEach((country) => {
      const lowletter = country.toLowerCase();
      getEachBorder(lowletter);
    });
    // For Error...
  } catch (error) {
    alert(error);
  }
};

// Selected Country Information Function

const findCountryData = (data) => {
  const flag = data[0].flags.png;
  const countryName = data[0].name.official;
  const countryCapital = Object.values(data[0].capital)[0];
  const countryRegion = data[0].region;
  const countryLanguage = Object.values(data[0].languages)[0];
  const countryCurrencies = Object.values(data[0].currencies)[0].name;
  const countryPopulation = +(data[0].population / 1000000).toFixed(1);
  const countryCarSide =
    data[0].car.side.charAt(0).toUpperCase() + data[0].car.side.slice(1);

  const html = `
  <div class="country">
      
          <img class="country__img" src="${flag}"  alt="flag" />
      
      <div class="country__data">
      <h3 class="country__name">${countryName}</h3>
      <h4 class="country__region"> Region: ${countryRegion} </h4>
      <p class="country__row"><span>Poputalion: </span> ${countryPopulation} million </p>
      <p class="country__row"><span>Language: </span> ${countryLanguage} </p>
      <p class="country__row"><span>Currencies: </span> ${countryCurrencies} </p>
      <p class="country__row"><span>Capital: </span> ${countryCapital} </p>
      <p class="country__row"><span>Car Side: </span> ${countryCarSide} </p>
      </div>
  </div> `;

  country.insertAdjacentHTML("beforeend", html);
};

//  BORDERS START

// Get Border information from REST API

const getEachBorder = async (border) => {
  try {
    let borderUrl = `https://restcountries.com/v3.1/alpha/${border}`;
    let borderResponse = await fetch(borderUrl);
    let borderDataJson = await borderResponse.json();
    renderBorderValue(borderDataJson);
  } catch (error) {
    alert(error);
  }
};

// Selected Country Border's Information Function

const renderBorderValue = (data) => {
  const flag = data[0].flags.png;
  const countryName = data[0].name.official;
  const countryCapital = Object.values(data[0].capital)[0];
  const countryRegion = data[0].region;
  const countryLanguage = Object.values(data[0].languages)[0];
  const countryCurrencies = Object.values(data[0].currencies)[0].name;
  const countryPopulation = +(data[0].population / 1000000).toFixed(1);
  const countryCarSide =
    data[0].car.side.charAt(0).toUpperCase() + data[0].car.side.slice(1);

  const html = `
  <div class="country">
    <img class="country__img" src="${flag}"  alt="flag" />
   <div class="country__data">
      <h3 class="country__name">${countryName}</h3>
      <h4 class="country__region">Region: ${countryRegion} </h4>
      <p class="country__row"><span>Poputalion: </span> ${countryPopulation} million </p>
      <p class="country__row"><span>Language: </span> ${countryLanguage} </p>
      <p class="country__row"><span>Currencies: </span> ${countryCurrencies} </p>
      <p class="country__row"><span>Capital: </span> ${countryCapital} </p>
      <p class="country__row"><span>Car Side: </span> ${countryCarSide} </p>
    </div>
  </div>`;

  borders.insertAdjacentHTML("beforeend", html);
};

// Search Bar, Rendering Country Information..

button.addEventListener("click", (e) => {
  e.preventDefault();
  borders.innerHTML = "";
  country.innerHTML = "";
  bordersTitle.style.display = "block";

  const findMyData = input.value.toLowerCase();
  getRenderCountry(findMyData);
  input.value = "";
});
