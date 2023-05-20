import { useState, useEffect } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { PuffLoader } from 'react-spinners';
import { Country } from '../types/country';
import CountryCard from '../components/CountryCard';
import PageCard from '../components/PageCard';
import Header from '../components/Header';
import Countdown from '../components/Countdown';

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

   const handleRegenerate = async () => {
      // const { data: result } = await axios.get('http://localhost:3001/api/refresh');
      
      // const data: Country[] = result.data;
      // const staticPagesPathId: string[] = result.staticPagesPathId;
      // const staticPagesPathName: string[] = result.staticPagesPathName;
      
      // setCountries(data);
      // setStaticPagesPathId(staticPagesPathId);
      // setStaticPagesPathName(staticPagesPathName);
   };

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
               md:order-last 
               order-first
            '
            >
               <Countdown secondsLeft={secondsLeft} />
               <div className='flex justify-center'>
                  <button
                     onClick={handleRegenerate}
                     className='
                        bg-transparent 
                        border 
                        border-green-500 
                        text-green-500 
                        hover:bg-green-500 
                        hover:text-white
                        py-1 
                        px-3 
                        rounded
                        mt-6
                     '
                  >
                     Force Regeneration
                  </button>
               </div>
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
