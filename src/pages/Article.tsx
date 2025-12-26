import { useParams } from "react-router-dom";
import { useState, useEffect, ComponentType } from "react";
import { MDXProvider } from "@mdx-js/react";
import {
  Layout,
  PageContainer,
  ArticleHeader,
  TableOfContents,
  AuthorCard,
  ArticleNavigation,
  CommentSection,
  RelatedArticles,
} from "@/components/blog";
import { Callout, Quote, CodeBlock, ImageWithCaption } from "@/components/mdx";
import { getArticleMeta, getArticleLoader, getAllArticles } from "@/lib/articles";

// MDX components mapping
const mdxComponents = {
  Callout,
  Quote,
  CodeBlock,
  ImageWithCaption,
};

const sampleHeadings = [
  { id: "introduction", text: "引言", level: 2 },
  { id: "why-blog", text: "为什么要写博客", level: 2 },
  { id: "tech-stack", text: "技术选型", level: 2 },
  { id: "deployment", text: "部署方案", level: 2 },
  { id: "conclusion", text: "总结", level: 2 },
];

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const [MDXContent, setMDXContent] = useState<ComponentType | null>(null);
  const [loading, setLoading] = useState(true);

  const article = slug ? getArticleMeta(slug) : null;
  const allArticles = getAllArticles();

  useEffect(() => {
    if (!slug) return;
    
    const loader = getArticleLoader(slug);
    if (loader) {
      setLoading(true);
      loader()
        .then((mod) => {
          setMDXContent(() => mod.default);
          setLoading(false);
        })
        .catch(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, [slug]);

  if (!article) {
    return (
      <Layout>
        <PageContainer>
          <div className="text-center py-20">
            <h1 className="text-2xl font-bold mb-4">文章未找到</h1>
            <p className="text-muted-foreground">抱歉，您访问的文章不存在。</p>
          </div>
        </PageContainer>
      </Layout>
    );
  }

  const articleIndex = allArticles.findIndex((a) => a.slug === slug);
  const prevArticle = articleIndex > 0 ? allArticles[articleIndex - 1] : undefined;
  const nextArticle = articleIndex < allArticles.length - 1 ? allArticles[articleIndex + 1] : undefined;

  return (
    <Layout>
      <div className="content-container-wide">
        <div className="py-8 md:py-12 flex gap-12">
          <article className="flex-1 min-w-0">
            <ArticleHeader
              title={article.title}
              date={article.date}
              readingTime={article.readingTime}
              category={article.category}
            />

            <div className="prose mt-8">
              {loading ? (
                <p className="text-muted-foreground">加载中...</p>
              ) : MDXContent ? (
                <MDXProvider components={mdxComponents}>
                  <MDXContent />
                </MDXProvider>
              ) : (
                <p className="text-muted-foreground">内容加载失败</p>
              )}
            </div>

            <RelatedArticles articles={allArticles} currentSlug={slug || ""} />
            <AuthorCard name="xiaoker" bio="独立开发者，热爱技术与设计。在这里记录我的学习和思考。" />
            <ArticleNavigation prev={prevArticle} next={nextArticle} />
            <CommentSection />
          </article>

          <aside className="hidden lg:block w-64 shrink-0">
            <TableOfContents headings={sampleHeadings} />
          </aside>
        </div>
      </div>
    </Layout>
  );
}
