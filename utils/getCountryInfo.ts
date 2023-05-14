import axios from 'axios'
import { Country } from '../types/country'

export const getCountryInfo = async (nameOrId: string) => {
    try {
        const { data } = await axios.get<Country>(`http://localhost:3000/country/${nameOrId}`);

        return {
            id: data.id,
            name: data.name,
            population: data.population,
            continent: data.continent,
        }
    } catch (error) {
        return null;
    }

    
}