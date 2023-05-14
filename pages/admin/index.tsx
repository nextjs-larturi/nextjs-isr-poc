import { useState, useEffect } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';
import { Country } from '../../types/country';
import CountryCard from '../../components/CountryCard';

interface Props {
   apiUrl: string;
}

const AdminPage: NextPage<Props> = ({ apiUrl = '' }) => {
   const [countries, setCountries] = useState<Country[]>([]);

   const [newCountry, setNewCountry] = useState<Country>({
      id: 0,
      name: '',
      population: 0,
      continent: '',
   });

   const handleNewCountryChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      setNewCountry({
         ...newCountry,
         [e.target.name]: e.target.value,
      });
   };

   const handleNewCountrySubmit = async (
      e: React.FormEvent<HTMLFormElement>
   ) => {
      e.preventDefault();
      try {
         await axios.post(`${apiUrl}/country`, newCountry);

         getCountries();
         setNewCountry({
            id: 0,
            name: '',
            population: 0,
            continent: '',
         });
      } catch (error) {
         console.error('Error creating country:', error);
      }
   };

   useEffect(() => {
      getCountries();
      // eslint-disable-next-line react-hooks/exhaustive-deps
   }, []);

   const handleDelete = async (id: number) => {
      try {
         await axios.delete(`${apiUrl}/country/${id}`);
         const newCountries = countries.filter((country) => country.id !== id);
         setCountries(newCountries);
      } catch (error) {
         console.error('Error deleting country:', error);
      }
   };

   const getCountries = async () => {
      try {
         const { data } = await axios.get<Country[]>(`${apiUrl}/country`);
         setCountries(data);
      } catch (error) {
         console.error('Error fetching countries:', error);
      }
   };

   return (
      <div className='container mx-auto px-4 pt-10'>
         <Head>
            <title>Next ISR PoC - Admin DB</title>
            <link rel='icon' href='/favicon.ico' />
         </Head>

         <div className='flex flex-row justify-between'>
            <div className='mt-7'>
               <h1 className='text-3xl'>Next ISR PoC - Admin DB</h1>
            </div>

            <div>
               <h3 className='text-xl'>Add new country:</h3>
               <form
                  onSubmit={handleNewCountrySubmit}
                  className='mt-3 flex flex-row justify-left gap-5'
               >
                  <div className='mb-4'>
                     <input
                        type='text'
                        placeholder='Name'
                        id='name'
                        name='name'
                        value={newCountry.name}
                        onChange={handleNewCountryChange}
                        required
                        className='border rounded px-3 py-2 mb-1 text-black'
                     />
                  </div>

                  <div className='mb-4'>
                     <input
                        type='number'
                        placeholder='Population'
                        id='population'
                        name='population'
                        value={newCountry.population}
                        onChange={handleNewCountryChange}
                        required
                        className='border rounded px-3 py-2 mb-1 text-black'
                     />
                  </div>

                  <div className='mb-4'>
                     <input
                        type='text'
                        placeholder='Continent'
                        id='continent'
                        name='continent'
                        value={newCountry.continent}
                        onChange={handleNewCountryChange}
                        required
                        className='border rounded px-3 py-2 mb-1 text-black'
                     />
                  </div>

                  <button
                     type='submit'
                     className='bg-green-500 text-white py-0 px-4 rounded h-11'
                  >
                     Add Country
                  </button>
               </form>
            </div>
         </div>

         <div className='flex flex-row justify-start gap-10 mt-10'>
            <div className='container mx-auto'>
               {countries.map((country) => (
                  <CountryCard
                     key={country.id}
                     country={country}
                     showDeleteButton
                     onDelete={handleDelete}
                  />

                  // <button
                  //          className='text-red-500'
                  //          onClick={() => handleDelete(country.id)}
                  //       >
                  //          Delete
                  //       </button>
               ))}
            </div>
         </div>
      </div>
   );
};

export const getStaticProps: GetStaticProps = async (ctx) => {
   return {
      props: {
         apiUrl: process.env.API_URL || 'http://localhost:3000',
      },
   };
};

export default AdminPage;
