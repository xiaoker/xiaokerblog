'use client'

import { ReactNode, useState, Suspense } from "react";
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
            <Suspense fallback={<div className="h-16 w-full" />}>
                <Header categories={categories} onSearchClick={() => setSearchOpen(true)} />
            </Suspense>
            <div className="flex-1">{children}</div>
            <Footer />
            <SearchDialog open={searchOpen} onOpenChange={setSearchOpen} />
        </div>
    );
}
