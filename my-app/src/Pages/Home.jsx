import React from 'react'
import Navbar from '../Component/Navbar/Navbar'
import Banner from '../Component/Banners/Banner'
import Footer from '../Component/Banners/Footer'

function Home() {
  return (
    <div className='bg-slate-400 m-0'> 
      <Navbar/>
      <Banner/>
      <Footer/>
    </div>
  )
}

export default Home