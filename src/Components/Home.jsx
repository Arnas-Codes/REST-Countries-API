import React, { useState } from "react";
import Header from "./Header";
import searchIcon from "../assets/search-interface-symbol.png";

const Home = ({
  countries,
  setSelectedCountry,
  darkMode,
  setDarkMode,
  searchQuery,
  setSearchQuery,
  selectedRegion,
  setSelectedRegion,
  scrollPosition,
  setScrollPosition,
}) => {
  const filteredCountries = countries.filter((country) => {
    const matchesSearch = country.name.common
      .toLowerCase()
      .includes(searchQuery.toLowerCase());

    const matchesRegion = !selectedRegion || country.region === selectedRegion;

    return matchesSearch && matchesRegion;
  });

  const handleSelectCountry = (cca3) => {
    setScrollPosition(window.scrollY);
    setSelectedCountry(cca3);
  };

  return (
    <div className="min-h-screen bg-(--bg-color) text-(--text-color)">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />
      <div className="w-full flex flex-col md:flex-row md:justify-between md:items-center gap-4 px-8 py-4 mt-6">
        <div className="relative">
          <img
            className="w-4 h-4 mr-2 bg-(--element-color) absolute top-1/2 left-2 transform -translate-y-1/2"
            src={searchIcon}
            alt="Search"
          />
          <input
            type="text"
            placeholder="Search for a country..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full md:flex-1 md:max-w-md px-8 py-4 rounded shadow bg-(--element-color) "
          />
        </div>

        <select
          value={selectedRegion}
          onChange={(e) => setSelectedRegion(e.target.value)}
          className="w-fit px-5 py-4 rounded shadow bg-(--element-color)"
        >
          <option value=""> Filter by Region</option>
          <option value="Africa">Africa</option>
          <option value="Americas">Americas</option>
          <option value="Asia">Asia</option>
          <option value="Europe">Europe</option>
          <option value="Oceania">Oceania</option>
        </select>
      </div>
      <main className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-10 px-8 mt-8">
        {filteredCountries.map((country) => (
          <div
            key={country.cca3}
            onClick={() => handleSelectCountry(country.cca3)}
            className="cursor-pointer overflow-hidden rounded-md shadow bg-(--element-color) transition hover:scale-105"
          >
            <img
              src={country.flags.svg}
              alt={country.name.common}
              className="w-full h-56 object-cover"
            />

            <div className="p-6">
              <h2 className="font-bold text-xl mb-3">{country.name.common}</h2>

              <p>
                <strong>Population:</strong>{" "}
                {country.population.toLocaleString()}
              </p>

              <p>
                <strong>Region:</strong> {country.region}
              </p>

              <p>
                <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
              </p>
            </div>
          </div>
        ))}
      </main>
    </div>
  );
};

export default Home;
