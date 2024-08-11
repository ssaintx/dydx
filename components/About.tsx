"use client"

import { useTranslations } from "next-intl";
import { BentoGrid, BentoGridItem } from "./ui/bento-grid";
import { VelocityScroll } from "./magicui/scroll-based-velocity";

import NumberTicker from "./magicui/number-ticker";

export const About = () => {
    const t = useTranslations("About");

    const aboutContent = [
        {
            id: 1,
            title: t("Title1"),
            description: t("Description1"),
            header:
                <div className="flex-center w-full h-full text-9xl font-extrabold">
                    <NumberTicker value={50} />+
                </div>,
            className: "md:col-span-2",
            icon: "",
        },
        {
            id: 2,
            title: t("Title2"),
            description: t("Description2"),
            header:
                <div className="flex-center w-full h-full text-7xl font-extrabold">
                    <NumberTicker value={1} />+
                </div>,
            className: "md:col-span-1",
            icon: "",
        },
        {
            id: 3,
            title: t("Title3"),
            description: t("Description3"),
            header: <div></div>,
            className: "md:col-span-1",
            icon: "",
        },
        {
            id: 4,
            title: t("Title4"),
            description: t("Description4"),
            header: <div></div>,
            className: "md:col-span-2",
            icon: "",
        },
    ];

    return (
        <section id="about" className="flex flex-col justify-center items-center gap-8 pb-4">
            <VelocityScroll
                text={t("Header")}
                amount={2}
                default_velocity={3}
                className="text-zinc-950 dark:text-zinc-50 font-display text-center text-4xl font-bold tracking-[-0.02em] drop-shadow-sm md:text-7xl md:leading-[5rem]"
            />
            <BentoGrid className="max-w-4xl mx-auto md:auto-rows-[20rem] px-4">
                {aboutContent.map(({ id, title, description, header, className, icon }) => (
                    <BentoGridItem
                        key={id}
                        title={title}
                        description={description}
                        header={header}
                        className={`${className} bg-zinc-200 dark:bg-zinc-900 rounded-[30px] border-none`}
                        icon={icon}
                    />
                ))}
            </BentoGrid>

        </section>
    );
};
