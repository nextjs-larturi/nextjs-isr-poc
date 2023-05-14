import React from 'react'
import { Country } from '../types/country';

interface Props {
    country: Country;
}

const CountryCard: React.FC<Props> = ({ country }) => {
  return (
    <div className="bg-black rounded-lg shadow-lg p-4 mb-3 w-1/5">
      <h2 className="text-2xl font-bold text-blue-600">
        {country.name.charAt(0).toUpperCase() + country.name.slice(1)}
      </h2>
      <div className="text-white">
        <p>Población: {country.population}</p>
        <p>Continente: {country.continent}</p>
      </div>
    </div>
  )
}

export default CountryCard