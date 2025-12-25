import { useParams } from "react-router-dom";
import {
  Layout,
  PageContainer,
  ArticleHeader,
  ArticleContent,
  TableOfContents,
  AuthorCard,
  ArticleNavigation,
  CommentSection,
  RelatedArticles,
} from "@/components/blog";
import { Callout, Quote } from "@/components/mdx";
import { mockArticles } from "@/data/mockArticles";

// Sample TOC headings (in Next.js, these would be extracted from MDX)
const sampleHeadings = [
  { id: "introduction", text: "引言", level: 2 },
  { id: "why-blog", text: "为什么要写博客", level: 2 },
  { id: "tech-stack", text: "技术选型", level: 2 },
  { id: "nextjs", text: "Next.js", level: 3 },
  { id: "mdx", text: "MDX", level: 3 },
  { id: "deployment", text: "部署方案", level: 2 },
  { id: "conclusion", text: "总结", level: 2 },
];

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const articleIndex = mockArticles.findIndex((a) => a.slug === slug);
  const article = mockArticles[articleIndex];

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

  const prevArticle = articleIndex > 0 ? mockArticles[articleIndex - 1] : undefined;
  const nextArticle =
    articleIndex < mockArticles.length - 1
      ? mockArticles[articleIndex + 1]
      : undefined;

  return (
    <Layout>
      <div className="content-container-wide">
        <div className="py-8 md:py-12 flex gap-12">
          {/* Main Content */}
          <article className="flex-1 min-w-0">
            <ArticleHeader
              title={article.title}
              date={article.date}
              readingTime={article.readingTime}
              category={article.category}
            />

            <ArticleContent>
              {/* Sample MDX content */}
              <h2 id="introduction">引言</h2>
              <p>
                在这个信息爆炸的时代，拥有一个属于自己的博客变得越来越重要。
                博客不仅是分享知识的平台，更是个人品牌的重要组成部分。
              </p>

              <Callout type="info" title="关于本文">
                本文将详细介绍如何从零开始构建一个现代化的个人博客系统。
              </Callout>

              <h2 id="why-blog">为什么要写博客</h2>
              <p>
                写博客有很多好处：帮助整理思路、建立个人品牌、与他人交流思想。
                在写作的过程中，我们往往会对某个主题有更深入的理解。
              </p>

              <Quote author="保罗·格雷厄姆">
                写作不仅仅是交流的工具，它也是思考的工具。
              </Quote>

              <h2 id="tech-stack">技术选型</h2>
              <p>选择合适的技术栈对于博客的长期维护至关重要。</p>

              <h3 id="nextjs">Next.js</h3>
              <p>
                Next.js 是一个基于 React 的全栈框架，它提供了出色的静态生成能力，
                非常适合构建内容驱动的网站。
              </p>

              <h3 id="mdx">MDX</h3>
              <p>
                MDX 允许我们在 Markdown 中使用 React 组件，
                这使得内容创作变得更加灵活和富有表现力。
              </p>

              <Callout type="warning">
                在使用 MDX 时，请注意组件的导入路径和命名规范。
              </Callout>

              <h2 id="deployment">部署方案</h2>
              <p>
                Vercel 是 Next.js 的最佳部署平台，它提供了无缝的 Git 集成、
                自动 HTTPS、边缘网络等功能。
              </p>

              <h2 id="conclusion">总结</h2>
              <p>
                构建一个个人博客是一个持续的过程。最重要的不是技术本身，
                而是持续创作有价值的内容。希望这篇文章能对你有所帮助。
              </p>
            </ArticleContent>

            <RelatedArticles 
              articles={mockArticles} 
              currentSlug={slug || ""} 
            />

            <AuthorCard
              name="xiaoker"
              bio="独立开发者，热爱技术与设计。在这里记录我的学习和思考。"
            />

            <ArticleNavigation
              prev={prevArticle}
              next={nextArticle}
            />

            <CommentSection />
          </article>

          {/* Sidebar TOC (hidden on mobile) */}
          <aside className="hidden lg:block w-64 shrink-0">
            <TableOfContents headings={sampleHeadings} />
          </aside>
        </div>
      </div>
    </Layout>
  );
}