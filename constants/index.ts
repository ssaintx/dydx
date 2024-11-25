import { useTranslations } from "next-intl";

// Navbar
export const navbarItems = () => {
    const t = useTranslations("Navbar");

    const items = [
        {
            title: t("About"),
            href: "/about",
        },
        {
            title: t("Services"),
            href: "/services",
        },
        {
            title: t("Portfolio"),
            href: "/portfolio"
        },
        {
            title: t("Career"),
            href: "/career",
        },
        {
            title: t("Blog"),
            href: "/blog",
        }
    ];

    return items;
};