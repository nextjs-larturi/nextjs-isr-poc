import React from 'react';
import { PuffLoader } from 'react-spinners';

interface PropsCountdown {
    secondsLeft: number | null;
}

const Countdown: React.FC<PropsCountdown> = ({ secondsLeft}) => {
   return (
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

         {secondsLeft !== null ? (
            <>
               <div
                  className='
                           mt-4
                           text-4xl
                           bg-orange-500
                           text-center
                           rounded-full 
                           w-[90px] 
                           h-[90px]
                           flex
                           items-center
                           justify-center
                        '
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
                        mt-10
                     '
            >
               <PuffLoader size={60} color='#F87315' />
            </div>
         )}
      </div>
   );
};

export default Countdown;
