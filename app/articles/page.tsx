import { PageContainer } from "@/components/blog/PageContainer";
import { ArticleList } from "@/components/blog/ArticleList";
import { getAllArticles } from "@/lib/articles";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "所有文章",
};

export default function ArticlesPage() {
    const articles = getAllArticles();

    return (
        <PageContainer>
            <h1 className="text-3xl font-bold tracking-tight mb-8">所有文章</h1>
            <ArticleList articles={articles} />
        </PageContainer>
    );
}
