import React, {useState} from 'react';
import Sidebar from '../components/molecules/Sidebar';
import Navbar from '../components/molecules/Navbar';
import InfoSection from '../components/molecules/InfoSection';
import {
  homeObjOne
} from '../components/molecules/InfoSection/Data';
import Services from '../components/molecules/Services';
import Footer from '../components/molecules/Footer';

function Home() {
  const [isOpen, setIsOpen] = useState(false);

  const toggle = () => {
    setIsOpen(!isOpen);
  };

  return (
    <>
      <Sidebar isOpen={isOpen} toggle={toggle} />
      <Navbar toggle={toggle} />
      <InfoSection {...homeObjOne} />
      <Services />
      <Footer />
    </>
  );
}

export default Home;
