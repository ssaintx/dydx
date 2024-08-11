"use client"

import { useTranslations } from "next-intl";
import { TracingBeam } from "./ui/tracing-beam";
import { advantages, analytics, automation, chart, chartGrow, chartUp, customer, marquee, power } from "@/public";

import Image from "next/image";
import Marquee from "react-fast-marquee";
import { Cover } from "./ui/cover";

export const Intro = () => {
  const t = useTranslations("Intro");

  const introContent = [
    {
      content: (
        <div className="card pb-10">
          <div className="pt-8 pl-8 pr-8">
            <h1 className="text-xl mb-4 md:text-2xl font-semibold">{t("Header1")}</h1>
            <ul className="ml-0 sm:ml-3 text-sm sm:text-[16px] font-extralight text-zinc-800 dark:text-zinc-200">
              <div className="flex flex-row gap-3 items-center mb-3"><Image src={chart} alt="chart" width={24} height={24} className="dark:invert select-none" /><li>{t("Text1")}</li></div>
              <div className="flex flex-row gap-3 items-center mb-3"><Image src={chartGrow} alt="chart" width={24} height={24} className="dark:invert select-none" /><li>{t("Text2")}</li></div>
              <div className="flex flex-row gap-3 items-center mb-3"><Image src={customer} alt="chart" width={24} height={24} className="dark:invert select-none" /><li>{t("Text3")}</li></div>
              <div className="flex flex-row gap-3 items-center mb-3"><Image src={advantages} alt="chart" width={24} height={24} className="dark:invert select-none" /><li>{t("Text4")}</li></div>
            </ul>
          </div>
          <Marquee
            className="w-full mt-6 bg-yandex"
            autoFill={true}
          >
            <div className="flex flex-row items-center justify-center gap-4 text-zinc-950 font-extrabold text-2xl">
              {t("Marquee1")}
              <Image src={marquee} alt="marquee" className="mr-4" />
            </div>
          </Marquee>
        </div>
      ),
    },
    {
      content: (
        <div className="card pb-10">
          <div className="pt-8 pl-8 pr-8">
            <h1 className="text-xl mb-4 md:text-2xl font-semibold">{t("Header2")}</h1>
            <ul className="ml-0 sm:ml-3 text-sm sm:text-[16px] font-extralight text-zinc-800 dark:text-zinc-200">
              <div className="flex flex-row gap-3 items-center mb-3"><Image src={chartUp} alt="chart" width={24} height={24} className="dark:invert select-none" /><li>{t("Text5")}</li></div>
              <div className="flex flex-row gap-3 items-center mb-3"><Image src={power} alt="chart" width={24} height={24} className="dark:invert select-none" /><li>{t("Text6")}</li></div>
              <div className="flex flex-row gap-3 items-center mb-3"><Image src={automation} alt="chart" width={24} height={24} className="dark:invert select-none" /><li>{t("Text7")}</li></div>
              <div className="flex flex-row gap-3 items-center mb-3"><Image src={analytics} alt="chart" width={24} height={24} className="dark:invert select-none" /><li>{t("Text8")}</li></div>
            </ul>
          </div>
          <Marquee
            className="w-full mt-6 bg-yandex"
            autoFill={true}
          >
            <div className="flex flex-row items-center justify-center gap-4 text-zinc-950 font-extrabold text-2xl">
              {t("Marquee2")}
              <Image src={marquee} alt="marquee" className="mr-4" />
            </div>
          </Marquee>
        </div>
      ),
    },
  ];

  return (
    <section className="flex flex-col items-center justify-center pt-6 pb-12 h-max">
      <h1 id="header" className="text-3xl md:text-5xl font-bold mb-4">
        <Cover>
          {t("Why")}
        </Cover>
      </h1>
      <TracingBeam className="px-6 h-full">
        <div className="max-w-2xl mx-auto pl-4 antialiased pt-4 relative">
          {introContent.map((item, index) => (
            <div key={`content-${index}`} className="mb-10">
              <div className="text-sm sm:text-lg font-medium">
                {item.content}
              </div>
            </div>
          ))}
        </div>
      </TracingBeam>
    </section>
  );
};