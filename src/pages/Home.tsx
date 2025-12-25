import { useState } from "react";
import {
  Layout,
  PageContainer,
  ArticleList,
  CategoryFilter,
} from "@/components/blog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { mockArticles, categories } from "@/data/mockArticles";

export default function HomePage() {
  const [activeCategory, setActiveCategory] = useState<string | null>(null);

  const filteredArticles = activeCategory
    ? mockArticles.filter((a) => a.category === activeCategory)
    : mockArticles;

  return (
    <Layout>
      <PageContainer>
        {/* Hero Section */}
        <section className="mb-12">
          <div className="flex items-start gap-5 mb-4">
            <Avatar className="h-16 w-16 shrink-0">
              <AvatarImage src="/avatar.png" alt="xiaoker" />
              <AvatarFallback>XK</AvatarFallback>
            </Avatar>
            <div>
              <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-2">
                你好，我是 xiaoker
              </h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-2xl">
                这是我的个人博客，记录关于技术、设计与生活的思考。
                在这里，我分享我的学习笔记、项目经验和一些随想。
              </p>
            </div>
          </div>
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
    </Layout>
  );
}