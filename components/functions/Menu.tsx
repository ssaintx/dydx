import Link from "next/link";
import Image from "next/image";

import {
    Sheet,
    SheetContent,
    SheetFooter,
    SheetHeader,
    SheetTitle,
    SheetTrigger,
} from "@/components/ui/sheet";

import { Year } from "./Year";
import { navbarItems } from "@/constants";

export const Menu = () => {
    return (
        <Sheet>
            <SheetTrigger>
                <Image src="/icons/menu.svg" alt="menu" width={24} height={24} className="select-none invert" />
            </SheetTrigger>
            <SheetContent side="left" className="glassmorphism border-neutral-800">
                <SheetHeader>
                    <SheetTitle></SheetTitle>
                </SheetHeader>

                <ul className="flex flex-col items-center justify-center gap-2 h-full pb-12">
                    {navbarItems().map((item) => (
                        <li key={item.href}>
                            <Link href={item.href} className="text-neutral-400 hover:text-neutral-50 duration-500 ease-in-out">
                                {item.title}
                            </Link>
                        </li>
                    ))}
                </ul>

                <SheetFooter>
                    <span className="text-sm text-center text-neutral-400"><Year /> dydx.</span>
                </SheetFooter>
            </SheetContent>
        </Sheet >
    );
};