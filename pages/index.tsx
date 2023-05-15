import { useState, useEffect } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { PuffLoader } from 'react-spinners';
import { Country } from '../types/country';
import CountryCard from '../components/CountryCard';
import PageCard from '../components/PageCard';
import Header from '../components/Header';

const REVALIDATE_SSR_SECONDS = 20;

interface Props {
   countries: Country[];
   staticPagesPathId: [];
   staticPagesPathName: [];
   apiUrl: string;
   nextRefresh: number;
}

const Home: NextPage<Props> = ({
   countries,
   apiUrl,
   staticPagesPathId,
   staticPagesPathName,
   nextRefresh,
}) => {
   const router = useRouter();

   const [secondsLeft, setSecondsLeft] = useState<number | null>(null);

   useEffect(() => {
      const timer = setInterval(() => {
         let elapsedSeconds = Math.floor((nextRefresh - Date.now()) / 1000);

         if (elapsedSeconds <= 0) {
            clearInterval(timer);
            location.reload();
         } else {
            setSecondsLeft(elapsedSeconds);
         }
      }, 1000);

      return () => clearInterval(timer);
   }, [nextRefresh, router, secondsLeft]);

   return (
      <div className='container mx-auto pt-8 p-5 md:px-0'>
         <Header showButtonAdminDb title='Next ISR PoC' />

         <div
            className='
            flex 
            flex-col
            md:flex-row 
            justify-start
            md:gap-7
            gap-2
         '
         >
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

            <div>
               <h2 className='text-xl mt-6'>Static Pages (id)</h2>
               <p className='text-sm text-gray-500'>
                  {`.next/server/pages/country/id`}
               </p>
               <div className='mt-3'>
                  {staticPagesPathId.map((page) => (
                     <PageCard key={page} page={page} />
                  ))}
               </div>
            </div>

            <div>
               <h2 className='text-xl mt-6'>Static Pages (name)</h2>
               <p className='text-sm text-gray-500'>
                  {`.next/server/pages/country`}
               </p>
               <div className='mt-3'>
                  {staticPagesPathName.map((page) => (
                     <PageCard key={page} page={page} />
                  ))}
               </div>
            </div>

            <div
               className='
               flex 
               flex-col 
               items-center
               order-first 
               md:order-last
            '
            >
               <h2 className='text-xl mt-3 md:mt-6'>ISR Revalidate</h2>
               <p
                  className='
                  text-sm 
                  text-gray-500 
                  md:w-[240px] 
                  text-center
               '
               >
                  Next revalidate in:
               </p>

               {secondsLeft !== null ? (
                  <>
                     <div
                        className='
                           mt-4
                           text-4xl
                           bg-orange-500
                           text-center
                           rounded-full 
                           w-[90px] 
                           h-[90px]
                           flex
                           items-center
                           justify-center
                        '
                     >
                        <p>{secondsLeft}</p>
                     </div>
                  </>
               ) : (
                  <div
                     className='
                        flex 
                        flex-col 
                        justify-center 
                        items-center 
                        mt-10
                     '
                  >
                     <PuffLoader size={60} color='#F87315' />
                  </div>
               )}
            </div>
         </div>
      </div>
   );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
   const { data } = await axios.get<Country[]>(
      `${process.env.API_URL}/country`
   );

   let staticPagesPathId: string[] = [];
   let staticPagesPathName: string[] = [];

   data.map((country) => {
      staticPagesPathId.push(
         `.next/server/pages/country/id/${country.id}.json`
      );
      staticPagesPathId.push(
         `.next/server/pages/country/id/${country.id}.html`
      );
      staticPagesPathName.push(
         `.next/server/pages/country/${country.name.toLowerCase()}.json`
      );
      staticPagesPathName.push(
         `.next/server/pages/country/${country.name.toLowerCase()}.html`
      );
   });

   const lastRefresh = Date.now();
   let nextRefresh = new Date(lastRefresh);
   nextRefresh.setSeconds(
      nextRefresh.getSeconds() + REVALIDATE_SSR_SECONDS + 1
   );

   // await axios.get(`${process.env.API_URL}/seed`);
   // console.log('Data Base Generated');

   return {
      props: {
         countries: data,
         staticPagesPathId: staticPagesPathId,
         staticPagesPathName: staticPagesPathName,
         apiUrl: process.env.API_URL,
         nextRefresh: Number(nextRefresh),
      },
      revalidate: REVALIDATE_SSR_SECONDS,
   };
};

export default Home;
