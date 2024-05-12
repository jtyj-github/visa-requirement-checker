import { useState } from 'react';
import countries from 'i18n-iso-countries';

const VisaInput = () => {
  countries.registerLocale(require('i18n-iso-countries/langs/en.json'));

  const [visaRequirement, setVisaRequirement] = useState<string | null>(null);
  const [duration, setDuration] = useState<string | null>(null);
  const [passportCountry, setPassportCountry] = useState<string>('');
  const [destinationCountry, setDestinationCountry] = useState<string>('');
  const [message, setMessage] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const handleCheckVisa = async () => {
    const passportCode = countries.getAlpha2Code(passportCountry.trim(), 'en');
    const destinationCode = countries.getAlpha2Code(destinationCountry.trim(), 'en');
    setMessage('');

    try {
      setIsLoading(true);

      const response = await fetch(`/api/HandleFetchFor2Country`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          passportCode,
          destinationCode,
        }),
      });
      const data = await response.json();

      if (passportCode === undefined || destinationCode === undefined) {
        setMessage('Invalid country name. Please check the spelling.');
        setVisaRequirement(null);
        setDuration(null);
        return;
      }

      if (!response.ok) {
        throw new Error('Failed to fetch data from external API');
      } else {
        setVisaRequirement(data.category);
        setDuration(data.dur);
      }
    } catch (error) {
      console.error();
      setDuration('Unknown error occurred. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div>
      <link
        rel="stylesheet"
        href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css"
        integrity="sha512-DTOQO9RWCH3ppGqcWaEA1BIZOC6xxalwEsw9c2QQeAIftl+Vegovlnee1c9QX4TctnWMn13TZye+giMm8e2LwA=="
        crossOrigin="anonymous"
        referrerPolicy="no-referrer"
      />

      <div className="flex justify-center py-2">
        <input
          className="autofocus text-md rounded-lg border border-gray-300 bg-gray-50 px-8 py-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          type="text"
          placeholder="Passport Country"
          value={passportCountry}
          onChange={(e) => {
            setPassportCountry(e.target.value);
            setVisaRequirement(null);
          }}
        />
      </div>
      <div className="flex justify-center py-2">
        <input
          className="text-md rounded-lg border border-gray-300 bg-gray-50 px-8 py-4 text-gray-900 focus:border-blue-500 focus:ring-blue-500 dark:border-gray-600 dark:bg-gray-700 dark:text-white dark:placeholder-gray-400 dark:focus:border-blue-500 dark:focus:ring-blue-500"
          type="text"
          placeholder="Destination Country"
          value={destinationCountry}
          onChange={(e) => {
            setDestinationCountry(e.target.value);
            setVisaRequirement(null);
          }}
        />
      </div>

      <div className="flex justify-center py-2">
        <button
          type="button"
          className="rounded-lg bg-blue-500 px-10 py-6 text-lg hover:bg-blue-700"
          onClick={handleCheckVisa}
        >
          {isLoading ? (
            <>
              {' '}
              Checking...{' '}
              <i className="fa-solid fa-circle-notch animate-spin" />
            </>
          ) : (
            'Check Visa Requirement'
          )}
        </button>
      </div>
      <div className="flex justify-center p-4">
        {visaRequirement && (
          <div className="flex w-80 justify-center rounded-xl border-2 border-gray-400 bg-slate-800 p-4 text-gray-100">
            {destinationCountry && (
              <div className='px-4'>
                <p className='underline italic'> Destination:</p>
                <h3 className='font-bold text-xxl'>{destinationCountry}</h3>
              </div>
            )}
            <div className='px-4'>
              <p className='underline italic'> Visa Required:</p>
              <h3 className='font-semibold text-xxl'>{visaRequirement}</h3>
              { duration && (<h3 className='font-semibold text-xxl'>{duration} days</h3>)}
            </div>
          </div>
        )}

        {message && (
          <div className="flex w-80 justify-center rounded-xl border-2 border-gray-400 bg-slate-800 p-4 text-gray-100">
            <p className="text-xl font-bold"> {message} </p>
          </div>
        )}
      </div>
    </div>
  );
};

export default VisaInput;
