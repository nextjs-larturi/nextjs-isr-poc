import fs from 'fs';
import path from 'path';
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
   req: NextApiRequest,
   res: NextApiResponse
) {
   try {
      const dirPagesName = '.next/server/pages/country';

      if(!fs.existsSync(dirPagesName)) {
         return res.json({
            filesPagesName: [],
         });
      }

      const routeDirPagesName = path.join(process.cwd(), dirPagesName);
      const filesPagesName = fs.readdirSync(routeDirPagesName);
      const cleanedFilesPagesNames = filesPagesName.filter((archivo) => {

         const extension = path.extname(archivo);

         return (
            !archivo.includes('[name].js') &&
            !archivo.includes('[name].js.nft.json') &&
            !archivo.includes('id') &&
            extension !== '.json'
         );
      });

      return res.json({
         filesPagesName: cleanedFilesPagesNames,
      });
   } catch (err) {
      return res
         .status(500)
         .send('Error reading directory: .next/server/pages/country');
   }
}