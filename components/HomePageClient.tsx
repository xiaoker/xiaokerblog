"use client"

import { useState, useEffect, Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { PageContainer } from "@/components/blog/PageContainer";
import { ArticleList } from "@/components/blog/ArticleList";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Article } from "@/lib/articles";
import {
    Pagination,
    PaginationContent,
    PaginationItem,
    PaginationLink,
    PaginationNext,
    PaginationPrevious,
} from "@/components/ui/pagination";

const POSTS_PER_PAGE = 5;

interface HomePageClientProps {
    articles: Article[];
    // categories is no longer needed here as it's in the header, 
    // but we can keep it if we want to render something else, 
    // though the requirement was to remove CategoryFilter.
    // I'll keep the interface cleaner and just accept articles.
    // But app/page.tsx passes categories, so I should keep it to avoid type error or update page.tsx.
    // I'll keep it but unused to minimize changes to page.tsx, or better yet, remove it from page.tsx too.
    // Let's stick to the minimal change: ignore it or remove usage.
    categories: string[];
}

function HomePageContent({ articles }: { articles: Article[] }) {
    const searchParams = useSearchParams();
    const activeCategory = searchParams.get("category");
    const searchQuery = searchParams.get("q") || "";

    const [currentPage, setCurrentPage] = useState(1);

    // Reset pagination when category or search changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory, searchQuery]);

    const filteredArticles = articles.filter((article) => {
        const matchesCategory = activeCategory ? article.category === activeCategory : true;

        // Safety check: Ensure fields are strings before calling toLowerCase
        const title = String(article.title || "").toLowerCase();
        const description = String(article.description || "").toLowerCase();
        const query = searchQuery.toLowerCase();

        const matchesSearch = searchQuery
            ? title.includes(query) || description.includes(query)
            : true;

        return matchesCategory && matchesSearch;
    });

    const totalPages = Math.ceil(filteredArticles.length / POSTS_PER_PAGE);
    const paginatedArticles = filteredArticles.slice(
        (currentPage - 1) * POSTS_PER_PAGE,
        currentPage * POSTS_PER_PAGE
    );

    const handlePageChange = (page: number, e: React.MouseEvent) => {
        e.preventDefault();
        if (page < 1 || page > totalPages) return;
        setCurrentPage(page);
        window.scrollTo({ top: 0, behavior: "smooth" });
    };

    return (
        <PageContainer>
            {/* Hero Section */}
            <section className="mb-12">
                <div className="flex items-center gap-4 mb-6">
                    <Avatar className="h-16 w-16 shrink-0 ring-2 ring-border">
                        <AvatarImage
                            src="/avatar.jpg"
                            alt="xiaoker"
                            className="object-cover object-[center_15%]"
                        />
                        <AvatarFallback>XK</AvatarFallback>
                    </Avatar>
                    <h1 className="text-3xl md:text-4xl font-bold tracking-tight">
                        啸傲的兔子洞
                    </h1>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                    你好，我是啸傲。探索精神自由和财富自由，这是我好奇心的自然选择。我在这里记录关于投资、商业、科技、成长等方面的思考，欢迎交流。
                </p>
            </section>

            {/* Filter Status */}
            {(activeCategory || searchQuery) && (
                <div className="mb-8 flex items-center gap-2 text-sm text-muted-foreground animate-in fade-in slide-in-from-top-2">
                    <span>当前视图:</span>
                    {activeCategory && (
                        <span className="bg-secondary px-2 py-1 rounded-md text-secondary-foreground font-medium">
                            分类 · {activeCategory}
                        </span>
                    )}
                    {searchQuery && (
                        <span className="bg-secondary px-2 py-1 rounded-md text-secondary-foreground font-medium">
                            搜索 · {searchQuery}
                        </span>
                    )}
                    {(activeCategory || searchQuery) && (
                        <a href="/" className="ml-auto text-xs hover:underline decoration-muted-foreground/50">
                            清除筛选
                        </a>
                    )}
                </div>
            )}

            {/* Article List */}
            <ArticleList articles={paginatedArticles} />

            {/* Pagination */}
            {totalPages > 1 && (
                <div className="mt-12">
                    <Pagination>
                        <PaginationContent>
                            <PaginationItem>
                                <PaginationPrevious
                                    href="#"
                                    onClick={(e) => handlePageChange(currentPage - 1, e)}
                                    aria-disabled={currentPage === 1}
                                    className={currentPage === 1 ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>

                            {/* Simple Page Indicator */}
                            <PaginationItem className="hidden sm:inline-block">
                                <span className="text-sm text-muted-foreground px-4">
                                    Page {currentPage} of {totalPages}
                                </span>
                            </PaginationItem>

                            <PaginationItem>
                                <PaginationNext
                                    href="#"
                                    onClick={(e) => handlePageChange(currentPage + 1, e)}
                                    aria-disabled={currentPage === totalPages}
                                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : ""}
                                />
                            </PaginationItem>
                        </PaginationContent>
                    </Pagination>
                </div>
            )}
        </PageContainer>
    );
}

export function HomePageClient({ articles, categories }: HomePageClientProps) {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <HomePageContent articles={articles} />
        </Suspense>
    );
}
