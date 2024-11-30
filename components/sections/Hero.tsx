import { Button } from "../ui/button";
import { Graph } from "../shared/Graph";

export const Hero = () => {
    return (
        <section
            id="hero"
            className="flex flex-col justify-center items-center h-screen"
        >

            {/* HERO TEXT */}
            <div className="flex flex-col gap-2">
                <h1 className="text-3xl md:text-5xl xm:text-7xl font-bold text-center bg-gradient-to-b from-neutral-50 to-neutral-800 bg-clip-text text-transparent">We offer solutions</h1>
                <p className="text-center text-lg text-neutral-400">Nothing is impossible.</p>
            </div>

            {/* CTA BUTTONS */}
            <div className="flex gap-2 mt-8">
                <Button className="button-solid">Leave request</Button>
                <Button className="button-transparent">Leave request</Button>
            </div>

            {/* BACKGROUND GRAPH */}
            <Graph />

            {/* DESCRIPTIVE BLOCK */}
            
        </section>
    );
};