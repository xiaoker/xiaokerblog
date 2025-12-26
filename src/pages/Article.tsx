import { useParams } from "react-router-dom";
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
import { Callout, Quote } from "@/components/mdx";
import { getArticleBySlug, getAllArticles } from "@/lib/articles";

// Sample TOC headings
const sampleHeadings = [
  { id: "introduction", text: "引言", level: 2 },
  { id: "why", text: "为什么", level: 2 },
  { id: "how", text: "如何实现", level: 2 },
  { id: "conclusion", text: "总结", level: 2 },
];

// Article content components - In Next.js, these would come from MDX files
const articleContents: Record<string, React.ReactNode> = {
  "building-a-personal-blog": (
    <>
      <h2 id="introduction">引言</h2>
      <p>
        在这个信息爆炸的时代，拥有一个属于自己的博客变得越来越重要。
        博客不仅是分享知识的平台，更是个人品牌的重要组成部分。
      </p>

      <Callout type="info" title="关于本文">
        本文将详细介绍如何从零开始构建一个现代化的个人博客系统。
      </Callout>

      <h2 id="why">为什么要写博客</h2>
      <p>
        写博客有很多好处：帮助整理思路、建立个人品牌、与他人交流思想。
        在写作的过程中，我们往往会对某个主题有更深入的理解。
      </p>

      <Quote author="保罗·格雷厄姆">
        写作不仅仅是交流的工具，它也是思考的工具。
      </Quote>

      <h2 id="how">技术选型</h2>
      <p>选择合适的技术栈对于博客的长期维护至关重要。</p>

      <h3>Next.js</h3>
      <p>
        Next.js 是一个基于 React 的全栈框架，它提供了出色的静态生成能力，
        非常适合构建内容驱动的网站。
      </p>

      <h3>MDX</h3>
      <p>
        MDX 允许我们在 Markdown 中使用 React 组件，
        这使得内容创作变得更加灵活和富有表现力。
      </p>

      <Callout type="warning">
        在使用 MDX 时，请注意组件的导入路径和命名规范。
      </Callout>

      <h2 id="conclusion">总结</h2>
      <p>
        构建一个个人博客是一个持续的过程。最重要的不是技术本身，
        而是持续创作有价值的内容。希望这篇文章能对你有所帮助。
      </p>
    </>
  ),
  "mdx-for-content-creation": (
    <>
      <h2 id="introduction">什么是 MDX</h2>
      <p>
        MDX 是 Markdown 的扩展，它允许你在 Markdown 文档中直接使用 JSX。
        这意味着你可以在写作时无缝地嵌入 React 组件。
      </p>

      <Callout type="info" title="MDX 的优势">
        MDX 让技术写作变得更加灵活，你可以创建交互式的文档和教程。
      </Callout>

      <h2 id="why">为什么选择 MDX</h2>
      <h3>简洁的语法</h3>
      <p>Markdown 的语法非常简洁，学习成本低。即使是非技术人员也能快速上手。</p>

      <h3>组件化</h3>
      <p>通过引入 React 组件，你可以创建自定义的代码高亮块、交互式图表等。</p>

      <Quote author="Kent C. Dodds">
        MDX 是我见过的最好的技术文档解决方案。
      </Quote>

      <h2 id="how">如何开始使用 MDX</h2>
      <ol>
        <li>安装必要的依赖</li>
        <li>配置构建工具</li>
        <li>创建你的第一篇 MDX 文章</li>
        <li>部署到你喜欢的平台</li>
      </ol>

      <Callout type="warning">
        不要过度使用组件，保持内容的可读性是最重要的。
      </Callout>

      <h2 id="conclusion">总结</h2>
      <p>记住，MDX 只是工具，内容才是王道。</p>
    </>
  ),
  "minimalist-design-philosophy": (
    <>
      <h2 id="introduction">什么是极简设计</h2>
      <p>
        极简设计（Minimalism）是一种设计哲学，强调去除不必要的元素，
        只保留最本质的部分。
      </p>

      <Quote author="Dieter Rams">
        Less, but better.
      </Quote>

      <h2 id="why">极简设计的核心原则</h2>
      <h3>去除冗余</h3>
      <p>每一个元素都应该有其存在的理由。</p>

      <h3>留白的力量</h3>
      <p>留白不是空白，而是设计的一部分。</p>

      <Callout type="info" title="设计提示">
        留白的使用是区分优秀设计师和普通设计师的重要标志之一。
      </Callout>

      <h2 id="how">在数字产品中的应用</h2>
      <ul>
        <li>清晰的信息层级</li>
        <li>一致的视觉语言</li>
        <li>直观的导航结构</li>
        <li>适度的动效反馈</li>
      </ul>

      <Callout type="warning">
        极简不等于简陋。极简设计需要更多的思考和打磨。
      </Callout>

      <h2 id="conclusion">总结</h2>
      <p>极简设计是一种思维方式，它提醒我们在复杂的世界中保持专注。</p>
    </>
  ),
  "effective-note-taking": (
    <>
      <h2 id="introduction">为什么需要笔记系统</h2>
      <p>
        在信息过载的时代，我们每天接收大量信息。
        没有一个好的系统来捕捉和组织这些信息，我们很容易迷失。
      </p>

      <Callout type="info" title="关键洞察">
        笔记不仅仅是记录，更是思考的延伸。
      </Callout>

      <h2 id="why">我尝试过的笔记工具</h2>
      <h3>Evernote</h3>
      <p>老牌笔记工具，功能全面但逐渐变得臃肿。</p>

      <h3>Notion</h3>
      <p>All-in-one 的工作空间，灵活性极高，但学习曲线陡峭。</p>

      <h3>Obsidian</h3>
      <p>基于本地 Markdown 文件，支持双向链接，我目前的主力工具。</p>

      <Quote author="Tiago Forte">
        你的第二大脑不是要记住一切，而是要在正确的时间提供正确的信息。
      </Quote>

      <h2 id="how">我的笔记工作流</h2>
      <ol>
        <li><strong>捕捉阶段</strong>：快速记录想法</li>
        <li><strong>整理阶段</strong>：定期回顾，将笔记分类和链接</li>
        <li><strong>输出阶段</strong>：将笔记转化为文章、项目或行动</li>
      </ol>

      <Callout type="warning">
        不要陷入工具的选择困难。选择一个工具，坚持使用，才是最重要的。
      </Callout>

      <h2 id="conclusion">总结</h2>
      <p>找到适合自己的系统，然后坚持使用。</p>
    </>
  ),
  "reading-in-digital-age": (
    <>
      <h2 id="introduction">信息过载的困境</h2>
      <p>
        我们生活在一个信息极度丰富的时代。
        每天有无数的文章、视频、播客争夺我们的注意力。
      </p>

      <Quote author="尼尔·波兹曼">
        我们将毁于我们所热爱的东西。
      </Quote>

      <h2 id="why">浅阅读 vs 深阅读</h2>
      <h3>浅阅读的特征</h3>
      <ul>
        <li>快速浏览标题和摘要</li>
        <li>同时处理多个信息源</li>
        <li>追求信息的数量而非质量</li>
      </ul>

      <h3>深阅读的特征</h3>
      <ul>
        <li>专注于单一材料</li>
        <li>主动思考和质疑</li>
        <li>与已有知识建立联系</li>
      </ul>

      <Callout type="info" title="思考">
        问问自己：上一次你完整阅读一本书是什么时候？
      </Callout>

      <h2 id="how">如何培养深度阅读习惯</h2>
      <ol>
        <li>创造专注环境</li>
        <li>带着问题阅读</li>
        <li>做笔记和标注</li>
        <li>定期回顾和总结</li>
      </ol>

      <Callout type="warning">
        碎片化阅读会逐渐削弱你的深度思考能力。
      </Callout>

      <h2 id="conclusion">总结</h2>
      <p>
        在这个注意力稀缺的时代，深度阅读和思考变得更加珍贵。
      </p>

      <Quote author="梭罗">
        书籍是我们的精神财富，阅读是与最优秀的人对话。
      </Quote>
    </>
  ),
};

export default function ArticlePage() {
  const { slug } = useParams<{ slug: string }>();
  const article = slug ? getArticleBySlug(slug) : null;
  const allArticles = getAllArticles();

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

  const content = articleContents[slug || ""] || (
    <p className="text-muted-foreground">文章内容加载中...</p>
  );

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

            <div className="prose mt-8">{content}</div>

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
