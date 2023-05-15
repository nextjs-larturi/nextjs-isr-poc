import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';

interface Props {
   showButtonAdminDb?: boolean;
   title: string;
}

const Header: NextPage<Props> = ({showButtonAdminDb, title}) => {

    return (
      <>
         <Head>
            <title>{title}</title>
            <link rel='icon' href='/favicon.ico' />
         </Head>

         <div className='flex flex-row justify-between mb-8'>
            <h1 className='text-3xl'>{title}</h1>

            {showButtonAdminDb && (
               <div className='mt-2'>
                  <a
                     href='/admin'
                     target='_blank'
                     rel='noopener noreferrer'
                     className='
                     bg-blue-600
                     py-3
                     px-5
                     rounded
                     pointer
                     hover:bg-blue-800
                  '
                  >
                     Admin DB
                  </a>
               </div>
            )}
         </div>
      </>
   );
};

export default Header;
