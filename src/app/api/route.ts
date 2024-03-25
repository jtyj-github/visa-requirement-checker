import { NextApiRequest, NextApiResponse } from 'next';

const GET = async (req: NextApiRequest, res: NextApiResponse) => {
  const originCountry = "USA";
  const arrivalCountry = "Canada";

  const visaRequirements: { [key: string]: string } = {
    "USA-Canada": "No visa required",
    "USA-UK": "Tourist visa required",
    "Canada-USA": "Tourist visa required",
    "Canada-UK": "Tourist visa required",
    "UK-USA": "Tourist visa required",
    "UK-Canada": "Tourist visa required"
  };

  const key = `${originCountry}-${arrivalCountry}`;
  const visaRequirement = visaRequirements[key];

  if (visaRequirement) {
    return (res.status(200).json({ visaRequirement }));
  } else {
    return (res.status(404).json({ error: "Visa requirement not found" }));
  }
}

export { GET };