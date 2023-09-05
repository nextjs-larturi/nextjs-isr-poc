import React, { useEffect, useState } from 'react';
import axios from 'axios';

interface PropsLogServerApp {}

const LogServerApp: React.FC<PropsLogServerApp> = () => {
   const [apiResponse, setApiResponse] = useState<string>('')

   useEffect(() => {
      const fetchData = async () => {
        try {
          const response = await axios.get('/api/log-server')
          setApiResponse(response.data.message);
        } catch (error) {
          console.error('Error al obtener los datos de la API', error);
        }
      }
      fetchData()
    }, [])

   return (
      <>
         <h2 className='text-lg mt-3 md:mt-6'>{apiResponse}</h2>
      </>
   );
};

export default LogServerApp;
