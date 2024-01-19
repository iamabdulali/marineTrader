
import React from 'react';
import Header from '../../components/Header/Header';
import Banner from '../../components/Banner/banner'
import Spotlight from '../../components/Spotlight/spotlight'
import Services from '../../components/Services/services'
import Footer from '../../components/Footer/Footer';
const HomePage = () => {
  return (
    <div className="homepage">
      
      <Header />
      
      <Banner/>

      <Spotlight/>

      <Services/>
      

    </div>
  );
};

export default HomePage;