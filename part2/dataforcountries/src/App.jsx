import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [search, setSearch] = useState("");
  const [filteredCountries, setFilteredCountries] = useState([]);
  const [selectedCountry, setSelectedCountry] = useState(null);
  const [selectedCountryWeather, setSelectedCountryWeather] = useState(null);

  useEffect(() => {
    axios
      .get(`https://studies.cs.helsinki.fi/restcountries/api/all`)
      .then((res) => setCountries(res.data));
  }, []);

  useEffect(() => {
    if (selectedCountry) {
      axios
        .get(
          `https://api.openweathermap.org/data/2.5/weather?q=${
            selectedCountry.capital
          }&appid=${import.meta.env.VITE_OPENWEATHER_API}`
        )
        .then((res) => setSelectedCountryWeather(res.data));
    }
  }, [selectedCountry]);

  const onSearch = (e) => {
    const search = e.target.value;
    setSearch(search);
    setSelectedCountry(null);
    setFilteredCountries(
      countries.filter((country) =>
        country.name.common.toLowerCase().includes(search)
      )
    );
  };

  const renderCountryList = () => {
    if (filteredCountries.length > 10)
      return "Too many matches, specify another filter";
    if (filteredCountries.length > 1)
      return filteredCountries.map((country) => (
        <p key={country.name.common}>
          {country.name.common}{" "}
          <button onClick={() => setSelectedCountry(country)}>Show</button>
        </p>
      ));
    if (filteredCountries.length === 1) {
      return setSelectedCountry(filteredCountries[0]);
    }
    return "No matches";
  };

  const renderCountryInfo = () => {
    {console.log("hello")}
    const country = selectedCountry;
    return (
      <>
        <h1>{country.name.common}</h1>
        <p>Capital: {country.capital}</p>
        <p>Area: {country.area}</p>
        <h2>Languages</h2>
        <ul>
          {Object.entries(country.languages).map(([code, lang]) => {
            return <li key={code}>{lang}</li>;
          })}
        </ul>
        <img src={country.flags.png} alt={`Flag of ${country.name.common}`} />
        <h2>Weather in {country.capital}</h2>
        {!selectedCountryWeather ? (
          "Loading"
        ) : (
          <>
            <p>
              Temperature:{" "}
              {(selectedCountryWeather.main.temp - 273.15).toFixed(2)} Celcius
            </p>
            <img
              src={`https://openweathermap.org/img/wn/${selectedCountryWeather.weather[0].icon}@2x.png`}
              alt=""
            />
            <p>Wind {selectedCountryWeather.wind.speed} m/s</p>
          </>
        )}
      </>
    );
  };

  return (
    <div>
      <form>
        find countries: <input value={search} onChange={onSearch} />
      </form>
      <div>{selectedCountry ? renderCountryInfo() : renderCountryList()}</div>
    </div>
  );
};

export default App;
