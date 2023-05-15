import { GetStaticPaths, GetStaticProps, NextPage } from 'next';
import axios from 'axios';
import { Country } from '../../types/country';
import { getCountryInfo } from '../../utils/getCountryInfo';
import Head from 'next/head';
import CountryCard from '../../components/CountryCard';
import Header from '../../components/Header';

interface Props {
   country: Country;
   apiUrl: string;
}

const CountryByNamePage: NextPage<Props> = ({ country, apiUrl }) => {
   return (
      <div className='container mx-auto px-4 pt-8'>
         <Header showButtonAdminDb title='Next ISR PoC' />

         <div className='flex flex-col justify-center'>
            <h2 className='text-xl mt-6'>Country By Name</h2>
            <p className='text-sm text-gray-500'>
               <a
                  href={`${apiUrl}/country/${country.name}`}
                  target='_blank'
                  rel='noopener noreferrer'
               >
                  {`${apiUrl}/country/${country.name}`}
               </a>
            </p>
            <div className='mt-3'>
               <CountryCard key={country.id} country={country} />
            </div>
         </div>
      </div>
   );
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
   const { data } = await axios.get<Country[]>(
      `${process.env.API_URL}/country`
   );
   const countryNames: string[] = data.map((country) =>
      country.name.toLowerCase()
   );

   return {
      paths: countryNames.map((name) => ({ params: { name } })),
      fallback: 'blocking',
   };
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
   const { name } = params as { name: string };

   const country = await getCountryInfo(name);

   if (!country) {
      return {
         redirect: {
            destination: '/',
            permanent: false,
         },
      };
   }

   return {
      props: {
         country,
         apiUrl: process.env.API_URL,
      },
      revalidate: 60, // 60 seconds
   };
};

export default CountryByNamePage;
