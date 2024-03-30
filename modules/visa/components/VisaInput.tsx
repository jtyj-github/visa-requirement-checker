import { useState } from 'react';

const VisaInput = () => {
  const [visaRequirement, setVisaRequirement] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [passportCountry, setPassportCountry] = useState<string>('');
  const [destinationCountry, setDestinationCountry] = useState<string>('');

  const handleCheckVisa = async () => {
    try {
      const response = await fetch(`/api/HandleFetchFor2Country`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          passportCountry,
          destinationCountry,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error('Failed to fetch data from external API');
      }
      setVisaRequirement(data.category);
      setDuration(data.dur);
    } catch (error) {
      console.error();
      setDuration('Unknown error occurred. Please try again.');
    }
  };

  return (
    <div>
      <div className="flex items-center justify-center py-2">
        <input
          className="rounded-md px-2 py-2 text-gray-900"
          type="text"
          placeholder="Passport Country"
          value={passportCountry}
          onChange={(e) => {
            setPassportCountry(e.target.value);
            setVisaRequirement(null);
          }}
        />
      </div>
      <div className="flex items-center justify-center py-2">
        <input
          className="rounded-md px-2 py-2 text-gray-900"
          type="text"
          placeholder="Destination Country"
          value={destinationCountry}
          onChange={(e) => {
            setDestinationCountry(e.target.value);
            setVisaRequirement(null);
          }}
        />
      </div>
      <div className="flex items-center justify-center py-2">
        <button
          type="button"
          className="rounded-lg bg-violet-500 px-6 py-4 hover:bg-violet-700"
          onClick={handleCheckVisa}
        >
          Check Visa Requirement
        </button>
      </div>
      {visaRequirement && (
        <div className="border-2 border-gray-600 bg-slate-800 p-4 text-gray-100">
          {passportCountry && (
            <div className="flex items-center justify-center text-lg font-bold">
              <p> Passport Country: {passportCountry}</p>
            </div>
          )}
          {destinationCountry && (
            <div className="flex items-center justify-center text-lg font-bold">
              <p> Traveling to: {destinationCountry}</p>
            </div>
          )}
          <div className="flex items-center justify-center text-lg font-bold">
            {visaRequirement && <p> Visa required: {visaRequirement}</p>}
            {duration && <p>/{duration} days</p>}
          </div>
        </div>
      )}
      <div>
        <p className="flex justify-center py-1 text-sm opacity-60">
          Please input the passport country and destination country in ISO 2
          Country code format.
        </p>{' '}
        <p className="flex justify-center py-1 text-sm opacity-60">
          E.g. US for United States, CA for Canada, etc.{' '}
        </p>{' '}
        <p className="flex justify-center py-1 text-sm opacity-60">
          To see all the ISO 2 Country codes, visit here:
        </p>
        <a
          className="flex justify-center py-1 opacity-60 underline"
          href="https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2"
        >
          ISO2 Country Code Reference
        </a>
      </div>
    </div>
  );
};

export default VisaInput;
