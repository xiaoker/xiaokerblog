# Next.js 迁移指南

本指南帮助你将当前 Lovable/Vite 项目迁移到 Next.js (App Router) + MDX 项目。

---

## 📁 目标项目结构

```
my-blog/
├── app/
│   ├── layout.tsx              # 根布局（含 GA4）
│   ├── page.tsx                # 首页
│   ├── articles/
│   │   ├── page.tsx            # 文章列表页
│   │   └── [slug]/
│   │       └── page.tsx        # 文章详情页
│   ├── about/
│   │   └── page.tsx            # 关于页
│   └── globals.css             # 全局样式
├── components/
│   ├── blog/                   # 直接复制 src/components/blog/
│   ├── mdx/                    # 直接复制 src/components/mdx/
│   └── ui/                     # 直接复制 src/components/ui/
├── content/
│   └── articles/               # 直接复制 src/content/articles/
├── lib/
│   ├── articles.ts             # MDX 加载逻辑（需修改）
│   └── utils.ts                # 直接复制
├── public/
├── tailwind.config.ts
├── next.config.mjs
└── package.json
```

---

## 🚀 Step 1: 创建 Next.js 项目

```bash
npx create-next-app@latest my-blog --typescript --tailwind --eslint --app --src-dir=false
cd my-blog
```

---

## 📦 Step 2: 安装依赖

```bash
# MDX 支持
npm install @next/mdx @mdx-js/loader @mdx-js/react remark-gfm

# shadcn/ui
npx shadcn@latest init

# 其他依赖
npm install lucide-react class-variance-authority clsx tailwind-merge
npm install gray-matter          # frontmatter 解析
npm install @next/third-parties  # GA4
```

---

## ⚙️ Step 3: 配置 next.config.mjs

```javascript
// next.config.mjs
import createMDX from '@next/mdx'
import remarkGfm from 'remark-gfm'

/** @type {import('next').NextConfig} */
const nextConfig = {
  pageExtensions: ['js', 'jsx', 'md', 'mdx', 'ts', 'tsx'],
}

const withMDX = createMDX({
  options: {
    remarkPlugins: [remarkGfm],
    rehypePlugins: [],
  },
})

export default withMDX(nextConfig)
```

---

## 📄 Step 4: 配置 mdx-components.tsx

在项目根目录创建 `mdx-components.tsx`：

```tsx
// mdx-components.tsx
import type { MDXComponents } from 'mdx/types'
import { Callout } from '@/components/mdx/Callout'
import { CodeBlock } from '@/components/mdx/CodeBlock'
import { ImageWithCaption } from '@/components/mdx/ImageWithCaption'
import { Quote } from '@/components/mdx/Quote'

export function useMDXComponents(components: MDXComponents): MDXComponents {
  return {
    // 自定义组件
    Callout,
    CodeBlock,
    ImageWithCaption,
    Quote,
    
    // 覆盖默认元素样式
    h1: ({ children }) => (
      <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4">{children}</h1>
    ),
    h2: ({ children }) => (
      <h2 className="text-2xl font-semibold tracking-tight mt-8 mb-3">{children}</h2>
    ),
    h3: ({ children }) => (
      <h3 className="text-xl font-semibold mt-6 mb-2">{children}</h3>
    ),
    p: ({ children }) => (
      <p className="leading-7 mb-4">{children}</p>
    ),
    ul: ({ children }) => (
      <ul className="list-disc pl-6 mb-4 space-y-2">{children}</ul>
    ),
    ol: ({ children }) => (
      <ol className="list-decimal pl-6 mb-4 space-y-2">{children}</ol>
    ),
    blockquote: ({ children }) => (
      <blockquote className="border-l-4 border-primary pl-4 italic my-4">
        {children}
      </blockquote>
    ),
    code: ({ children }) => (
      <code className="bg-muted px-1.5 py-0.5 rounded text-sm font-mono">
        {children}
      </code>
    ),
    pre: ({ children }) => (
      <pre className="bg-muted p-4 rounded-lg overflow-x-auto mb-4">
        {children}
      </pre>
    ),
    a: ({ href, children }) => (
      <a href={href} className="text-primary underline underline-offset-4 hover:text-primary/80">
        {children}
      </a>
    ),
    ...components,
  }
}
```

---

## 📚 Step 5: MDX 文章加载逻辑

创建 `lib/articles.ts`：

```typescript
// lib/articles.ts
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
        readTime: data.readTime,
        tags: data.tags || [],
      }
    })
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  
  return articles
}

export function getArticleBySlug(slug: string): Article | undefined {
  const articles = getAllArticles()
  return articles.find((article) => article.slug === slug)
}

export async function getArticleContent(slug: string) {
  const { default: Content } = await import(`@/content/articles/${slug}.mdx`)
  return Content
}
```

---

## 🎨 Step 6: 根布局 + GA4

```tsx
// app/layout.tsx
import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { ThemeProvider } from '@/components/theme-provider'
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '我的博客',
  description: '分享技术与生活的个人博客',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="zh-CN" suppressHydrationWarning>
      <body className={inter.className}>
        <ThemeProvider
          attribute="class"
          defaultTheme="system"
          enableSystem
          disableTransitionOnChange
        >
          {children}
        </ThemeProvider>
      </body>
      <GoogleAnalytics gaId="G-N2WZREXYDT" />
    </html>
  )
}
```

---

## 📄 Step 7: 文章详情页

```tsx
// app/articles/[slug]/page.tsx
import { notFound } from 'next/navigation'
import { getArticleBySlug, getArticleContent, getAllArticles } from '@/lib/articles'
import { ArticleHeader } from '@/components/blog/ArticleHeader'
import { AuthorCard } from '@/components/blog/AuthorCard'

interface Props {
  params: { slug: string }
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
  const article = getArticleBySlug(params.slug)
  if (!article) return {}
  
  return {
    title: article.title,
    description: article.description,
  }
}

export default async function ArticlePage({ params }: Props) {
  const article = getArticleBySlug(params.slug)
  if (!article) notFound()
  
  const Content = await getArticleContent(params.slug)
  
  return (
    <article className="max-w-3xl mx-auto px-4 py-8">
      <ArticleHeader
        title={article.title}
        date={article.date}
        category={article.category}
        readTime={article.readTime}
      />
      
      <div className="prose prose-neutral dark:prose-invert max-w-none">
        <Content />
      </div>
      
      <AuthorCard />
    </article>
  )
}
```

---

## 🔄 Step 8: 组件迁移清单

### 可直接复制的组件

| 源路径 | 目标路径 | 备注 |
|--------|----------|------|
| `src/components/ui/*` | `components/ui/*` | shadcn 组件 |
| `src/components/blog/*` | `components/blog/*` | 博客组件 |
| `src/components/mdx/*` | `components/mdx/*` | MDX 组件 |
| `src/content/articles/*` | `content/articles/*` | MDX 文章 |
| `src/assets/*` | `public/` | 静态资源 |
| `src/index.css` | `app/globals.css` | 全局样式 |
| `tailwind.config.ts` | `tailwind.config.ts` | Tailwind 配置 |

### 需要修改的组件

| 组件 | 修改内容 |
|------|----------|
| `Layout.tsx` | 移除，改用 `app/layout.tsx` |
| `Header.tsx` | 路由改用 `next/link` |
| `NavLink.tsx` | 改用 `next/link` + `usePathname()` |
| `SearchDialog.tsx` | 保持不变 |

### NavLink 改造示例

```tsx
// components/NavLink.tsx (Next.js 版本)
'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { cn } from '@/lib/utils'

interface NavLinkProps {
  href: string
  children: React.ReactNode
  className?: string
  activeClassName?: string
}

export function NavLink({ href, children, className, activeClassName }: NavLinkProps) {
  const pathname = usePathname()
  const isActive = pathname === href
  
  return (
    <Link
      href={href}
      className={cn(className, isActive && activeClassName)}
    >
      {children}
    </Link>
  )
}
```

---

## 🎯 Step 9: 路由映射

| Lovable 路由 | Next.js 路由 |
|--------------|--------------|
| `/` | `app/page.tsx` |
| `/articles` | `app/articles/page.tsx` |
| `/articles/:slug` | `app/articles/[slug]/page.tsx` |
| `/about` | `app/about/page.tsx` |

---

## ✅ 迁移检查清单

- [ ] 创建 Next.js 项目
- [ ] 安装所有依赖
- [ ] 配置 `next.config.mjs`
- [ ] 创建 `mdx-components.tsx`
- [ ] 复制 `components/` 目录
- [ ] 复制 `content/articles/` 目录
- [ ] 复制样式文件和 Tailwind 配置
- [ ] 创建 `lib/articles.ts`
- [ ] 创建各页面组件
- [ ] 修改路由相关组件（NavLink, Header）
- [ ] 测试 MDX 渲染
- [ ] 测试 GA4 追踪
- [ ] 部署到 Vercel

---

## 🚀 部署

```bash
# 推送到 GitHub 后，在 Vercel 中导入项目
# Vercel 会自动检测 Next.js 并配置构建

# 或者手动部署
npm run build
npm run start
```

---

## 💡 额外建议

1. **图片优化**：使用 `next/image` 替换普通 `<img>` 标签
2. **字体优化**：使用 `next/font` 加载字体
3. **SEO**：每个页面添加 `generateMetadata` 函数
4. **性能**：利用 `generateStaticParams` 进行静态生成

---

有问题欢迎随时询问！
