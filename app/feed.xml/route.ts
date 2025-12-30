import { getAllArticles } from '@/lib/articles'

const SITE_URL = 'https://xiaoker.com'

export async function GET() {
    const articles = getAllArticles()

    const feed = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0">
  <channel>
    <title>啸傲的博客</title>
    <link>${SITE_URL}</link>
    <description>我在这里记录关于投资、科技、成长等方面的思考，探索精神自由和财富自由。</description>
    <language>zh-CN</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    ${articles
            .map((article) => {
                const url = `${SITE_URL}/articles/${article.slug}`
                return `
    <item>
      <title><![CDATA[${article.title}]]></title>
      <link>${url}</link>
      <guid>${url}</guid>
      <pubDate>${new Date(article.date).toUTCString()}</pubDate>
      <description><![CDATA[${article.description}]]></description>
      <category><![CDATA[${article.category}]]></category>
    </item>`
            })
            .join('')}
  </channel>
</rss>`

    return new Response(feed, {
        headers: {
            'Content-Type': 'application/xml; charset=utf-8',
        },
    })
}
