import { useState, useEffect } from 'react';
import axios from 'axios';
import { Country } from '../../types/country';
import { GetStaticProps } from 'next';
import Head from 'next/head';

interface Props {
    apiUrl: string;
 }
 
const AdminPage = ({ apiUrl = '' }) => {
  const [countries, setCountries] = useState<Country[]>([]);

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
            <div className="container mx-auto">

            <table className="min-w-full border border-gray-300">
                <thead>
                    <tr className="bg-zinc-900">
                        <th className="py-2 px-4 text-left border-b">ID</th>
                        <th className="py-2 px-4 text-left border-b">Name</th>
                        <th className="py-2 px-4 text-left border-b">Population</th>
                        <th className="py-2 px-4 text-left border-b">Continent</th>
                        <th className="py-2 px-4 text-left border-b">Actions</th>
                    </tr>
                </thead>
                <tbody>
                {countries.map((country) => (
                    <tr key={country.id} className="border-b">
                    <td className="py-2 px-4">{country.id}</td>
                    <td className="py-2 px-4">{country.name}</td>
                    <td className="py-2 px-4">{country.population}</td>
                    <td className="py-2 px-4">{country.continent}</td>
                    <td className="py-2 px-4">
                        <button className="mr-2 text-blue-500" onClick={() => {}}>Edit</button>
                        <button className="text-red-500" onClick={() => handleDelete(country.id)}>Delete</button>
                    </td>
                    </tr>
                ))}
                </tbody>
            </table>
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