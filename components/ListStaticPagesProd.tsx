import React from 'react';
import PageCard from './PageCard';

interface ListStaticPagesProps {
    staticPagesPathName: string[];
}

const ListStaticPagesProd: React.FC<ListStaticPagesProps> = ({ staticPagesPathName }) => {
   return (
      <div>
         <h2 className='text-xl mt-6'>Static Pages</h2>
         <p className='text-sm text-gray-500'>{`.next/server/pages/country`}</p>
         <div className='mt-3'>
            {staticPagesPathName.map((page) => (
               <PageCard key={page} page={page} />
            ))}
         </div>
      </div>
   );
};

export default ListStaticPagesProd;
