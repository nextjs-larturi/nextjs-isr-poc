import { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import { Country } from '../../../types/country';
import { getCountryInfo } from '../../../utils/getCountryInfo';
import Head from 'next/head';
import CountryCard from '../../../components/CountryCard';

interface Props {
  country: Country;
  apiUrl: string;
}

const CountryPage: NextPage<Props> = ({ country, apiUrl }) => {
  return (
    <div className='container mx-auto px-4 pt-8'>
        <Head>
          <title>Next ISR PoC</title>
          <link rel="icon" href="/favicon.ico" />
        </Head>

        <div className='flex flex-col justify-center'>
          <h1 className='text-3xl'>Next ISR PoC</h1>
          <hr />
          <h2 className='text-xl mt-6'>Country By Id</h2>
          <p className='text-sm text-gray-500'>
            <a href={`${apiUrl}/country/${country.id}`} target="_blank" rel="noopener noreferrer">
              {`${apiUrl}/country/${country.id}`}
            </a>
          </p>
          <div className='mt-3'>
              <CountryCard key={country.id} country={country} />
          </div>
        </div>
      </div>
  )
};

export const getStaticPaths: GetStaticPaths = async (ctx) => {
  const allCountries = [...Array(4)].map((value, index) => `${index + 1}`);

  return {
    paths: allCountries.map((id) => ({ params: { id } })),
    fallback: 'blocking'
  }
}

export const getStaticProps: GetStaticProps = async ({ params }) => {
  const { id } = params as { id: string };

  const country = await getCountryInfo(id);

  if (!country) {
    return {
      redirect: {
        destination: '/',
        permanent: false
      }
    }
  }
  
  return {
    props: {
        country,
        apiUrl: process.env.API_URL
    },
    revalidate: 60 // 60 seconds
  }
}

export default CountryPage;