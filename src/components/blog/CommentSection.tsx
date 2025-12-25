export function CommentSection() {
  return (
    <section className="mt-16 pt-8 border-t border-border">
      <h3 className="text-xl font-semibold mb-6">评论</h3>
      
      {/* 
        Giscus 评论系统接入点
        在 Next.js 中使用时，替换为 Giscus 组件：
        
        import Giscus from '@giscus/react';
        
        <Giscus
          repo="your-username/your-repo"
          repoId="your-repo-id"
          category="Announcements"
          categoryId="your-category-id"
          mapping="pathname"
          reactionsEnabled="1"
          emitMetadata="0"
          inputPosition="top"
          theme="preferred_color_scheme"
          lang="zh-CN"
        />
      */}
      
      <div className="p-8 bg-secondary/30 rounded-lg text-center">
        <p className="text-muted-foreground mb-2">
          评论功能占位区域
        </p>
        <p className="text-sm text-muted-foreground">
          在 Next.js 中使用 <code className="bg-secondary px-1.5 py-0.5 rounded text-xs">@giscus/react</code> 接入评论系统
        </p>
      </div>
    </section>
  );
}