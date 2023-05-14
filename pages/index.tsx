import type { GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import axios from 'axios'
import { Country } from '../types/country'
import CountryCard from '../components/CountryCard'

interface Props {
  countries: Country[];
  apiUrl: string;
}

const Home: NextPage<Props> = ({ countries, apiUrl }) => {
  return (
    <div className='container mx-auto px-4 pt-8'>
      <Head>
        <title>Next ISR PoC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className='flex flex-col justify-center'>
        <h1 className='text-3xl'>Next ISR PoC</h1>
        <hr />
        <h2 className='text-xl mt-6'>List of countries</h2>
        <p className='text-sm text-gray-500'>
          <a href={`${apiUrl}/country`} target="_blank" rel="noopener noreferrer">
            {`${apiUrl}/country`}
          </a>
        </p>
        <div className='mt-3'>
          {
            countries.map(country => (
              <CountryCard key={country.id} country={country} />
            ))
          }
        </div>
      </div>
    </div>
  )
}

export const getStaticProps: GetStaticProps = async (ctx) => {
  const { data } = await axios.get<Country[]>(`${process.env.API_URL}/country`);

  return {
    props: {
      countries: data,
      apiUrl: process.env.API_URL
    },
    revalidate: 60 // 60 seconds
  }
}

export default Home