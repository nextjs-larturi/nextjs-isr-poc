import React from 'react'
import { Country } from '../types/country';

interface Props {
    page: string;
}

const PageCard: React.FC<Props> = ({ page }) => {
  return (
    <div className="bg-black rounded-lg shadow-lg px-4 py-2 mb-2">
      <h2 className=" text-white">
        {page}
      </h2>
    </div>
  )
}

export default PageCard