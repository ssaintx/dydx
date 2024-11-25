import { Metadata } from "next";
import { Poppins } from "next/font/google";

import "./globals.css";
import { NextIntlClientProvider } from "next-intl";
import { getLocale, getMessages } from "next-intl/server";

const poppins = Poppins({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-poppins',
  weight: ['100', '200', '300', '400', '500', '600', '700', '800', '900']
});

export const metadata: Metadata = {
  title: "DYDX Studio",
  description: "dydx studio. Web-design, UI/UX, Design.",
};

export default async function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  const locale = await getLocale();
  const messages = await getMessages();

  return (
    <html lang={locale} suppressHydrationWarning>
      <body className={`${poppins.variable} antialiased`}>
        <NextIntlClientProvider messages={messages}>
            {children}
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
