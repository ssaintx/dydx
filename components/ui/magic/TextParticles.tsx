"use client"

import { throttle } from 'lodash';
import React, { useEffect, useRef, useMemo } from "react";

interface TextParticlesProps {
    texts: string[];
    className?: string;
    backgroundColor?: string;
    particleConfig?: Partial<{
        count: number;
        size: number;
        mouseRadius: number;
        forceMultiplier: number;
        returnSpeed: number;
        velocityDamping: number;
        colorMultiplier: number;
        saturationMultiplier: number;
        textChangeInterval: number;
        fontSize: number;
        fontFamily: string;
        fontWeight: number;
    }>;
}

const TextParticles: React.FC<TextParticlesProps> = ({
    texts,
    className,
    backgroundColor = "inherit",
    particleConfig = {},
}) => {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    const config = useMemo(() => ({
        particleCount: 1000,
        mouseRadius: 0.1,
        particleSize: 2,
        forceMultiplier: 0.001,
        returnSpeed: 0.005,
        velocityDamping: 0.95,
        colorMultiplier: 40000,
        saturationMultiplier: 1000,
        textChangeInterval: 10000,
        rotationForceMultiplier: 0,
        fontSize: Math.min(window.innerWidth / 12, Math.max(40, window.innerHeight / 6)), // Adjusted to work with smaller heights
        fontFamily: "Monospace",
        fontWeight: 600,
        ...particleConfig,
    }), [particleConfig]);

    useEffect(() => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const gl = canvas.getContext("webgl");
        if (!gl) {
            console.error("WebGL not supported");
            return;
        }

        // Responsive canvas sizing
        canvas.width = canvas.offsetWidth;
        canvas.height = canvas.offsetHeight;
        gl.viewport(0, 0, canvas.width, canvas.height);

        let currentTextIndex = 0;
        let nextTextTimeout: ReturnType<typeof setTimeout>;
        let textCoordinates: { x: number; y: number }[] = [];
        let textCoordinatesCache: { [text: string]: { x: number; y: number }[] } = {};

        const mouse = {
            x: -500,
            y: -500,
            radius: config.mouseRadius,
        };

        const particles = Array.from({ length: config.particleCount }, () => ({
            x: 0,
            y: 0,
            baseX: 0,
            baseY: 0,
            vx: 0,
            vy: 0,
        }));

        // Shader sources (same as before)
        const vertexShaderSource = `
            attribute vec2 a_position;
            attribute float a_hue;
            attribute float a_saturation;
            varying float v_hue;
            varying float v_saturation;
            void main() {
                gl_PointSize = ${config.particleSize.toFixed(1)};
                gl_Position = vec4(a_position, 0.0, 1.0);
                v_hue = a_hue;
                v_saturation = a_saturation;
            }
        `;

        const fragmentShaderSource = `
            precision mediump float;
            varying float v_hue;
            varying float v_saturation;
            void main() {
                float c = v_hue * 6.0;
                float x = 1.0 - abs(mod(c, 2.0) - 1.0);
                vec3 color;
                if (c < 1.0) color = vec3(1.0, x, 0.0);
                else if (c < 2.0) color = vec3(x, 1.0, 0.0);
                else if (c < 3.0) color = vec3(0.0, 1.0, x);
                else if (c < 4.0) color = vec3(0.0, x, 1.0);
                else if (c < 5.0) color = vec3(x, 0.0, 1.0);
                else color = vec3(1.0, 0.0, x);
                vec3 finalColor = mix(vec3(1.0), color, v_saturation);
                gl_FragColor = vec4(finalColor, 1.0);
            }
        `;

        // Shader creation functions (same as before)
        const createShader = (type: number, source: string): WebGLShader | null => {
            const shader = gl.createShader(type);
            if (!shader) return null;
            gl.shaderSource(shader, source);
            gl.compileShader(shader);
            if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
                console.error(gl.getShaderInfoLog(shader));
                gl.deleteShader(shader);
                return null;
            }
            return shader;
        };

        const createProgram = (
            vertexShader: WebGLShader,
            fragmentShader: WebGLShader
        ): WebGLProgram | null => {
            const program = gl.createProgram();
            if (!program) return null;
            gl.attachShader(program, vertexShader);
            gl.attachShader(program, fragmentShader);
            gl.linkProgram(program);
            if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
                console.error(gl.getProgramInfoLog(program));
                gl.deleteProgram(program);
                return null;
            }
            return program;
        };

        const vertexShader = createShader(gl.VERTEX_SHADER, vertexShaderSource);
        const fragmentShader = createShader(gl.FRAGMENT_SHADER, fragmentShaderSource);
        if (!vertexShader || !fragmentShader) return;

        const program = createProgram(vertexShader, fragmentShader);
        if (!program) return;

        const positionAttributeLocation = gl.getAttribLocation(program, "a_position");
        const hueAttributeLocation = gl.getAttribLocation(program, "a_hue");
        const saturationAttributeLocation = gl.getAttribLocation(
            program,
            "a_saturation"
        );

        const positionBuffer = gl.createBuffer();
        const hueBuffer = gl.createBuffer();
        const saturationBuffer = gl.createBuffer();

        const positions = new Float32Array(config.particleCount * 2);
        const hues = new Float32Array(config.particleCount);
        const saturations = new Float32Array(config.particleCount);

        const getTextCoordinates = (text: string) => {
            // Check if coordinates are already cached
            if (textCoordinatesCache[text]) {
                return textCoordinatesCache[text];
            }
            const ctx = document.createElement("canvas").getContext("2d");
            if (!ctx) return [];

            // Adjust canvas size to current canvas dimensions
            ctx.canvas.width = canvas.width;
            ctx.canvas.height = canvas.height;

            // Dynamically adjust font size based on canvas height
            const fontSize = Math.max(20, Math.min(canvas.height / 3, canvas.width / 5));

            ctx.font = `${config.fontWeight} ${fontSize}px ${config.fontFamily}`;
            ctx.fillStyle = "white";
            ctx.textAlign = "center";
            ctx.textBaseline = "middle";
            ctx.fillText(text, canvas.width / 2, canvas.height / 2);

            const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height).data;
            const coordinates = [];

            // Adjust sampling to work with smaller heights
            const samplingStep = Math.max(2, Math.floor(canvas.height / 50));

            for (let y = 0; y < canvas.height; y += samplingStep) {
                for (let x = 0; x < canvas.width; x += samplingStep) {
                    const index = (y * canvas.width + x) * 4;
                    if (imageData[index + 3] > 128) {
                        coordinates.push({
                            x: (x / canvas.width) * 2 - 1,
                            y: (y / canvas.height) * -2 + 1,
                        });
                    }
                }
            }
            // Cache the coordinates
            textCoordinatesCache[text] = coordinates;
            return textCoordinatesCache[text];
        };

        const createParticles = () => {
            textCoordinates = getTextCoordinates(texts[currentTextIndex]);
            const particleCount = config.particleCount; // Cache particleCount for loop optimization
            for (let i = 0; i < particleCount; i++) {
                const randomIndex = Math.floor(Math.random() * textCoordinates.length);
                const { x, y } = textCoordinates[randomIndex];
                particles[i].x = particles[i].baseX = x;
                particles[i].y = particles[i].baseY = y;
            }
        };

        const updateParticles = () => {
            for (let i = 0; i < config.particleCount; i++) {
                const particle = particles[i];
                const dx = mouse.x - particle.x;
                const dy = mouse.y - particle.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                const forceDirectionX = dx / distance;
                const forceDirectionY = dy / distance;
                const maxDistance = mouse.radius;
                const force = (maxDistance - distance) / maxDistance;
                const directionX = forceDirectionX * force * config.forceMultiplier;
                const directionY = forceDirectionY * force * config.forceMultiplier;

                if (distance < mouse.radius) {
                    particle.vx -= directionX;
                    particle.vy -= directionY;
                } else {
                    particle.vx += (particle.baseX - particle.x) * config.returnSpeed;
                    particle.vy += (particle.baseY - particle.y) * config.returnSpeed;
                }

                particle.x += particle.vx;
                particle.y += particle.vy;
                particle.vx *= config.velocityDamping;
                particle.vy *= config.velocityDamping;

                const speed = Math.sqrt(
                    particle.vx * particle.vx + particle.vy * particle.vy
                );
                const hue = (speed * config.colorMultiplier) % 360;

                hues[i] = hue / 360;
                saturations[i] = Math.min(speed * config.saturationMultiplier, 1);
                positions[i * 2] = particle.x;
                positions[i * 2 + 1] = particle.y;
            }
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, positions, gl.DYNAMIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, hueBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, hues, gl.DYNAMIC_DRAW);
            gl.bindBuffer(gl.ARRAY_BUFFER, saturationBuffer);
            gl.bufferData(gl.ARRAY_BUFFER, saturations, gl.DYNAMIC_DRAW);
        };

        const animate = () => {
            updateParticles();

            gl.clear(gl.COLOR_BUFFER_BIT);
            gl.bindBuffer(gl.ARRAY_BUFFER, positionBuffer);
            gl.vertexAttribPointer(positionAttributeLocation, 2, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(positionAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, hueBuffer);
            gl.vertexAttribPointer(hueAttributeLocation, 1, gl.FLOAT, false, 0, 0);
            gl.enableVertexAttribArray(hueAttributeLocation);
            gl.bindBuffer(gl.ARRAY_BUFFER, saturationBuffer);
            gl.vertexAttribPointer(
                saturationAttributeLocation,
                1,
                gl.FLOAT,
                false,
                0,
                0
            );
            gl.enableVertexAttribArray(saturationAttributeLocation);
            gl.useProgram(program);
            gl.drawArrays(gl.POINTS, 0, config.particleCount);
            requestAnimationFrame(animate);
        };

        const handleMouseMove = (event: MouseEvent) => {
            mouse.x = (event.clientX / canvas.width) * 2 - 1;
            mouse.y = (event.clientY / canvas.height) * -2 + 1;
        };

        const handleMouseLeave = () => {
            mouse.x = -500;
            mouse.y = -500;
        };

        const resizeCanvas = () => {
            canvas.width = canvas.offsetWidth; // Use canvas offsetWidth for responsiveness
            canvas.height = canvas.offsetHeight; // Use canvas offsetHeight for responsiveness
            gl.viewport(0, 0, canvas.width, canvas.height);
            createParticles();
        };

        const throttledResizeCanvas = throttle(resizeCanvas, 100); // Throttle resize event

        const changeText = () => {
            currentTextIndex = (currentTextIndex + 1) % texts.length;
            const newCoordinates = getTextCoordinates(texts[currentTextIndex]);
            const particleCount = config.particleCount; // Cache particleCount for loop optimization           
            for (let i = 0; i < particleCount; i++) {
                const randomIndex = Math.floor(Math.random() * newCoordinates.length);
                const { x, y } = newCoordinates[randomIndex];
                particles[i].baseX = x;
                particles[i].baseY = y;
            }
            nextTextTimeout = setTimeout(changeText, config.textChangeInterval);
        };

        gl.clearColor(
            parseInt(backgroundColor.slice(1, 3), 16) / 255,
            parseInt(backgroundColor.slice(3, 5), 16) / 255,
            parseInt(backgroundColor.slice(5, 7), 16) / 255,
            1
        );

        createParticles();
        animate();

        canvas.addEventListener("mousemove", handleMouseMove);
        canvas.addEventListener("mouseleave", handleMouseLeave);
        window.addEventListener("resize", throttledResizeCanvas);

        nextTextTimeout = setTimeout(changeText, config.textChangeInterval);

        return () => {
            clearTimeout(nextTextTimeout);
            canvas.removeEventListener("mousemove", handleMouseMove);
            canvas.removeEventListener("mouseleave", handleMouseLeave);
            window.removeEventListener("resize", throttledResizeCanvas);
        };
    }, [config, texts, backgroundColor]);

    return (
        <canvas
            ref={canvasRef}
            className={`${className} flex inset-0`}
        />
    );
};

export default React.memo(TextParticles);