# 博客图片组织结构文档

## 📁 目录结构

```
public/images/
├── site/                              # 博客自身图片
│   ├── logo.png
│   ├── logo-icon.png
│   ├── og-image.jpeg
│   ├── xiaoker-avatar.jpg
│   └── placeholder.svg
│
├── articles/                          # 文章图片
│   ├── [article-slug]/               # 按文章slug组织
│   │   ├── cover.png                 # 文章封面(可选)
│   │   ├── illustration-*.png        # 文章插图
│   │   └── screenshot-*.png          # 截图等
│   │
│   ├── 10x-identity-guiding-principles/
│   │   ├── illustration-inner-voice.png
│   │   ├── illustration-10x-vs-2x.png
│   │   ├── illustration-unique-ability.png
│   │   ├── illustration-leverage-position.png
│   │   ├── illustration-pareto-principle.png
│   │   ├── illustration-evolution-function.png
│   │   └── illustration-emptiness-clarity.png
│   │
│   ├── grateful-for-my-curiosity/
│   │   └── life-paths.png
│   │
│   ├── how-to-distinguish-signal-from-noise-in-life/
│   │   ├── illustration-inner-voice.png
│   │   ├── illustration-positive-feedback.png
│   │   ├── illustration-feedback-comparison.png
│   │   ├── illustration-signal-noise.png
│   │   └── illustration-reward-compensation.png
│   │
│   └── shared/                       # 多篇文章共用的图片(可选)
│       └── common-diagram.png
│
└── categories/                        # 分类页图片(可选)
    ├── tech.png
    └── growth.png
```

## 🔗 图片引用规则

### 在 MDX 文章中

```markdown
<!-- 文章插图 -->
![描述](/images/articles/[article-slug]/illustration-name.png)

<!-- 示例 -->
![倾听内心的声音](/images/articles/how-to-distinguish-signal-from-noise-in-life/illustration-inner-voice.png)
```

### 在 Frontmatter 中

```markdown
---
title: "文章标题"
cover: "/images/articles/[article-slug]/cover.png"
---
```

### 在组件代码中

```tsx
// 博客自身图片
<img src="/images/site/logo.png" alt="Logo" />
<img src="/images/site/xiaoker-avatar.jpg" alt="Avatar" />

// 文章图片
<img src="/images/articles/article-slug/image.png" alt="Description" />
```

## 📝 新文章工作流

### 1. 创建文章和图片目录

```bash
# 创建文章文件
touch content/articles/my-new-article.mdx

# 创建对应的图片目录
mkdir -p public/images/articles/my-new-article
```

### 2. 添加图片

将图片保存到文章对应的目录:

```bash
# 示例:添加封面和插图
public/images/articles/my-new-article/
  ├── cover.png
  ├── illustration-concept-a.png
  └── illustration-concept-b.png
```

### 3. 在文章中引用

```markdown
---
title: "我的新文章"
cover: "/images/articles/my-new-article/cover.png"
---

正文内容...

![概念A](/images/articles/my-new-article/illustration-concept-a.png)

更多内容...

![概念B](/images/articles/my-new-article/illustration-concept-b.png)
```

## 🎯 文件命名规范

### 文章图片命名

```
cover.png                          # 封面图(如果有)
illustration-[concept-name].png    # 插图,用概念名称
screenshot-[number].png            # 截图,用数字或描述
diagram-[name].png                 # 图表
```

### 命名规则

- ✅ 使用小写字母和连字符(kebab-case)
- ✅ 包含有意义的描述
- ✅ 避免中文和特殊字符
- ✅ 保持简洁但清晰

例如:
- `illustration-inner-voice.png` ✅
- `illustration-positive-feedback.png` ✅
- `图片1.png` ❌ (中文)
- `img_001.png` ❌ (无意义)

## 🔍 已更新的文件

重组过程中更新了以下文件的图片引用:

### 核心组件
- `app/layout.tsx` - og-image 路径
- `app/articles/[slug]/page.tsx` - 默认 og-image 和 avatar路径
- `components/HomePageClient.tsx` - avatar 路径
- `components/blog/Header.tsx` - logo-icon 路径

### 文章文件
- `content/articles/10x-identity-guiding-principles.mdx` - 7张插图路径
- `content/articles/grateful-for-my-curiosity.mdx` - cover 和 life-paths 路径
- `content/articles/how-to-distinguish-signal-from-noise-in-life.mdx` - 5张插图路径

## ⚡ 图片优化建议

### 1. 格式选择
- **照片/复杂图像**: 使用 WebP 或 JPEG
- **插图/图标**: 使用 PNG 或 SVG
- **简单图形**: 优先使用 SVG

### 2. 尺寸建议
- **封面图**: 1200x630 (og:image标准)
- **文章插图**: 宽度不超过 1200px
- **缩略图**: 300x200 左右

### 3. 压缩工具
- 在线: [TinyPNG](https://tinypng.com/), [Squoosh](https://squoosh.app/)
- CLI: imagemin, sharp
- 构建时: next-image-export-optimizer

## 📊 当前状态统计

- **博客自身图片**: 5个(site目录)
- **文章图片总数**: 13个(3篇文章)
  - 10x-identity-guiding-principles: 7张插图
  - grateful-for-my-curiosity: 1张图(life-paths)
  - how-to-distinguish-signal-from-noise-in-life: 5张插图
- **总更新文件数**: 7个(4个组件 + 3个MDX文章)

## 🎉 优势总结

采用这个结构后:

✅ **清晰**: 一看就知道图片属于哪篇文章或哪个部分
✅ **可维护**: 删除文章时可以一起删除对应图片目录
✅ **可扩展**: 未来添加封面图、多图等都很方便
✅ **避免冲突**: 不同文章可以使用同名图片而不冲突
✅ **易于协作**: 团队成员容易理解和遵循规范

## 📌 注意事项

1. **绝对路径**: 所有图片路径都使用绝对路径,以 `/` 开头
2. **public目录**: 只有 `public/` 目录下的文件才能被 Next.js 访问
3. **路径匹配**: 图片路径必须与文章 slug 对应(kebab-case)
4. **构建验证**: 发布前检查所有图片是否正确显示
5. **CDN准备**: 未来可以考虑将图片迁移到CDN,目录结构保持不变
