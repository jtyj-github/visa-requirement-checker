# Travel Visa Requirement Checker Project
#### Video Demo: INSERT URL HERE
#### Description:
This webpage was created in order for travelers to check whether they required a travelers visa when going to a particular country. The idea for this webpage was inspired when I was chatting and planning a trip with some friends from different nationalities. The webpage hopes to help streamline the process of researching what kind of visa one might need when traveling to a particular country, cutting out the tedious processing of searching online, and instead, let the traveler focus on applying for the visa itself.

## Initializing Next js
This webpage was created using the nextjs 14 framework, with typescript being used for the frontend and api. Styling is done using tailwindcss, with font-awesome CDN for the loading animation. Other packages used in this webpage include 'i18n-iso-countries', which allows us to interpret the iso2 country codes from the name of the country itself, allowing for a more intuitive api call.

## ISO-2 Country Codes (For Context)
In the webpage, in order to determine what visa a traveler requires, a GET request is called to `https://rough-sun-2523.fly.dev/api/${passportCode}/${destinationCode}`, where passportCode and destinationCode are the iso2 country codes of the origin country of the traveler, and the travelers destination country respectively.

You can check out [ISO-2 reference](https://en.wikipedia.org/wiki/ISO_3166-1_alpha-2/) to learn more about ISO-2 Country Codes

Everything about calling the api will be discussed in the later sections.

## Structure of the source code
The source code is structured in a way such that static components are stored in the components folder, while the components with functions more specific to the webpage is stored in the modules folder. 

Extra attention has to be paid to the pages/api folder, in which the code denoting how the api is called is in. The folder structure has to be specifically as it is due to NextJs14 having dynamic routes for middleware. What this means is that any file in the pages/api folder is mapped to api/* and will be treated as an API endpoint instead of a page. 

## Static Components

The static components consist of AppTitle.tsx and WorldMapComponent.tsx. As the name suggests, they are the static components for both the Title of the app and the World Map seen on the webpage, respectively. A generic svg of a world map was downloaded online, and placed in the 'public' folder.

## Modules [VisaInput.tsx]

There is only 1 file in this folder, titled VisaInput.tsx. The file begins by using useState to define 6 variables that will be used in subsequent parts. 

From line 55 onwards, the code brings in the fontawesome CDN, solely for the loading animation when the user clicks on the button to generate the visa requirement. 
Subsequently, there are 2 inputs for the user to fill in, the origin country and the destination country. The values of this inputs will also be trimmed to reduce the chances of errors from users having whitespace in their inputs (eg. extra space, space at the end of the word, etc)
There is also a button below the 2 inputs which will call the HandleCheckVisa function when clicked, which will be dived deeper later on. 
Finally, there is an additional card component, which will appear after the api is successfully called, which shows the name of the destination country input by the user, along with the visa required and its duration of validity. If the api is unsuccessfully called, an error message will pop up instead, prompting the user to try again.

#### HandleCheckVisa Function, line 14

The function initially gets the ISO-2 country code from the values of the passportCountry and destinationCountry, storing the codes in passportCode and destinationCode respectively. The function then makes a "POST" request to the api, HandleFetchFor2Country endpoint, where it will subsequently make a GET request to the api and send the response back to this function. 
The function also checks if a response was received after making the POST request. Along with trying to catch some errors such as there being an undefined passportCode or destinationCode, likely due to typos in the input or inputting something that is not a country.

A likely question one might ask would be "Why do you not just directly make a GET request to the api, which would remove the need to have the HandleFetchFor2Country endpoint in the first place?" 
This is due to CORS (cross origin resource sharing), which is a HTTP-header based mechanism that allows a server to indicate any origins (domain, scheme, or port) other than its own from which a browser should permit loading resources. When making a GET request directly from the front end, it will trigger a CORS error. 
In order to bypass this, the browser needs to make a "preflight" request to a middleware, which then makes the GET request to the api.
[DISCLAIMER! This is based on my limited understanding on CORS errors, please feel free to correct me where i'm wrong :>]

In Nextjs 14, this HandleFetchFor2Country.ts file is treated as an endpoint, which is essentially like a "middle-end". By making a POST request here, which will then GET the response from the API, there will not be any CORS errors triggered. 

## Middleware [HandleFetchFor2Country.ts]
This middleware makes a GET request to the api used to determine the visa requirements of the traveler. Once called, the response is obtained, and will subsequently be sent back to the HandleCheckVisa function.