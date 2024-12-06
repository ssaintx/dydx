"use client"

import React, { useEffect, useRef, useMemo } from "react";
import {
    select,
    scaleLinear,
    line,
    curveBasis,
    range,
    axisBottom,
    axisLeft,
    easeCubic,
} from "d3";

const Graph = () => {
    const graphRef = useRef<HTMLDivElement>(null);

    // Memoized data range and functions
    const memoizedData = useMemo(() => range(-Math.PI, Math.PI, 0.01), []);
    const memoizedFunctions = useMemo(
        () => [
            (d: number) => d,
            (d: number) => d * d,
            (d: number) => d * d * d,
            (d: number) => Math.sin(d),
            (d: number) => Math.cos(d),
            (d: number) => Math.tan(d / 2), // New unique function
            (d: number) => Math.abs(Math.sin(d) * Math.cos(d)), // New unique function
            (d: number) => Math.sqrt(Math.abs(d)), // New unique function
            (d: number) => Math.log(Math.abs(d) + 1), // New unique function
        ],
        []
    );

    useEffect(() => {
        const getRandomUniqueFunctions = () => {
            const indices = [...Array(memoizedFunctions.length).keys()];
            for (let i = indices.length - 1; i > 0; i--) {
                const j = Math.floor(Math.random() * (i + 1));
                [indices[i], indices[j]] = [indices[j], indices[i]];
            }
            return indices.slice(0, 3); // Return three unique indices
        };

        let currentFunctionIndices = getRandomUniqueFunctions(); // Initial unique functions

        const renderGraph = () => {
            const containerWidth = graphRef.current?.clientWidth || 800;
            const containerHeight = graphRef.current?.clientHeight || 400;
            const margin = 20;

            // Clear existing graph on resize
            select(graphRef.current).selectAll("*").remove();

            const width = containerWidth;
            const height = containerHeight;

            // Create SVG
            const svg = select(graphRef.current)
                .append("svg")
                .attr("width", width)
                .attr("height", height)
                .style("background", "transparent")
                .style("opacity", 0.5)
                .style("overflow", "hidden");

            // Define scales
            const x = scaleLinear().domain([-Math.PI, Math.PI]).range([margin, width - margin]);
            const y = scaleLinear().domain([-10, 10]).range([height - margin, margin]);

            // Create line generator
            const lineGenerator = line<number>()
                .x((d) => x(d))
                .curve(curveBasis);

            // Add X and Y axes
            svg
                .append("g")
                .attr("transform", `translate(0,${y(0)})`)
                .call(axisBottom(x).ticks(5).tickSize(-height))
                .selectAll("line, path")
                .attr("stroke", "white")
                .attr("opacity", 0.2);

            svg
                .append("g")
                .attr("transform", `translate(${x(0)},0)`)
                .call(axisLeft(y).ticks(5).tickSize(-width))
                .selectAll("line, path")
                .attr("stroke", "white")
                .attr("opacity", 0.2);

            // Append paths for multiple graphs
            const paths = currentFunctionIndices.map((index, i) =>
                svg
                    .append("path")
                    .datum(memoizedData)
                    .attr("fill", "none")
                    .attr("stroke", ["#F43F5E", "#EC4899", "#C026D3"][i]) // Updated colors
                    .attr("stroke-width", 2)
                    .attr(
                        "d",
                        lineGenerator.y((d) => y(memoizedFunctions[index](d)))
                    )
                    .attr("stroke-dasharray", function () {
                        return this.getTotalLength();
                    })
                    .attr("stroke-dashoffset", function () {
                        return this.getTotalLength();
                    })
            );

            // Animation function
            const animate = () => {
                paths.forEach((path, i) => {
                    path.transition()
                        .duration(6000 + i * 200) // Add delay between animations
                        .ease(easeCubic)
                        .attr("stroke-dashoffset", 0)
                        .transition()
                        .duration(4000 + i * 300)
                        .ease(easeCubic)
                        .attr("stroke-dashoffset", function () {
                            return this.getTotalLength();
                        })
                        .on("end", () => {
                            // Move to the next set of unique functions
                            currentFunctionIndices = getRandomUniqueFunctions();
                            path.datum(memoizedData)
                                .attr(
                                    "d",
                                    lineGenerator.y((d) =>
                                        y(memoizedFunctions[currentFunctionIndices[i]](d))
                                    )
                                )
                                .attr("stroke-dasharray", function () {
                                    return this.getTotalLength();
                                })
                                .attr("stroke-dashoffset", function () {
                                    return this.getTotalLength();
                                });
                            animate(); // Recursive animation loop
                        });
                });
            };

            animate();
        };

        const resizeObserver = new ResizeObserver(() => {
            renderGraph();
        });

        renderGraph();
        resizeObserver.observe(graphRef.current as HTMLDivElement);

        return () => {
            resizeObserver.disconnect();
            select(graphRef.current).selectAll("*").remove(); // Cleanup
        };
    }, [memoizedData, memoizedFunctions]);

    return (
        <div
            ref={graphRef}
            className="absolute inset-0 w-full h-full z-[-1] blur-[1px]"
        />
    );
};

export default React.memo(Graph);