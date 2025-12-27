import { notFound } from 'next/navigation'
import { getArticleBySlug, getArticleRawContent, getAllArticles } from '@/lib/articles'
import { ArticleHeader } from '@/components/blog/ArticleHeader'
import { AuthorCard } from '@/components/blog/AuthorCard'
import { ArticleNavigation } from '@/components/blog/ArticleNavigation'
import { RelatedArticles } from '@/components/blog/RelatedArticles'
import { CommentSection } from '@/components/blog/CommentSection'
import { TableOfContents } from '@/components/blog/TableOfContents'
import { MDXRemote } from 'next-mdx-remote/rsc'
import remarkGfm from 'remark-gfm'
import { useMDXComponents } from '@/mdx-components'

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

    const content = getArticleRawContent(resolvedParams.slug)
    if (!content) return <p>Content not found</p>

    const allArticles = getAllArticles()

    const articleIndex = allArticles.findIndex((a) => a.slug === resolvedParams.slug)
    const newerArticle = articleIndex > 0 ? allArticles[articleIndex - 1] : undefined
    const olderArticle = articleIndex < allArticles.length - 1 ? allArticles[articleIndex + 1] : undefined

    const sampleHeadings: { id: string; text: string; level: number }[] = []

    return (
        <div className="content-container-wide">
            <div className="py-8 md:py-12 flex gap-12">
                <article className="flex-1 min-w-0">
                    <ArticleHeader
                        title={article.title}
                        date={article.date}
                        readingTime={article.readTime}
                        category={article.category}
                    />

                    <div className="prose prose-neutral dark:prose-invert max-w-none mt-8">
                        <MDXRemote
                            source={content}
                            components={useMDXComponents({})}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkGfm],
                                }
                            }}
                        />
                    </div>

                    <RelatedArticles articles={allArticles} currentSlug={article.slug} />
                    <AuthorCard name="xiaoker" bio="独立开发者，热爱技术与设计。在这里记录我的学习和思考。" avatar="/avatar.jpg" />
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
