'use client'

import { ReactNode, useState } from "react";
import { Header } from "./blog/Header";
import { Footer } from "./blog/Footer";
import { SearchDialog } from "./blog/SearchDialog";

interface LayoutProps {
    children: ReactNode;
}

export function SiteLayout({ children }: LayoutProps) {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col">
            <Header onSearchClick={() => setSearchOpen(true)} />
            <div className="flex-1">{children}</div>
            <Footer />
            <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
        </div>
    );
}
