import Image from "next/image";

import { Menu } from "./Menu";
import { logo } from "@/public";

export const Navbar = () => {
    return (
        <nav className="flex justify-between items-center w-full h-20 px-4 text-black glassmorphism fixed nav z-10">
            <div>
                <Image
                    src={logo}
                    alt="logo"
                    width={50}
                    height={50}
                    style={{ width: "auto", height: "auto" }}
                    className="dark:bg-zinc-50"
                />
            </div>
            <Menu />
        </nav>
    );
};