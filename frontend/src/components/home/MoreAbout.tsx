import React from "react";

const MoreAboutSydney: React.FC = () => {
  return (
    <section className="py-12 bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <div className="max-w-screen-xl mx-auto px-6 md:px-10">
        <h2 className="text-2xl font-bold mb-6 text-center md:text-left">More about Sydney</h2>

        <div className="grid md:grid-cols-2 gap-8 text-base">
          {/* Left Column */}
          <div className="space-y-4">
            <p>
              Wondering where to stay in Sydney? Then explore the accommodation
              options on the website. You can make reservations as well. Getting
              around is easy on{" "}
              <a href="#" className="text-blue-600 dark:text-blue-400 underline">
                public transport
              </a>
              . Ferries and{" "}
              <a href="#" className="text-blue-600 dark:text-blue-400 underline">
                harbour cruises
              </a>{" "}
              are a memorable way to experience the beauty of one of the world’s
              great natural harbours.
            </p>
            <p>
              Hop on a ferry at{" "}
              <a href="#" className="text-blue-600 dark:text-blue-400 underline">
                Circular Quay
              </a>{" "}
              for{" "}
              <a href="#" className="text-blue-600 dark:text-blue-400 underline">
                Taronga Zoo
              </a>
              , Manly or{" "}
              <a href="#" className="text-blue-600 dark:text-blue-400 underline">
                Watsons Bay
              </a>
              . You can also take a ferry to intriguing Sydney Harbour islands and
              Parramatta for delicious food and colonial heritage. Or jump aboard a{" "}
              <a href="#" className="text-blue-600 dark:text-blue-400 underline">
                Tribal Warrior cruise
              </a>{" "}
              and explore Aboriginal culture, the world’s oldest living culture.
            </p>
            <p>
              Aboriginal people have a long connection with Sydney, dating back at
              least 50,000 years before the First Fleet arrived in 1788.
            </p>
          </div>

          {/* Right Column */}
          <div className="space-y-4 border-l border-gray-300 dark:border-gray-700 pl-6">
            <p>
              and informative{" "}
              <a href="#" className="text-blue-600 dark:text-blue-400 underline">
                Aboriginal-guided tours
              </a>
              , including in{" "}
              <a href="#" className="text-blue-600 dark:text-blue-400 underline">
                national parks
              </a>{" "}
              where you can see ancient indigenous ochre hand-paintings and rock
              engravings.
            </p>
            <p>The following pages will also help you plan your holidays, short breaks and weekend escapes:</p>
            <ul className="space-y-2">
              {[
                "Places to stay",
                "Things to do",
                "Places to visit",
                "Events in Sydney",
                "Deals and packages",
                "Tours in Sydney",
                "Hire cars, kayaks and other things",
              ].map((item, index) => (
                <li key={index} className="flex items-center text-blue-600 dark:text-blue-400">
                  <span className="mr-2">❯</span>
                  <a href="#" className="hover:underline">{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
};

export default MoreAboutSydney;
