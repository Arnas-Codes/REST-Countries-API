import React, { useEffect, useState } from "react";
import Home from "./Components/Home";
import Details from "./Components/Details";

const App = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(true);
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
      .then((data) => {
        setCountries(data);
        setLoading(false);
      })
      .catch((error) => {
        console.error(error);
        setLoading(false);
      });
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

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-(--bg-color) text-(--text-color)">
        <div className="rounded-xl bg-(--element-color) px-6 py-4 shadow">
          Loading countries...
        </div>
      </div>
    );
  }

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
