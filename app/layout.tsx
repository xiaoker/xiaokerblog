import type { Metadata } from 'next'
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
    title: '啸傲的博客-好奇心的自然选择',
    description: '我在这里分享思考、投资与生活',
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
                    <SiteLayout>
                        {children}
                    </SiteLayout>
                </ThemeProvider>
            </body>
            <GoogleAnalytics gaId="G-N2WZREXYDT" />
        </html>
    )
}
