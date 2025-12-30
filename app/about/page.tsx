import { PageContainer } from "@/components/blog/PageContainer";
import { Github, Twitter } from "lucide-react";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: "关于我",
};

const socialLinks = [
    { icon: Github, href: "https://github.com/xiaoker", label: "GitHub" },
    { icon: Twitter, href: "https://x.com/xiaoker", label: "Twitter" },
];

export default function AboutPage() {
    return (
        <PageContainer>
            <article className="prose dark:prose-invert">
                <h1>关于我</h1>

                <p>
                    你好！我是 啸傲，一个跟随好奇心探索的人。
                </p>

                <p>
                    这个博客是我记录投资、思考和生活感悟的地方。
                    我相信写作是整理思路的最好方式，通过持续的输出来促进输入和思考。
                </p>

                <h2>我的兴趣</h2>
                <ul>
                    <li>投资、🏂滑雪、户外</li>
                    <li>阅读与写作</li>
                </ul>

                <h2>联系方式</h2>
                <p>
                    欢迎通过以下方式与我联系：
                </p>
            </article>

            {/* Social Links */}
            <div className="flex items-center gap-6 mt-8">
                {socialLinks.map((link) => (
                    <a
                        key={link.label}
                        href={link.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
                    >
                        <link.icon className="h-5 w-5" />
                        <span>{link.label}</span>
                    </a>
                ))}
            </div>
        </PageContainer>
    );
}
