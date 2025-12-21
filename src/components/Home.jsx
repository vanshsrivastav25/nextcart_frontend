import React from 'react';
import { useTheme } from './contexts/ThemeContext';
import Layout from './common/Layout';
import Hero from './common/Hero';
import LatestProduct from './common/LatestProduct';
import FeaturedProduct from './common/FeaturedProduct';

const Home = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <>
      <Layout>
        <Hero />
        <LatestProduct />
        <FeaturedProduct />
      </Layout>
    </>
  );
};

export default Home;