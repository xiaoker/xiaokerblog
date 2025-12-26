import { Layout, PageContainer, ArticleList } from "@/components/blog";
import { getAllArticles } from "@/lib/articles";

export default function ArticlesPage() {
  const articles = getAllArticles();

  return (
    <Layout>
      <PageContainer>
        <h1 className="text-3xl font-bold tracking-tight mb-8">所有文章</h1>
        <ArticleList articles={articles} />
      </PageContainer>
    </Layout>
  );
}
