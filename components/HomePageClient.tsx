import { useState, useEffect } from "react";
import { PageContainer } from "@/components/blog/PageContainer";
import { ArticleList } from "@/components/blog/ArticleList";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
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
    categories: string[];
}

export function HomePageClient({ articles, categories }: HomePageClientProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState(1);

    // Reset pagination when category changes
    useEffect(() => {
        setCurrentPage(1);
    }, [activeCategory]);

    const filteredArticles = activeCategory
        ? articles.filter((a) => a.category === activeCategory)
        : articles;

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
                        你好，我是 xiaoker
                    </h1>
                </div>
                <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                    这是我的个人博客，记录关于技术、设计与生活的思考。
                    在这里，我分享我的学习笔记、项目经验和一些随想。
                </p>
            </section>

            {/* Category Filter */}
            <CategoryFilter
                categories={categories}
                activeCategory={activeCategory}
                onCategoryChange={setActiveCategory}
            />

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
