import { motion } from 'framer-motion';
import { Mail } from 'lucide-react';
import { useState } from 'react'; // Import useState

export const Newsletter = () => {
  const [notification, setNotification] = useState<string | null>(null); // State for notification

  const handleSubscribe = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault(); // Prevent default form submission
    // Simulate a successful subscription
    setNotification('Successfully subscribed!');
    // Optionally clear the notification after a few seconds
    setTimeout(() => {
      setNotification(null);
    }, 3000); // Clear after 3 seconds
  };

  return (
    <section className="relative py-16 min-h-[600px] flex flex-col justify-center"> {/* Added min-h-[600px] and flex utilities */}
      <div 
        className="absolute inset-0 bg-cover bg-center"
        style={{ 
          backgroundImage: 'url(https://www.sydney.com/themes/custom/sydney_dnsw_boostrap/img/newsletter-signup-bg-mobile-Sydney.jpg)',
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </div>
      
      <div className="relative container mx-auto px-4">
        <motion.div 
          className="max-w-2xl mx-auto text-center text-white"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
        >
          <h2 className="text-4xl font-bold mb-4">Discover Somewhere New</h2>
          <p className="text-lg mb-8">
            All the insider news, tips and inspiration you need to plan your next trip, 
            delivered straight to your inbox.
          </p>
          
          <motion.form 
            className="flex flex-col sm:flex-row gap-4 max-w-lg mx-auto"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
            onSubmit={handleSubscribe} // Add onSubmit handler
          >
            <div className="flex-1">
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full px-4 py-3 rounded-lg bg-white/10 border border-white/20 text-white placeholder-white/70 focus:outline-none focus:ring-2 focus:ring-white/50"
              />
            </div>
            <button
              type="submit"
              className="px-6 py-3 bg-white text-gray-900 rounded-lg font-semibold hover:bg-opacity-90 transition-colors flex items-center justify-center"
            >
              <Mail className="w-5 h-5 mr-2" />
              Subscribe
            </button>
          </motion.form>

          {/* Notification */}
          {notification && (
            <motion.div
              className="mt-4 p-3 bg-green-500 text-white rounded-lg text-sm"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
            >
              {notification}
            </motion.div>
          )}

        </motion.div>
      </div>
    </section>
  );
};