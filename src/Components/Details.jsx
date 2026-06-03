import React, { useEffect, useState } from "react";
import Header from "./Header";

const Details = ({
  countries,
  selectedCountry,
  Back,
  darkMode,
  setDarkMode,
}) => {
  const [country, setCountry] = useState(null);

  useEffect(() => {
    fetch(`https://restcountries.com/v3.1/alpha/${selectedCountry}`)
      .then((res) => res.json())
      .then((data) => setCountry(data[0]))
      .catch(console.error);
  }, [selectedCountry]);

  if (!country) {
    return (
      <div className="min-h-screen flex justify-center items-center">
        Loading...
      </div>
    );
  }

  const borderNames =
    country.borders?.map(
      (code) => countries.find((c) => c.cca3 === code)?.name.common || code,
    ) || [];

  return (
    <div className="min-h-screen bg-(--bg-color) text-(--text-color)">
      <Header darkMode={darkMode} setDarkMode={setDarkMode} />

      <main className="p-6">
        <button
          onClick={Back}
          className="px-8 py-2 rounded shadow bg-(--element-color) mb-10"
        >
          Back
        </button>

        <div className="grid md:grid-cols-2 gap-16 items-center">
          <img
            src={country.flags.svg}
            alt={country.name.common}
            className="w-full"
          />

          <div>
            <h2 className="text-3xl font-bold mb-8">{country.name.common}</h2>

            <div className="grid md:grid-cols-2 gap-8">
              <div>
                <p>
                  <strong>Native Name:</strong>{" "}
                  {Object.values(country.name.nativeName || {})[0]?.common ||
                    "N/A"}
                </p>

                <p>
                  <strong>Population:</strong>{" "}
                  {country.population.toLocaleString()}
                </p>

                <p>
                  <strong>Region:</strong> {country.region}
                </p>

                <p>
                  <strong>Sub Region:</strong> {country.subregion}
                </p>

                <p>
                  <strong>Capital:</strong> {country.capital?.[0] || "N/A"}
                </p>
              </div>

              <div>
                <p>
                  <strong>Top Level Domain:</strong> {country.tld?.join(", ")}
                </p>

                <p>
                  <strong>Currencies:</strong>{" "}
                  {Object.values(country.currencies || {})
                    .map((currency) => currency.name)
                    .join(", ")}
                </p>

                <p>
                  <strong>Languages:</strong>{" "}
                  {Object.values(country.languages || {}).join(", ")}
                </p>
              </div>
            </div>

            <div className="mt-10">
              <h3 className="font-bold mb-4">Border Countries:</h3>

              <div className="flex flex-wrap gap-3">
                {borderNames.length > 0 ? (
                  borderNames.map((name) => (
                    <span
                      key={name}
                      className="px-4 py-2 rounded shadow bg-(--element-color)"
                    >
                      {name}
                    </span>
                  ))
                ) : (
                  <span>No Border Countries</span>
                )}
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default Details;
