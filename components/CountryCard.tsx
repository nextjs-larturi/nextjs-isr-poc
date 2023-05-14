import React from 'react'
import { Country } from '../types/country';

interface Props {
    country: Country;
}

const CountryCard: React.FC<Props> = ({ country }) => {
  return (
    <div className="bg-black rounded-lg shadow-lg p-4">
      <h2 className="text-2xl font-bold text-neon-green">{country.name}</h2>
      <div className="text-white">
        <p>Población: {country.population}</p>
        <p>Continente: {country.continent}</p>
      </div>
    </div>
  )
}

export default CountryCard