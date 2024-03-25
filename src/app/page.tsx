"use client";
import react, {useState} from 'react';
import Image from 'next/image';
import WorldMap from'../../public/Simple_world_map.svg';


const Home = () => {
  const [visaRequirement, setVisaRequirement] = useState<string | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [originCountry, setOriginCountry] = useState<string>('');
  const [arrivalCountry, setArrivalCountry] = useState<string>('');

  const checkVisaRequirement = async () => {
    try {
      const response = await fetch(`/api/route?origin_country=${originCountry}&arrival_country=${arrivalCountry}`);
      const data = await response.json();
      if (response.ok) {
        setVisaRequirement(data.visaRequirement);
        setError(null);
      } else {
        setError(data.error || 'Unknown error');
        setVisaRequirement(null);
      }
    } catch (error) {
      setError('Failed to fetch data');
      setVisaRequirement(null);
    }
  };

  return (
    <div>
      <div className="flex w-full items-center justify-center px-4 py-4 font-bold">
        <h1>Visa Requirement Checker v0</h1>
      </div>
      <div className="flex items-center justify-center py-2">
        <input
          className='rounded-md text-gray-900 px-2 py-2'
          type="text"
          placeholder="Country of Origin"
          value={originCountry}
          onChange={(e) => setOriginCountry(e.target.value)}
        />
      </div>
      <div className="flex items-center justify-center py-2">
        <input
          className='rounded-md text-gray-900 px-2 py-2'
          type="text"
          placeholder="Arrival Country"
          value={arrivalCountry}
          onChange={(e) => setArrivalCountry(e.target.value)}
        />
      </div>
      <div className='flex justify-center items-center py-2'>
        <button className='bg-violet-500 rounded-lg px-6 py-4 hover:bg-violet-700' onClick={checkVisaRequirement}>
          Check Visa Requirement
        </button>
      </div>
      {visaRequirement && (
        <div className='flex justify-center items-center py-2'>
          <p>{visaRequirement}</p>
        </div>
      )}
      {error && (
        <div className='flex justify-center items-center py-2'>
          <p>{error}</p>
        </div>
      )}
      <div className="flex items-center justify-center">
        <Image
          src={WorldMap}
          alt="world map"
          width={2000}
        />
      </div>
    </div>
  );
};


export default Home;
