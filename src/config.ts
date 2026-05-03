export const SITE = {
  website: "https://xiaoker.com",
  author: "啸傲",
  profile: "https://xiaoker.com",
  desc: "我在这里记录关于投资、科技、成长等方面的思考，探索精神自由和财富自由。",
  title: "啸傲的兔子洞",
  ogImage: "images/site/og-image.jpeg",
  lightAndDarkMode: true,
  postPerIndex: 5,
  postPerPage: 10,
  scheduledPostMargin: 15 * 60 * 1000, // 15 minutes
  showArchives: true,
  showBackButton: true,
  editPost: {
    enabled: false,
    text: "Edit page",
    url: "",
  },
  dynamicOgImage: true,
  dir: "ltr",
  lang: "zh-CN",
  timezone: "Asia/Shanghai",
} as const;
