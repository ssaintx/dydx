import Image from "next/image"

import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet"
import { menu } from "@/public"
import { Year } from "./functions/Year"
import { useTranslations } from "next-intl"
import { Button } from "@/components/ui/button"
import { ThemeSwitcher } from "./functions/ThemeSwitcher"
import { LanguageSwitcher } from "./functions/LanguageSwitcher"

export const Menu = () => {
    const t = useTranslations("Menu");

    const links = [
        {
            id: 1,
            title: t("Home"),
            link: "#home",
        },
        {
            id: 2,
            title: t("About"),
            link: "#about",
        },
        {
            id: 3,
            title: t("Portfolio"),
            link: "#portfolio",
        },
        {
            id: 4,
            title: t("Services"),
            link: "#services",
        },
        {
            id: 5,
            title: t("Contacts"),
            link: "#contacts",
        },
    ];

    return (
        <Sheet>
            <SheetTrigger asChild>
                <Button variant="outline" className="bg-transparent border-none hover:bg-none">
                    <Image
                        src={menu}
                        alt="menu"
                        width={30}
                        height={30}
                        className="dark:invert select-none"
                    />
                </Button>
            </SheetTrigger>
            <SheetContent className="flex flex-col dark-light border-none" aria-describedby="sheet-description">
                <SheetHeader>
                    <SheetTitle>{t("Title")}</SheetTitle>
                </SheetHeader>
                <div className="flex flex-col py-4">
                    {links.map(({ id, title, link }) => (
                        <ul key={id} className="flex flex-row gap-2 my-2">
                            <a href={link} className="hover:text-zinc-700 dark:hover:text-zinc-300 border-b-[1px] py-2 border-zinc-200 dark:border-zinc-800 w-full">
                                <li>
                                    {title}
                                </li>
                            </a>
                        </ul>
                    ))}
                </div>
                <div className="flex flex-col sm:flex-row gap-1">
                    <ThemeSwitcher />
                    <LanguageSwitcher />
                </div>
                <SheetFooter className="w-full h-full flex flex-row items-end">
                        <span className="text-xs text-zinc-500 flex flex-row gap-1">{t("Footer")} © <Year /> dydx</span>
                </SheetFooter>
            </SheetContent>
        </Sheet>
    );
};