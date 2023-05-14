import React from 'react'
import { Country } from '../types/country';

interface Props {
    country: Country;
}

const CountryCard: React.FC<Props> = ({ country }) => {
  return (
    <div className="bg-black rounded-lg shadow-lg px-4 py-2 mb-3">
      <h2 className="text-xl font-bold text-blue-600">
        <a href= {`/country/id/${country.id}`} target="_blank" rel="noopener noreferrer">
          {country.name.charAt(0).toUpperCase() + country.name.slice(1)}
        </a>
      </h2>
      <div className="text-white">
        <p className='text-sm'>Population: {country.population}</p>
        <p className='text-sm'>Continent: {country.continent}</p>
      </div>
    </div>
  )
}

export default CountryCard