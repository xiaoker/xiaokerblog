import { Layout, PageContainer, ArticleList } from "@/components/blog";
import { mockArticles } from "@/data/mockArticles";

export default function ArticlesPage() {
  return (
    <Layout>
      <PageContainer>
        <h1 className="text-3xl font-bold tracking-tight mb-8">所有文章</h1>
        <ArticleList articles={mockArticles} />
      </PageContainer>
    </Layout>
  );
}