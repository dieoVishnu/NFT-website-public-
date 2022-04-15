import React, { useState } from 'react';
import Header from '../components/header/Header';
import dataSlider from '../assets/fake-data/dataSlider';
import dataLiveAution from '../assets/fake-data/dataLiveAution'
import dataCategory from '../assets/fake-data/dataCategory'
import Footer from '../components/footer/Footer';
import Slider03 from '../components/slider/Slider03';
import Gallery from '../components/layouts/home/Gallery';
import Rareitems from '../components/layouts/home/Rareitems';
import { PurchaseOpensea } from '../components/layouts/home/PurchaseOpensea';
import Slider01 from '../components/slider/Slider01';
import LiveAution from '../components/layouts/home02/LiveAution';
import LatestCollections from '../components/layouts/home/LatestCollections';
import dataCollections from '../assets/fake-data/dataCollections'
import BestSeller from '../components/layouts/home/BestSeller';
import dataBestSeller from '../assets/fake-data/dataBestSeller'
import TrendingCollections from '../components/layouts/home/TrendingCollections';
import dataTrendingCollections from '../assets/fake-data/dataTrendingCollections'
import Category from '../components/layouts/home/Category';
import { Newsletters } from '../components/layouts/home/Newsletters';
import Test from '../components/test/Test';
import SelectProduct from '../components/layouts/my/SelectProduct';

const Home01 = () => {

  const [active, setActive] = useState(false)
  const activeData = {setActive:setActive}

  return <div className='home-1'>
    <Header />
    {/* <Slider01 data={dataSlider} /> */}
    <Slider03 data={dataSlider} activeData={active}/>
    {/* <LiveAution data={dataLiveAution} /> */}
    <SelectProduct data={activeData}/>
    {/* <Gallery data={dataLiveAution} /> */}
    {/* <LatestCollections data={dataCollections} /> */}
    {/* <BestSeller data={dataBestSeller} /> */}
    {/* <TrendingCollections data={dataTrendingCollections} /> */}
    {/* <Category data={dataCategory} /> */}
    {/* <Rareitems data={dataCategory} /> */}
    {/* <Newsletters /> */}
    {/* <PurchaseOpensea /> */}
    <Footer />
  </div>;
};

export default Home01;
