import React, { useEffect, useState } from "react";
import Home from "./Components/Home";
import Details from "./Components/Details";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [darkMode, setDarkMode] = useState(false);
  const [selectedCountry, setSelectedCountry] = useState(null);

  const [searchQuery, setSearchQuery] = useState("");
  const [selectedRegion, setSelectedRegion] = useState("");
  const [scrollPosition, setScrollPosition] = useState(0);

  useEffect(() => {
    fetch(
      "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3",
    )
      .then((res) => res.json())
      .then((data) => setCountries(data))
      .catch(console.error);
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle("dark", darkMode);
  }, [darkMode]);

  const handleSelectCountry = (cca3) => {
    setScrollPosition(window.scrollY);
    setSelectedCountry(cca3);
  };

  const handleBack = () => {
    setSelectedCountry(null);

    setTimeout(() => {
      window.scrollTo(0, scrollPosition);
    }, 0);
  };

  if (selectedCountry) {
    return (
      <Details
        countries={countries}
        selectedCountry={selectedCountry}
        Back={handleBack}
        darkMode={darkMode}
        setDarkMode={setDarkMode}
      />
    );
  }

  return (
    <Home
      countries={countries}
      setSelectedCountry={handleSelectCountry}
      darkMode={darkMode}
      setDarkMode={setDarkMode}
      searchQuery={searchQuery}
      setSearchQuery={setSearchQuery}
      selectedRegion={selectedRegion}
      setSelectedRegion={setSelectedRegion}
      scrollPosition={scrollPosition}
      setScrollPosition={setScrollPosition}
    />
  );
};

export default App;
