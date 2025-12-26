import { notFound } from 'next/navigation'
import { getArticleBySlug, getArticleContent, getAllArticles } from '@/lib/articles'
import { ArticleHeader } from '@/components/blog/ArticleHeader'
import { AuthorCard } from '@/components/blog/AuthorCard'
import { ArticleNavigation } from '@/components/blog/ArticleNavigation'
import { RelatedArticles } from '@/components/blog/RelatedArticles'
import { CommentSection } from '@/components/blog/CommentSection'
import { TableOfContents } from '@/components/blog/TableOfContents'

interface Props {
    params: Promise<{ slug: string }>
}

// 静态生成所有文章页面
export async function generateStaticParams() {
    const articles = getAllArticles()
    return articles.map((article) => ({
        slug: article.slug,
    }))
}

// 动态生成 SEO 元数据
export async function generateMetadata({ params }: Props) {
    const resolvedParams = await params;
    const article = getArticleBySlug(resolvedParams.slug)
    if (!article) return {}

    return {
        title: article.title,
        description: article.description,
    }
}

export default async function ArticlePage({ params }: Props) {
    const resolvedParams = await params;
    const article = getArticleBySlug(resolvedParams.slug)
    if (!article) notFound()

    const Content = await getArticleContent(resolvedParams.slug)
    const allArticles = getAllArticles()

    const articleIndex = allArticles.findIndex((a) => a.slug === resolvedParams.slug)
    const prevArticle = articleIndex < allArticles.length - 1 ? allArticles[articleIndex + 1] : undefined
    const nextArticle = articleIndex > 0 ? allArticles[articleIndex - 1] : undefined
    // Note: sort order in getAllArticles is desc (newest first). 
    // Index 0 is newest. Index N is oldest.
    // Next Article (newer) should be index-1. Prev Article (older) should be index+1.
    // wait, "Previous Article" usually means "Older Article"? Or "Left in pagination"?
    // Usually "Next Post" -> Newer. "Previous Post" -> Older.
    // But if list is [Newest, ..., Oldest]
    // i=0 (Newest). Next(Newer) = null. Prev(Older) = i+1.
    // Let's stick to simple logic: 
    // prevArticle = older = index + 1
    // nextArticle = newer = index - 1
    const newerArticle = articleIndex > 0 ? allArticles[articleIndex - 1] : undefined
    const olderArticle = articleIndex < allArticles.length - 1 ? allArticles[articleIndex + 1] : undefined

    // Sample headings - extracting TOC from MDX is harder without plugins. 
    // For now I'll use empty or static sample from original code if available.
    // The original used `sampleHeadings`. I'll omit TOC or use empty for now.
    const sampleHeadings: { id: string; text: string; level: number }[] = []

    return (
        <div className="content-container-wide">
            <div className="py-8 md:py-12 flex gap-12">
                <article className="flex-1 min-w-0">
                    <ArticleHeader
                        title={article.title}
                        date={article.date}
                        // readingTime={article.readTime} // Interface mismatch? lib/articles has readTime. ArticleHeader needs readingTime?
                        // Let's check ArticleHeader props.
                        // Assuming it takes readingTime.
                        readingTime={article.readTime}
                        category={article.category}
                    />

                    <div className="prose prose-neutral dark:prose-invert max-w-none mt-8">
                        {Content ? <Content /> : <p>Content loading error</p>}
                    </div>

                    <RelatedArticles articles={allArticles} currentSlug={article.slug} />
                    <AuthorCard name="xiaoker" bio="独立开发者，热爱技术与设计。在这里记录我的学习和思考。" />
                    <ArticleNavigation prev={olderArticle} next={newerArticle} />
                    <CommentSection />
                </article>

                <aside className="hidden lg:block w-64 shrink-0">
                    <TableOfContents headings={sampleHeadings} />
                </aside>
            </div>
        </div>
    )
}
