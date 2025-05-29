import React from 'react';
import { Header } from '../components/layout/Header';
import { Footer } from '../components/layout/Footer';
import { ExploreSection } from '../components/home/ExploreSection';

export const ExplorePage = () => {
  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100">
      <Header />
      <main className="pt-16">
        <ExploreSection />
      </main>
      <Footer />
    </div>
  );
};