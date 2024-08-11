import { Navbar } from "@/components/Navbar";
import { Hero } from "@/components/Hero";
import { Intro } from "@/components/Intro";
import { About } from "@/components/About";
import { Portfolio } from "@/components/Portfolio";

const Page = () => {
  return (
    <>
      <Navbar />
      <Hero />
      <Intro />
      <About />
      <Portfolio />
    </>
  );
};

export default Page;