import React, { useState } from 'react';
import { useRouter } from 'next/router';
import axios from 'axios';
import { PuffLoader } from 'react-spinners';

interface PropsCountdown {
   secondsLeft: number | null;
}

const Countdown: React.FC<PropsCountdown> = ({ secondsLeft }) => {

   const router = useRouter();

   const [isRegenerating, setIsRegenerating] = useState(false);

   const handleRegenerate = async () => {
      setIsRegenerating(true)
      await axios.get(`/api/revalidate?secret=diypkqZN35OIteEzpszu`);
   
      setTimeout(() => {
         router.reload();
      }, 500);
   };

   return (
      <>
         <div
            className='
               flex 
               flex-col 
               items-center
               order-first 
               md:order-last
            '
         >
            <h2 className='text-xl mt-3 md:mt-6'>ISR Revalidate</h2>
            <p
               className='
                  text-sm 
                  text-gray-500 
                  md:w-[240px] 
                  text-center
               '
            >
               Next revalidate in:
            </p>

            {secondsLeft !== null && !isRegenerating ? (
               <>
                  <div
                     className={`
                        mt-4
                        text-4xl
                        ${secondsLeft >= 20 ? 'bg-green-500' : secondsLeft >= 10 ? 'bg-orange-500' : 'bg-red-500'}
                        text-center
                        rounded-full 
                        w-[80px] 
                        h-[80px]
                        flex
                        items-center
                        justify-center
                     `}
                  >
                     <p>{secondsLeft}</p>
                  </div>
               </>
            ) : (
               <div
                  className='
                        flex 
                        flex-col 
                        justify-center 
                        items-center 
                        mt-4
                     '
               >
                  <PuffLoader size={80} color='#2463EB' />
               </div>
            )}
         </div>

         <div className='flex justify-center'>
            <button
               onClick={handleRegenerate}
               disabled={isRegenerating}
               className='
                        bg-transparent 
                        border 
                        border-green-500 
                        text-green-500 
                        hover:bg-green-500 
                        hover:text-white
                        py-1 
                        px-3 
                        rounded
                        mt-6
                     '
            >
               { isRegenerating ? 'Regenerating...' : 'Force Regeneration'}
            </button>
         </div>
      </>
   );
};

export default Countdown;
