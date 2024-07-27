import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import Banner from '../Component/Banners/Banner'
import Footer from '../Component/Banners/Footer'
import Banner2 from '../Component/Banners/Banner2'

function Home() {
  return (
    <div className='bg-slate-400 m-0 p-0'> 
      <Navbar/>
      <Banner/>
      <Banner2/>
      <Footer/>
    </div>
  )
}

export default Home