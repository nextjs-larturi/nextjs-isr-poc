import React, { useEffect, useState } from 'react';
import axios from 'axios';
import PageCard from './PageCard';

const ListStaticPagesLocal = () => {

   const [staticPaths, setStaticPaths] = useState([])

   const fetchFata = async () => {
      const response = await axios.get(`/api/static-files`);
      setStaticPaths(response.data.filesPagesName);
   }

   useEffect(() => {
     fetchFata();
   }, []);

   return staticPaths ? 
       (
         <div>
            <h2 className='text-xl mt-6'>Static Pages</h2>
            <p className='text-sm text-gray-500'>{`.next/server/pages/country`}</p>
            <div className='mt-3'>
               {staticPaths.map((page) => (
                  <PageCard key={page} page={page} />
               ))}
            </div>
         </div>
   ) : (
      <p>Ok</p>
   )
   
   
};

export default ListStaticPagesLocal;
