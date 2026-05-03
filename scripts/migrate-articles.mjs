/**
 * 迁移脚本：将 Next.js MDX 文章的 frontmatter 转换为 astro-paper 格式
 * 
 * 字段映射：
 *   date       → pubDatetime (ISO 8601)
 *   excerpt    → description
 *   category   → tags (数组)
 *   cover      → ogImage
 */

import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const SOURCE_DIR = path.join(__dirname, "../content/articles");
const DEST_DIR = path.join(__dirname, "../src/data/blog");

// 确保目标目录存在
if (!fs.existsSync(DEST_DIR)) {
  fs.mkdirSync(DEST_DIR, { recursive: true });
}

// 解析 frontmatter（简单实现，适用于 YAML 格式）
function parseFrontmatter(content) {
  const match = content.match(/^---\n([\s\S]*?)\n---\n([\s\S]*)$/);
  if (!match) return null;
  
  const fmLines = match[1];
  const body = match[2];
  const fm = {};
  
  // 解析每一行，支持带引号的值
  for (const line of fmLines.split("\n")) {
    const colonIdx = line.indexOf(":");
    if (colonIdx === -1) continue;
    const key = line.slice(0, colonIdx).trim();
    let val = line.slice(colonIdx + 1).trim();
    // 去掉外层引号
    if ((val.startsWith('"') && val.endsWith('"')) || (val.startsWith("'") && val.endsWith("'"))) {
      val = val.slice(1, -1);
    }
    fm[key] = val;
  }
  
  return { fm, body };
}

// 将 date 字符串转为 ISO 8601
function toISODate(dateStr) {
  if (!dateStr) return new Date().toISOString();
  // 支持 "2026-04-29" 或 "2026-04-29T..." 格式
  if (dateStr.includes("T")) return dateStr;
  return `${dateStr}T00:00:00.000Z`;
}

// 转换单个文件
function migrateFile(srcPath) {
  const content = fs.readFileSync(srcPath, "utf-8");
  const parsed = parseFrontmatter(content);
  if (!parsed) {
    console.warn(`⚠️  跳过（无 frontmatter）: ${path.basename(srcPath)}`);
    return;
  }
  
  const { fm, body } = parsed;
  
  // 构建新的 frontmatter
  const newFm = {
    title: fm.title || "",
    pubDatetime: toISODate(fm.date),
    description: fm.excerpt || fm.description || "",
    tags: fm.category ? `["${fm.category}"]` : '[]',
    draft: false,
    ...(fm.cover ? { ogImage: fm.cover } : {}),
  };
  
  // 生成新的 frontmatter 文本
  const fmLines = [
    `---`,
    `title: "${newFm.title}"`,
    `pubDatetime: ${newFm.pubDatetime}`,
    `description: "${newFm.description}"`,
    `tags: ${newFm.tags}`,
    `draft: ${newFm.draft}`,
    ...(newFm.ogImage ? [`ogImage: "${newFm.ogImage}"`] : []),
    `---`,
  ].join("\n");
  
  const newContent = fmLines + "\n" + body;
  
  // 写入目标目录（.mdx 改 .md，astro-paper 默认用 .md）
  const fileName = path.basename(srcPath);
  const destPath = path.join(DEST_DIR, fileName);
  fs.writeFileSync(destPath, newContent, "utf-8");
  console.log(`✅ 已迁移: ${fileName}`);
  console.log(`   date: ${fm.date} → pubDatetime: ${newFm.pubDatetime}`);
  console.log(`   category: ${fm.category} → tags: ${newFm.tags}`);
  if (fm.cover) console.log(`   cover: ${fm.cover} → ogImage: ${newFm.ogImage}`);
}

// 处理所有 .mdx 文件（排除目录）
const files = fs.readdirSync(SOURCE_DIR).filter(f => f.endsWith(".mdx") || f.endsWith(".md"));
console.log(`\n📂 找到 ${files.length} 篇文章，开始迁移...\n`);

for (const file of files) {
  const srcPath = path.join(SOURCE_DIR, file);
  const stat = fs.statSync(srcPath);
  if (stat.isDirectory()) continue;
  migrateFile(srcPath);
}

console.log(`\n🎉 迁移完成！文章已写入: ${DEST_DIR}`);
