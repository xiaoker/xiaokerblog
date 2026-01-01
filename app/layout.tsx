import type { Metadata } from 'next'
import { getAllCategories } from '@/lib/articles'
import { Inter } from 'next/font/google'
import { GoogleAnalytics } from '@next/third-parties/google'
import { ThemeProvider } from '@/components/theme-provider'
import { SiteLayout } from '@/components/SiteLayout'
// We need to ensure ThemeProvider exists or is created/migrated. 
// Standard shadcn creates it. I'll check components/theme-provider.tsx later but assume it exists or I'll create it.
// Actually MIGRATION_GUIDE says "layout.tsx # 根布局（含 GA4）".
// The import is `import { ThemeProvider } from '@/components/theme-provider'`.
// I will need to check if that file exists in `components`. It was likely in `src/components/theme-provider`.
import './globals.css'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
    metadataBase: new URL('https://xiaoker.com'),
    title: {
        default: '啸傲的兔子洞-好奇心的自然选择',
        template: '%s | 啸傲的兔子洞'
    },
    description: '我在这里记录关于投资、科技、成长等方面的思考，探索精神自由和财富自由。',
    openGraph: {
        title: '啸傲的兔子洞-好奇心的自然选择',
        description: '我在这里记录关于投资、科技、成长等方面的思考。',
        url: 'https://xiaoker.com',
        siteName: '啸傲的兔子洞',
        locale: 'zh_CN',
        type: 'website',
        images: [
            {
                url: 'https://xiaoker.com/og-image.png',
                width: 1200,
                height: 630,
                alt: '啸傲的兔子洞',
            }
        ],
    },
    robots: {
        index: true,
        follow: true,
        googleBot: {
            index: true,
            follow: true,
            'max-video-preview': -1,
            'max-image-preview': 'large',
            'max-snippet': -1,
        },
    },
    twitter: {
        title: '啸傲的兔子洞',
        card: 'summary_large_image',
    },
    alternates: {
        types: {
            'application/rss+xml': '/feed.xml',
        },
    },
    icons: {
        icon: [
            { url: '/favicon.ico' },
            { url: '/favicon-16x16.png', sizes: '16x16', type: 'image/png' },
            { url: '/favicon-32x32.png', sizes: '32x32', type: 'image/png' },
        ],
        apple: [
            { url: '/apple-touch-icon.png', sizes: '180x180', type: 'image/png' },
        ],
    },
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const categories = getAllCategories();

    return (
        <html lang="zh-CN" suppressHydrationWarning>
            <body className={inter.className}>
                <ThemeProvider
                    attribute="class"
                    defaultTheme="system"
                    enableSystem
                    disableTransitionOnChange
                >
                    <SiteLayout categories={categories}>
                        {children}
                    </SiteLayout>
                </ThemeProvider>
            </body>
            <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID || ""} />
        </html>
    )
}
