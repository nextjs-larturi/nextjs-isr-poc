import React from 'react';

interface Props {
   page: string;
}

const PageCard: React.FC<Props> = ({ page }) => {

   let countryName = '';
   if(page.split('/').length > 1) {
      // Prod
      countryName = page.split('.')[1].split('/')[4].toLocaleLowerCase();
   } else {
      // Local
      countryName = page.split('.')[0].toLocaleLowerCase();
   }

   return (
      <div className='bg-black rounded-lg shadow-lg px-4 py-2 mb-2'>
         <h2 className=' text-white'>
            <a
               href={`/country/${countryName}`}
               target='_blank'
               rel='noopener noreferrer'
            >
               {'next/server/pages/country/' + countryName + '.html'}
            </a>
         </h2>
      </div>
   );
};

export default PageCard;
