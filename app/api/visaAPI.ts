import { NextApiRequest, NextApiResponse } from 'next';

type ResponseData = {
  visaRequirement: string;
  error: string;
};

export default async function handler (req: NextApiRequest, res: NextApiResponse<ResponseData>) {
  if (req.method === 'POST') {
    const { originCountry, arrivalCountry } = await req.body;
    console.log('originCountry:', originCountry);
    console.log('arrivalCountry:', arrivalCountry);
    
    if (originCountry === 'Singapore' && arrivalCountry === 'Malaysia') {
      res.status(200).json({ visaRequirement: 'No visa required', error: '' });
    } else {
      res.status(200).json({ visaRequirement: 'Visa required', error: '' });
    }
  }  else {
    res.status(405).json({ visaRequirement: '', error: 'Method Not Allowed' });
  } 
}