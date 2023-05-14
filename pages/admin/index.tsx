import { useState, useEffect } from 'react';
import { GetStaticProps, NextPage } from 'next';
import Head from 'next/head';
import axios from 'axios';
import { Country } from '../../types/country';

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
      <div className='container mx-auto px-4 pt-8'>
         <Head>
            <title>Next ISR PoC - Admin DB</title>
            <link rel='icon' href='/favicon.ico' />
         </Head>

         <div className='mb-6'>
            <h1 className='text-3xl'>Next ISR PoC</h1>
         </div>

         <div className='flex flex-row justify-start gap-10'>
            <div className='container mx-auto'>
               <table className='min-w-full border border-gray-300'>
                  <thead>
                     <tr className='bg-zinc-900'>
                        <th className='py-2 px-4 text-left border-b'>ID</th>
                        <th className='py-2 px-4 text-left border-b'>Name</th>
                        <th className='py-2 px-4 text-left border-b'>
                           Population
                        </th>
                        <th className='py-2 px-4 text-left border-b'>
                           Continent
                        </th>
                        <th className='py-2 px-4 text-left border-b'>
                           Actions
                        </th>
                     </tr>
                  </thead>
                  <tbody>
                     {countries.map((country) => (
                        <tr key={country.id} className='border-b'>
                           <td className='py-2 px-4'>{country.id}</td>
                           <td className='py-2 px-4'>{country.name}</td>
                           <td className='py-2 px-4'>{country.population}</td>
                           <td className='py-2 px-4'>{country.continent}</td>
                           <td className='py-2 px-4'>
                              <button
                                 className='text-red-500'
                                 onClick={() => handleDelete(country.id)}
                              >
                                 Delete
                              </button>
                           </td>
                        </tr>
                     ))}
                  </tbody>
               </table>

               <div>
                  <form 
                    onSubmit={handleNewCountrySubmit}
                    className='mt-8 flex flex-row justify-left gap-5'
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
