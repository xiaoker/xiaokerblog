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
import rehypeSlug from 'rehype-slug'
import { useMDXComponents } from '@/mdx-components'
import { extractHeadings } from '@/lib/utils'

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

    const ogImage = article.cover || '/og-image.png'

    return {
        title: article.title,
        description: article.description,
        openGraph: {
            title: article.title,
            description: article.description,
            type: 'article',
            publishedTime: article.date,
            authors: ['啸傲'],
            images: [
                {
                    url: ogImage,
                    width: 1200,
                    height: 630,
                    alt: article.title,
                }
            ],
        },
        twitter: {
            card: 'summary_large_image',
            title: article.title,
            description: article.description,
            images: [ogImage],
        },
    }
}


export default async function ArticlePage({ params }: Props) {
    const resolvedParams = await params;
    const article = getArticleBySlug(resolvedParams.slug)
    if (!article) notFound()

    const content = getArticleRawContent(resolvedParams.slug)
    if (!content) return <p>Content not found</p>

    const headings = extractHeadings(content)

    const allArticles = getAllArticles()

    const articleIndex = allArticles.findIndex((a) => a.slug === resolvedParams.slug)
    const newerArticle = articleIndex > 0 ? allArticles[articleIndex - 1] : undefined
    const olderArticle = articleIndex < allArticles.length - 1 ? allArticles[articleIndex + 1] : undefined

    const sampleHeadings: { id: string; text: string; level: number }[] = []

    return (
        <div className="content-container relative">
            <div className="py-8 md:py-12">
                <article className="min-w-0 w-full">
                    <ArticleHeader
                        title={article.title}
                        date={article.date}
                        category={article.category}
                    />


                    <script
                        type="application/ld+json"
                        dangerouslySetInnerHTML={{
                            __html: JSON.stringify({
                                '@context': 'https://schema.org',
                                '@type': 'BlogPosting',
                                headline: article.title,
                                datePublished: article.date,
                                dateModified: article.date,
                                description: article.description,
                                image: [], // Add cover image if available
                                url: `https://xiaoker.com/articles/${article.slug}`,
                                author: {
                                    '@type': 'Person',
                                    name: '啸傲',
                                    url: 'https://xiaoker.com/about'
                                },
                            })
                        }}
                    />

                    <div className="prose prose-neutral dark:prose-invert max-w-none mt-8">
                        <MDXRemote
                            source={content}
                            components={useMDXComponents({})}
                            options={{
                                mdxOptions: {
                                    remarkPlugins: [remarkGfm],
                                    rehypePlugins: [rehypeSlug],
                                }
                            }}
                        />
                    </div>

                    <RelatedArticles articles={allArticles} currentSlug={article.slug} />
                    <AuthorCard name="啸傲" bio="跟随好奇心探索自我和世界" avatar="/xiaoker-avatar.jpg" />
                    <ArticleNavigation prev={newerArticle} next={olderArticle} />
                    <CommentSection />
                </article>

                {/* 
                  Sidebar: Poised absolutely to the right of the centered content.
                  Visible only on XL screens (creates a "Medium-like" centered layout with potential sidebar).
                  grid-area or absolute positioning ensures main column doesn't shift.
                */}
                <aside className="hidden xl:block absolute top-0 left-full ml-12 h-full w-64">
                    <div className="sticky top-24">
                        <TableOfContents headings={headings} />
                    </div>
                </aside>
            </div>
        </div>
    )
}
