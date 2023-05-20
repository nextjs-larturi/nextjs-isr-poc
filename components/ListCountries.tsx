import React from 'react';
import { Country } from '../types/country';
import CountryCard from './CountryCard';

interface ListCountriesProps {
    apiUrl: string;
    countries: Country[];
}

const ListCountries: React.FC<ListCountriesProps> = ({ apiUrl, countries }) => {
   return (
      <div>
         <h2 className='text-xl mt-6'>List of Countries</h2>
         <p className='text-sm text-gray-500 md:w-[330px]'>
            <a
               href={`${apiUrl}/country`}
               target='_blank'
               rel='noopener noreferrer'
            >
               {`${apiUrl}/country`}
            </a>
         </p>
         <div className='mt-3'>
            {countries.map((country) => (
               <CountryCard key={country.id} country={country} />
            ))}
         </div>
      </div>
   );
};

export default ListCountries;
