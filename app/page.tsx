import { Navbar } from "@/components/shared/Navbar";
import { Hero } from "@/components/sections/Hero";
import { About } from "@/components/sections/About";

const Homepage = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <About />
    </>
  )
}

export default Homepage;