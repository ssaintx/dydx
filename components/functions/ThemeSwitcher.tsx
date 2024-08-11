"use client"

import { useTheme } from "next-themes";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { Select, SelectContent, SelectGroup, SelectItem, SelectLabel, SelectTrigger, SelectValue } from "../ui/select";

export const ThemeSwitcher = () => {
    const t = useTranslations("Themes");
    const [mounted, setMounted] = useState(false);
    const { theme, setTheme, systemTheme } = useTheme();
    const currentTheme = theme || systemTheme;

    useEffect(() => setMounted(true), []);

    if (!mounted) return null;

    const handleThemeChange = (value: string) => {
        setTheme(value);
    };

    return (
        <Select value={theme} onValueChange={handleThemeChange}>
            <SelectTrigger className="w-auto sm:w-[150px] dark-light-secondary bg-zinc-200 border-none">
                <SelectValue placeholder={t("Title")} />
            </SelectTrigger>
            <SelectContent className="dark-light-secondary bg-zinc-200 border-none">
                <SelectGroup>
                    <SelectLabel>{t("Label")}</SelectLabel>
                    <SelectItem value="dark">{t("Dark")}</SelectItem>
                    <SelectItem value="light">{t("Light")}</SelectItem>
                    <SelectItem value="system">{t("System")}</SelectItem>
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};