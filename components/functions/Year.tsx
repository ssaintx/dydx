"use client"

import { useState } from "react";

export const Year = () => {
    const [year, setYear] = useState(new Date().getFullYear());

    return year;
};