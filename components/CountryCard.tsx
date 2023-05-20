import React from 'react';
import { Country } from '../types/country';

interface Props {
   country: Country;
   showDeleteButton?: boolean;
   onDelete?: (id: number) => void;
}

const CountryCard: React.FC<Props> = ({ country, showDeleteButton, onDelete }) => {

  const handleDeleteClick = () => {
    if (onDelete) {
      onDelete(country.id);
    }
  };
  
   return (
      <div className='bg-black rounded-lg shadow-lg px-4 py-2 mb-3 flex flex-row justify-between'>
         <div>
            <h2 className='text-xl font-bold text-blue-600'>
               <a
                  href={`/country/${country.name.toLowerCase()}`}
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  {country.name.charAt(0).toUpperCase() + country.name.slice(1)}
               </a>
            </h2>
            <div className='text-white'>
               <p className='text-sm'>Population: {country.population}</p>
               <p className='text-sm'>Continent: {country.continent}</p>
            </div>
         </div>

         <div className='flex justify-center items-center'>
            {showDeleteButton && (
               <div>
                  <button
                     className='text-white mr-2 bg-red-600 px-2 py-1 rounded pointer text-sm'
                     onClick={handleDeleteClick}
                  >
                     Delete
                  </button>
               </div>
            )}
         </div>
      </div>
   );
};

export default CountryCard;
