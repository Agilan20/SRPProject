import { Fragment } from 'react'
import { Link } from 'react-router-dom'
import Navbar from './Navbar'
import Hero from './Hero'
import Analytics from './Analytics'
import Cards from "./Cards"
import Newsletter from './Newsletter'
import Footer from './Footer'

export default function Home() {
  return (
    <>
        <Navbar />
        <Hero />
        <Analytics />
        <Newsletter />
        {/* <Cards /> */}
        <Footer />

    </>
  )
}