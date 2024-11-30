"use client"

import { useEffect, useRef, useMemo } from "react";
import {
    select,
    scaleLinear,
    line,
    curveLinear,
    range,
    axisBottom,
    axisLeft,
    easeCubic,
} from "d3";

export const Graph = () => {
    const graphRef = useRef<HTMLDivElement>(null);

    // Memoized range data and functions list
    const memoizedData = useMemo(() => {
        return range(-Math.PI, Math.PI, 0.01);
    }, []);

    const memoizedFunctions = useMemo(
        () => [
            (d: number) => d,
            (d: number) => d * d,
            (d: number) => d * d * d,
            (d: number) => Math.sin(d),
            (d: number) => Math.cos(d),
            (d: number) => Math.asin(Math.sin(d)), // Safe: sin(d) is always in [-1, 1]
            (d: number) => Math.acos(Math.cos(d)), // Safe: cos(d) is always in [-1, 1]
            (d: number) => (d === 0 ? 0 : 1 / d), // Prevent division by zero
        ],
        []
    );

    useEffect(() => {
        let currentFunctionIndex = 0; // Track current function

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
                .y((d) => y(memoizedFunctions[currentFunctionIndex](d)))
                .curve(curveLinear);

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

            // Append path
            const path = svg
                .append("path")
                .datum(memoizedData)
                .attr("fill", "none")
                .attr("stroke", "#F43F5E")
                .attr("stroke-width", 2)
                .attr("d", lineGenerator)
                .attr("stroke-dasharray", function () {
                    return this.getTotalLength();
                })
                .attr("stroke-dashoffset", function () {
                    return this.getTotalLength();
                });

            // Animation
            const animate = () => {
                path
                    .transition()
                    .duration(6000) // Forward animation
                    .ease(easeCubic)
                    .attr("stroke-dashoffset", 0)
                    .transition()
                    .duration(4000) // Backward animation
                    .ease(easeCubic)
                    .attr("stroke-dashoffset", function () {
                        return this.getTotalLength();
                    })
                    .on("end", () => {
                        // Move to the next function
                        currentFunctionIndex = (currentFunctionIndex + 1) % memoizedFunctions.length;
                        path
                            .datum(memoizedData)
                            .attr(
                                "d",
                                lineGenerator.y((d) => y(memoizedFunctions[currentFunctionIndex](d)))
                            )
                            .attr("stroke-dasharray", function () {
                                return this.getTotalLength();
                            })
                            .attr("stroke-dashoffset", function () {
                                return this.getTotalLength();
                            });
                        animate(); // Loop animation
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

    return <div ref={graphRef} className="absolute inset-0 w-full h-full z-[-1] blur-[2px]"></div>;
};