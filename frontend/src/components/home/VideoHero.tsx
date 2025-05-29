import { motion } from 'framer-motion';
import videoSrc from '../assets/video.mp4'; // Import the video file

export const VideoHero = () => {
  return (
    <section className="relative h-screen w-full overflow-hidden">
      <video
        src={videoSrc} // Use the imported video source
        className="absolute inset-0 w-full h-full object-cover"
        autoPlay
        loop
        muted
        playsInline // Important for iOS and some other mobile browsers
        preload="auto" // Helps in buffering the video beforehand
        poster="/path/to/your/poster-image.jpg" // Optional: Show an image while video loads
      />
      
      <div className="absolute inset-0 bg-black/30" />
      
      <div className="relative z-10 flex flex-col items-center justify-center h-full text-center text-white px-4">
        <motion.h1 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="text-5xl md:text-7xl font-bold mb-6 leading-tight tracking-tight"
        >
          Discover Sydney's Vibrant Events
        </motion.h1>
        <motion.p 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          className="text-xl md:text-2xl mb-8 max-w-2xl"
        >
          From iconic festivals to hidden gems, explore the best of what's happening in the city.
        </motion.p>
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
        >
        
        </motion.div>
      </div>
    </section>
  );
};