"use client"

import { useState } from "react";
import { PageContainer } from "@/components/blog/PageContainer";
import { ArticleList } from "@/components/blog/ArticleList";
import { CategoryFilter } from "@/components/blog/CategoryFilter";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Article } from "@/lib/articles";

interface HomePageClientProps {
    articles: Article[];
    categories: string[];
}

export function HomePageClient({ articles, categories }: HomePageClientProps) {
    const [activeCategory, setActiveCategory] = useState<string | null>(null);

    const filteredArticles = activeCategory
        ? articles.filter((a) => a.category === activeCategory)
        : articles;

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
            <ArticleList articles={filteredArticles} />
        </PageContainer>
    );
}
