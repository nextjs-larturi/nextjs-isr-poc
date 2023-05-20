import { useState, useEffect } from 'react';
import type { GetStaticProps, NextPage } from 'next';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Country } from '../types/country';
import CountryCard from '../components/CountryCard';
import PageCard from '../components/PageCard';
import Header from '../components/Header';
import Countdown from '../components/Countdown';
import ListStaticPages from '../components/ListStaticPages';
import ListCountries from '../components/ListCountries';

const REVALIDATE_SSR_SECONDS = 30;

interface Props {
   countries: Country[];
   staticPagesPathName: [];
   apiUrl: string;
   nextRefresh: number;
}

const Home: NextPage<Props> = ({
   countries,
   apiUrl,
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
            lg:flex-row 
            justify-center
            lg:gap-12
            lg:mt-16
            gap-2
         '
         >
            {/* List of Countries */}
            <ListCountries apiUrl={apiUrl} countries={countries} /> 

            {/* List of static pages */}
            <ListStaticPages staticPagesPathName={staticPagesPathName} />

            {/* Countdown */}
            <div className='md:order-last order-first'>
               <Countdown secondsLeft={secondsLeft} />
            </div>
         </div>
      </div>
   );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
   const { data } = await axios.get<Country[]>(
      `${process.env.API_URL}/country`
   );

   let staticPagesPathName: string[] = [];

   data.map((country) => {
      staticPagesPathName.push(
         `.next/server/pages/country/${country.name.toLowerCase()}.html`
      );
      staticPagesPathName.push(
         `.next/server/pages/country/${country.name.toLowerCase()}.json`
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
         staticPagesPathName: staticPagesPathName,
         apiUrl: process.env.API_URL,
         nextRefresh: Number(nextRefresh),
      },
      revalidate: REVALIDATE_SSR_SECONDS,
   };
};

export default Home;
