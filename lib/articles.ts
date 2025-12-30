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
        description: data.description || data.excerpt || "",
        date: data.date,
        category: data.category,
        tags: data.tags || [],
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())

  return articles
}

export function getAllCategories(): string[] {
  const articles = getAllArticles()
  const categories = new Set(articles.map((article) => article.category))
  const order = ["投资", "科技", "成长", "随笔"]
  return Array.from(categories).sort((a, b) => {
    const indexA = order.indexOf(a)
    const indexB = order.indexOf(b)
    // If both found, sort by index
    if (indexA !== -1 && indexB !== -1) return indexA - indexB
    // If one not found, put it at end
    if (indexA === -1) return 1
    if (indexB === -1) return -1
    // If both not found, alphabetical
    return a.localeCompare(b)
  })
}

export function getArticleBySlug(slug: string): Article | undefined {
  const articles = getAllArticles()
  return articles.find((article) => article.slug === slug)
}

// getArticleContent returns a component (via import) - this relies on the loader, which we are abandoning for body content.
// We will keeping it for backwards compatibility if needed, but adding a new one for MDXRemote.

export function getArticleRawContent(slug: string): string | null {
  try {
    const fullPath = path.join(articlesDirectory, `${slug}.mdx`)
    const fileContents = fs.readFileSync(fullPath, 'utf8')
    const { content } = matter(fileContents)
    return content
  } catch (error) {
    return null
  }
}

