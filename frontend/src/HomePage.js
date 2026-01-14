// HomePage.jsx
import React from 'react';
import Hsec from './components/Hsec';
import Abtus from './components/Abtus';
import Dsec from './components/Dsec';
import Docsec from './components/Docsec';
import Choose from './components/Choose';
import Ptest from './components/Ptest';
import Loc from './components/Loc';
import Hblogs from './components/Hblogs';
import Footer from './components/Footer';
const HomePage = () => (
  <>
  <div className=' h-screen'>
    <Hsec />
    <Abtus />
    <Choose />
    <Dsec />
    <Docsec />
    <Ptest />
    <Loc />
    <Hblogs />
    <Footer />
    </div>
  </>
);

export default HomePage;
