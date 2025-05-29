import React from "react";

const SydneyDealCard: React.FC = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-white">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <h2 className="text-2xl font-bold mb-8">Sydney deals & packages</h2>

        <div className="bg-white dark:bg-gray-800  shadow-all overflow-hidden flex flex-col md:flex-row">
          {/* Image */}
          <div className="md:w-1/2">
            <img
              src="https://www.sydney.com/sites/sydney/files/styles/330x276/public/2022-08/Sydney-harbour-captain-cook-cruises.jpg?h=28a60969&itok=EnB0yHYo"
              alt="Sydney Harbour Cruise"
              className="w-[600px] h-[400px] object-cover rounded-[25px]"
            />
          </div>

          {/* Content */}
          <div className="md:w-1/2 p-6 flex flex-col justify-center">
            <h3 className="text-lg md:text-xl font-semibold text-blue-700 dark:text-blue-400 mb-2">
              Feel Indulgent with Accor Hotels
            </h3>
            <p className="text-sm md:text-base mb-2">
              Book your next Sydney stay at an Accor property with rates from $165 per night
            </p>
            <p className="text-sm md:text-base mb-3">
              Indulge in a day of shopping and fine dining, take in a musical or an art exhibition or
              explore a harbour walk and glistening beaches.
            </p>
            <p className="text-xs text-gray-600 dark:text-gray-400 mb-4">
              *Terms and conditions apply.
            </p>
            <a
  href="https://www.booking.com/city/au/sydney.en.html?aid=861607&pagename=sydney&label=msn-ZdfHhgFkLR5FyYggfj64Bw-80470689517712:tikwd-80470889677816:loc-90:neo:mte:lp158325:dec:qssydney%20travel%20package&utm_campaign=Deals%20-%20Australia&utm_medium=cpc&utm_source=bing&utm_term=ZdfHhgFkLR5FyYggfj64Bw&msclkid=8ee520cdc3f11dc005f648f5fa2afee6&utm_content=Sydney%20-%20UFI%3A-1603135"
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block bg-blue-700 hover:bg-blue-800 text-white font-semibold text-sm px-5 py-2 rounded-md w-fit"
>
  Book now with Accor
</a>

          </div>
        </div>
      </div>
    </section>
  );
};

export default SydneyDealCard;
