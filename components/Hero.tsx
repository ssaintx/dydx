import { products } from "@/constants";
import { HeroParallax } from "./ui/hero-parallax";

export const Hero = () => {
  return (
    <section id="#home">
      <HeroParallax products={products} />
    </section>
  );
};