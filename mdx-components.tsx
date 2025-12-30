// mdx-components.tsx
import type { MDXComponents } from 'mdx/types'
import { Callout } from '@/components/mdx/Callout'
import { CodeBlock } from '@/components/mdx/CodeBlock'
import { ImageWithCaption } from '@/components/mdx/ImageWithCaption'
import { Quote } from '@/components/mdx/Quote'

export function useMDXComponents(components: MDXComponents): MDXComponents {
    return {
        // Custom components
        Callout,
        CodeBlock,
        ImageWithCaption,
        Quote,

        // Override default elements
        h1: ({ children, ...props }) => (
            <h1 className="text-3xl font-bold tracking-tight mt-8 mb-4" {...props}>{children}</h1>
        ),
        h2: ({ children, ...props }) => (
            <h2 className="text-2xl font-semibold tracking-tight mt-8 mb-3" {...props}>{children}</h2>
        ),
        h3: ({ children, ...props }) => (
            <h3 className="text-xl font-semibold mt-6 mb-2" {...props}>{children}</h3>
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
        a: ({ href, children }) => {
            const isExternal = href?.startsWith('http') || href?.startsWith('https');
            const props = isExternal ? {
                target: "_blank",
                rel: "nofollow noopener noreferrer"
            } : {};

            return (
                <a href={href} className="text-primary underline underline-offset-4 hover:text-primary/80" {...props}>
                    {children}
                </a>
            )
        },
        ...components,
    }
}
