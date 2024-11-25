"use client"

import { useTransition } from "react";
import { useTranslations } from "next-intl";
import { Locale } from "@/localization/config";
import { GlobeIcon } from "@radix-ui/react-icons";
import { setUserLocale } from "@/localization/locale";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "../ui/select";

interface LanguageSwitcherSelectProps {
    defaultValue: string;
    items: Array<{ value: string; label: string }>;
};

export const LanguageSwitcherSelect = ({ defaultValue, items }: LanguageSwitcherSelectProps) => {
    const t = useTranslations("Functions");
    const [isPending, startTransition] = useTransition();

    const onChange = (value: string) => {
        const locale = value as Locale;
        startTransition(() => {
            localStorage.setItem("locale", locale);
            setUserLocale(locale);
        });
    };

    return (
        <Select onValueChange={onChange} defaultValue={defaultValue} disabled={isPending}>
            <SelectTrigger className="select w-auto">
                <GlobeIcon className="mr-1" />
                <SelectValue placeholder={t("Language")} />
            </SelectTrigger>
            <SelectContent className="select">
                <SelectGroup>
                    {items.map((item: any) => (
                        <SelectItem key={item.value} value={item.value}>
                            {item.label}
                        </SelectItem>
                    ))}
                </SelectGroup>
            </SelectContent>
        </Select>
    );
};