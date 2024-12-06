"use client"

import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";

import { Parallax, ParallaxLayer } from "@react-spring/parallax";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Parallax pages={2}>
        <ParallaxLayer offset={0} speed={2} factor={1.2}>
          <Hero />
        </ParallaxLayer>
        <ParallaxLayer offset={1} speed={1}>
          <About />
        </ParallaxLayer>
      </Parallax>
    </>
  )
}

export default Homepage;