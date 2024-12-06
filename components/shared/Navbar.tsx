import Link from "next/link";
import Image from "next/image";

import { navbarItems } from "@/constants";
import { Menu } from "../functions/Menu";
import { LanguageSwitcher } from "../functions/LanguageSwitcher";

export const Navbar = () => {
    return (
        <nav className="navbar">
            <div className="flex p-2 glassmorphism border border-neutral-800 rounded-md xm:hidden">
                <Menu />
            </div>
            <Image src="/images/logo.svg" alt="logo" width={72} height={72} className="ml-6 invert select-none" />
            <ul className="hidden flex-row items-center justify-center gap-8 xm:flex">
                {navbarItems().map((item) => (
                    <li key={item.href}>
                        <Link href={item.href} className="text-neutral-400 hover:text-neutral-50 duration-500 ease-in-out">
                            {item.title}
                        </Link>
                    </li>
                ))}
            </ul>
            <LanguageSwitcher />
        </nav>
    );
};