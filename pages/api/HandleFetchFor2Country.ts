import { NextApiRequest, NextApiResponse } from 'next';

const handler = async (req: NextApiRequest, res: NextApiResponse) => {
  const { passportCountry, destinationCountry } = req.body;

  try {
    const response = await fetch(
      `https://rough-sun-2523.fly.dev/api/${passportCountry}/${destinationCountry}`,
      {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      },
    );

    const data = await response.json();
    console.log(data);

    if (!response.ok) {
      throw new Error('Failed to fetch data from external API');
    }

    // Handle the response data here
    return res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: 'Unknown error occurred. Please try again.' });
  }
};

export default handler;
