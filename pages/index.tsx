import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import axios from 'axios'
import styles from '../styles/Home.module.css'
import { Country } from '../types/country'
import { getCountryInfo } from '../utils/getCountryInfo'
import CountryCard from '../components/CountryCard'

interface Props {
  countries: Country[]
}

const Home: NextPage<Props> = ({ countries }) => {
  return (
    <div className={styles.container}>
      <Head>
        <title>Next ISR PoC</title>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <h1>Next ISR PoC</h1>
        <div>
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
  const { data } = await axios.get<Country[]>('http://localhost:3000/country');

  return {
    props: {
      countries: data
    },
    revalidate: 60 // 60 seconds
  }
}

export default Home
