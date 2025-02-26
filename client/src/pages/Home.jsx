import React from 'react'
import Hero from '../components/homePage/Hero'
import About from '../components/homePage/About'
import Features from '../components/homePage/Features'
import CallToAction from '../components/homePage/CallToAction'

const Home = () => {
  return (
    <div>
      <Hero />
      <About />
      <Features />
      <CallToAction />
    </div>
  )
}

export default Home