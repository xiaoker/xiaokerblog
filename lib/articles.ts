import fs from 'fs'
import path from 'path'
import matter from 'gray-matter'

const articlesDirectory = path.join(process.cwd(), 'content/articles')

export interface Article {
  slug: string
  title: string
  description: string
  date: string
  category: string
  readTime: string
  tags: string[]
}

export function getAllArticles(): Article[] {
  if (!fs.existsSync(articlesDirectory)) {
    return []
  }

  const fileNames = fs.readdirSync(articlesDirectory)

  const articles = fileNames
    .filter((fileName) => fileName.endsWith('.mdx'))
    .map((fileName) => {
      const slug = fileName.replace(/\.mdx$/, '')
      const fullPath = path.join(articlesDirectory, fileName)
      const fileContents = fs.readFileSync(fullPath, 'utf8')
      const { data } = matter(fileContents)

      return {
        slug,
        title: data.title,
        description: data.description,
        date: data.date,
        category: data.category,
        readTime: data.readTime || `${Math.ceil(fileContents.length / 500)} min read`, // Simple estimation: 500 chars/min for Chinese/Mixed content
        tags: data.tags || [],
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return articles
}

export function getAllCategories(): string[] {
  const articles = getAllArticles()
  const categories = new Set(articles.map((article) => article.category))
  return Array.from(categories)
}

export function getArticleBySlug(slug: string): Article | undefined {
  const articles = getAllArticles()
  return articles.find((article) => article.slug === slug)
}

export async function getArticleContent(slug: string) {
  try {
    const { default: Content } = await import(`@/content/articles/${slug}.mdx`)
    return Content
  } catch (error) {
    return null
  }
}
