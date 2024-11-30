import SfPro from "next/font/local";

import { Metadata } from "next";

import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

import "./globals.css";

const sfPro = SfPro({
  src: [
    {
      path: './fonts/100.woff2',
      weight: '100',
      style: 'normal',
    },
    {
      path: './fonts/100-italic.woff2',
      weight: '100',
      style: 'italic',
    },
    {
      path: './fonts/200.woff2',
      weight: '200',
      style: 'normal',
    },
    {
      path: './fonts/200-italic.woff2',
      weight: '200',
      style: 'italic',
    },
    {
      path: './fonts/300.woff2',
      weight: '300',
      style: 'normal',
    },
    {
      path: './fonts/300-italic.woff2',
      weight: '300',
      style: 'italic',
    },
    {
      path: './fonts/400.woff2',
      weight: '400',
      style: 'normal',
    },
    {
      path: './fonts/400-italic.woff2',
      weight: '400',
      style: 'italic',
    },
    {
      path: './fonts/500.woff2',
      weight: '500',
      style: 'normal',
    },
    {
      path: './fonts/500-italic.woff2',
      weight: '500',
      style: 'italic',
    },
    {
      path: './fonts/600.woff2',
      weight: '600',
      style: 'normal',
    },
    {
      path: './fonts/600-italic.woff2',
      weight: '600',
      style: 'italic',
    },
    {
      path: './fonts/700.woff2',
      weight: '700',
      style: 'normal',
    },
    {
      path: './fonts/700-italic.woff2',
      weight: '700',
      style: 'italic',
    },
    {
      path: './fonts/800.woff2',
      weight: '800',
      style: 'normal',
    },
    {
      path: './fonts/800-italic.woff2',
      weight: '800',
      style: 'italic',
    },
    {
      path: './fonts/900.woff2',
      weight: '900',
      style: 'normal',
    },
    {
      path: './fonts/900-italic.woff2',
      weight: '900',
      style: 'italic',
    },
  ],
  variable: '--font-sfPro',
})

export const metadata: Metadata = {
  title: "DYDX Studio",
  description: "dydx studio. Web-design, UI/UX, Design.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${sfPro.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
          {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
