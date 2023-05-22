import React from 'react';
import type { NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';

interface Props {
   showButtonAdminDb?: boolean;
   title: string;
   subtitle: string;
}

const Header: NextPage<Props> = ({showButtonAdminDb, title, subtitle}) => {

   const router = useRouter();

   const handleReload = () => {
      router.push('/');
   }

    return (
      <>
         <Head>
            <title>{title}</title>
            <link rel='icon' href='/favicon.ico' />
         </Head>

         <div className='flex flex-row justify-between mb-8'>
            <div onClick={handleReload} className='cursor-pointer'>
               <h1 className='text-3xl'>{title}</h1>
               <h2 className='text-sm text-gray-300'>{subtitle}</h2>
            </div>

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
