"use client"

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { Locale } from "@/localization/config";
import { setUserLocale } from "@/localization/locale";
import { LanguageSwitcherSelectProps } from "@/lib/props";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

export const LanguageSwitcherSelect = ({ defaultValue, items }: LanguageSwitcherSelectProps) => {
    const t = useTranslations("Languages");
    const [isPending, startTransition] = useTransition();

    const onChange = (value: string) => {
        const locale = value as Locale;
        startTransition(() => {
            localStorage.setItem("locale", locale);
            setUserLocale(locale);
        });
    };

    return (
        <Select onValueChange={onChange} defaultValue={defaultValue}>
            <SelectTrigger className="w-auto sm:w-[150px] dark-light-secondary bg-zinc-200 border-none">
                <SelectValue placeholder={t("Title")} />
            </SelectTrigger>
            <SelectContent className="dark-light-secondary bg-zinc-200 border-none">
                <SelectGroup>
                    {items.map((item) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};