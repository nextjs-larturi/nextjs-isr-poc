
import type { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import { useRouter } from 'next/router';
import axios from 'axios';
import { Country } from '../types/country';
import CountryCard from '../components/CountryCard';
import PageCard from '../components/PageCard';

interface Props {
   countries: Country[];
   staticPagesPathId: [];
   staticPagesPathName: [];
   apiUrl: string;
}

const Home: NextPage<Props> = ({ 
    countries, 
    apiUrl, 
    staticPagesPathId, 
    staticPagesPathName
}) => {

   const router = useRouter();

   return (
      <div className='container mx-auto px-4 pt-8'>
         <Head>
            <title>Next ISR PoC</title>
            <link rel='icon' href='/favicon.ico' />
         </Head>

         <div className='flex flex-row justify-between mb-8'>
           <h1 className='text-3xl'>Next ISR PoC</h1>
           <div>
               <button 
                  className='
                     bg-blue-600
                     py-3
                     px-5
                     rounded
                     pointer
                     hover:bg-blue-800
                  '
                  onClick={() => router.push('/admin')}
               >
                  Admin DB
               </button>
            </div>
         </div>

         <div className='flex flex-row justify-start gap-10'>
            <div>
               <h2 className='text-xl mt-6'>List of Countries</h2>
               <p className='text-sm text-gray-500'>
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
     staticPagesPathId.push(`.next/server/pages/country/id/${country.id}.json`);
     staticPagesPathId.push(`.next/server/pages/country/id/${country.id}.html`);
     staticPagesPathName.push(`.next/server/pages/country/${country.name.toLowerCase()}.json`);
     staticPagesPathName.push(`.next/server/pages/country/${country.name.toLowerCase()}.html`);
   });

   return {
      props: {
         countries: data,
         staticPagesPathId: staticPagesPathId,
         staticPagesPathName: staticPagesPathName,
         apiUrl: process.env.API_URL,
      },
      revalidate: 60, // 60 seconds
   };
};

export default Home;
