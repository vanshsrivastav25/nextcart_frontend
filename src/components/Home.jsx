import React from 'react';
import { useTheme } from './contexts/ThemeContext';
import Layout from './common/Layout';
import Hero from './common/Hero';

const Home = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <>
      <Layout>
        <Hero />
      </Layout>
    </>
  );
};

export default Home;