import { Layout, PageContainer } from "@/components/blog";
import { Github, Twitter, Mail } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/xiaoker", label: "GitHub" },
  { icon: Twitter, href: "https://twitter.com/xiaoker", label: "Twitter" },
  { icon: Mail, href: "mailto:hello@xiaoker.com", label: "Email" },
];

export default function AboutPage() {
  return (
    <Layout>
      <PageContainer>
        <article className="prose">
          <h1>关于我</h1>
          
          <p>
            你好！我是 xiaoker，一名独立开发者和设计爱好者。
          </p>

          <p>
            这个博客是我记录技术学习、设计思考和生活感悟的地方。
            我相信写作是整理思路的最好方式，通过持续的输出来促进输入和思考。
          </p>

          <h2>我的兴趣</h2>
          <ul>
            <li>前端开发与用户体验设计</li>
            <li>开源软件与独立开发</li>
            <li>极简主义与效率工具</li>
            <li>阅读与写作</li>
          </ul>

          <h2>技术栈</h2>
          <p>
            日常主要使用 TypeScript、React、Next.js 进行开发。
            喜欢简洁优雅的代码和克制的设计。
          </p>

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
    </Layout>
  );
}