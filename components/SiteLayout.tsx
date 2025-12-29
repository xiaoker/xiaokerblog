'use client'

import { ReactNode, useState } from "react";
import { Header } from "./blog/Header";
import { Footer } from "./blog/Footer";
import { SearchDialog } from "./blog/SearchDialog";

interface LayoutProps {
    children: ReactNode;
    categories: string[];
}

export function SiteLayout({ children, categories }: LayoutProps) {
    const [searchOpen, setSearchOpen] = useState(false);

    return (
        <div className="min-h-screen flex flex-col">
            <Header categories={categories} onSearchClick={() => setSearchOpen(true)} />
            <div className="flex-1">{children}</div>
            <Footer />
            <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
        </div>
    );
}
