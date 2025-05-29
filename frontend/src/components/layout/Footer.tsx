import { CalendarDays, Mail, Phone, MapPin, Github, Twitter, Instagram } from 'lucide-react';

export const Footer = () => {
  return (
    <footer className="bg-gray-100 dark:bg-gray-900 pt-12 pb-8 border-t border-gray-200 dark:border-gray-800">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <div className="flex items-center gap-2 mb-4">
              <CalendarDays className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              <span className="text-xl font-bold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">
                Sydney Events
              </span>
            </div>
            <p className="text-gray-600 dark:text-gray-400 mb-4">
              Discover the best events happening in Sydney. From festivals to exhibitions, we've got you covered.
            </p>
            <div className="flex space-x-4">
              <a href="#" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                <Twitter className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-gray-500 hover:text-blue-500 dark:text-gray-400 dark:hover:text-blue-400">
                <Github className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Quick Links</h3>
            <ul className="space-y-2">
              {['Home', 'Events', 'Categories', 'About Us', 'Contact'].map(item => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Categories</h3>
            <ul className="space-y-2">
              {['Business', 'Community', 'Exhibitions', 'Festivals', 'Food', 'Performance', 'Sport'].map(item => (
                <li key={item}>
                  <a href="#" className="text-gray-600 hover:text-blue-600 dark:text-gray-400 dark:hover:text-blue-400">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start">
                <MapPin className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2 mt-0.5" />
                <span className="text-gray-600 dark:text-gray-400">123 Event Street, Sydney, NSW 2000</span>
              </li>
              <li className="flex items-center">
                <Phone className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">+61 2 1234 5678</span>
              </li>
              <li className="flex items-center">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mr-2" />
                <span className="text-gray-600 dark:text-gray-400">info@sydneyevents.com</span>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-gray-200 dark:border-gray-800 mt-8 pt-8 text-center">
          <p className="text-gray-600 dark:text-gray-400 text-sm">
            &copy; {new Date().getFullYear()} Sydney Events. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};