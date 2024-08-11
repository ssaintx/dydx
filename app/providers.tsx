"use client"

import { ThemeProvider } from "next-themes";
import { ProviderProps } from "@/lib/props";

export const Providers = ({ children }: ProviderProps) => {
    return (
        <ThemeProvider attribute="class" defaultTheme="system" enableSystem>
            {children}
        </ThemeProvider>);
};