import { Link } from "react-router-dom";
import { Layout, PageContainer } from "@/components/blog";
import { Button } from "@/components/ui/button";
import { Home } from "lucide-react";

export default function NotFound() {
  return (
    <Layout>
      <PageContainer className="flex flex-col items-center justify-center text-center">
        <h1 className="text-8xl font-bold text-muted-foreground/30 mb-4">404</h1>
        <h2 className="text-2xl font-semibold mb-2">页面未找到</h2>
        <p className="text-muted-foreground mb-8 max-w-md">
          抱歉，您访问的页面不存在。可能是链接已过期或页面已被移动。
        </p>
        <Button asChild>
          <Link to="/">
            <Home className="mr-2 h-4 w-4" />
            返回首页
          </Link>
        </Button>
      </PageContainer>
    </Layout>
  );
}