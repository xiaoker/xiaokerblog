import { Github, Twitter } from "lucide-react";

const Jike = (props: React.ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <rect width="24" height="24" rx="6" fill="#FFE411" />
    <path
      d="M8.615 16.538c-1.423 0-2.308-.885-2.308-2.308V8.692h2.308v5.539c0 .423.23.692.615.692.385 0 .616-.27.616-.693V8.693h2.307v5.615c0 2.23-1.615 3.77-3.692 3.77-.539 0-1.077-.116-1.539-.347"
      fill="#F9F9F9"
    />
    <path
      d="M11.692 14.308c.539 0 1.077.116 1.539.347.385.192.654.461.808.807l-1.923-3.846-2.5-5h2.1l1.5 3 1.5-3h2.1l-2.5 5 2.1 4.2h-2.308l-1.23-2.462-1.23 2.462h-2.308l2.1-4.2"
      fill="#3DAEE9"
      fillOpacity="0" // The provided logo looks simpler, just a J. I'll stick to a clean symbolic J if I can't trace perfectly.
    // Actually, let's use a simplified path based on the user's image: Yellow rounded square, white 'J' with a blue shadow/accent.
    // Since I cannot trace complex shapes perfectly from mind, I will use the established Jike yellow brand color #FFE411 and a white J shape.
    // The previous path I used was the "J" shape itself. Let's put that inside a rect.
    />
    <path
      d="M13.24 6.5c0 0-2 .1-3 1.5-.6.8-1 2.5-1 4.5 0 2 1.5 3.5 3.5 3.5 1.5 0 3-1 3-3V6.5h-2.5z"
      fill="white"
    />
    <path
      d="M12.5 7.5L9.5 13.5"
      stroke="#3DAEE9"
      strokeWidth="2"
      strokeLinecap="round"
    />
  </svg>
);

// Actually, let's look at the image provided. It's a yellow rounded square with a white "J" that has a blue accent at the bottom.
// I will try to approximate this.
const JikeIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 1024 1024" version="1.1" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect x="0" y="0" width="1024" height="1024" rx="200" ry="200" fill="#FFE411" />
    <path d="M512 256h-100v300c0 100-50 150-150 150s-150-50-150-150v-100h-100v100c0 150 100 250 250 250s250-100 250-250v-300z" fill="#FFFFFF" />
    <path d="M412 556c0 100-50 150-150 150s-150-50-150-150v-100h-100v100c0 150 100 250 250 250s250-100 250-250z" fill="#3DAEE9" fillOpacity="0.3" transform="translate(10, 10)" /> {/* Fake shadow for depth if needed, but actually the referenced logo is simpler */}
  </svg>
);
// Retrying with a better approximation of the "J" from the image.
const RealJikeIcon = (props: React.ComponentProps<"svg">) => (
  <svg viewBox="0 0 60 60" fill="none" xmlns="http://www.w3.org/2000/svg" {...props}>
    <rect width="60" height="60" rx="14" fill="#FFE411" />
    <path d="M33.64 16.54V38C33.64 43.15 30.2 45.47 26.54 45.47C23.51 45.47 20.92 43.6 20.35 41.05H26.83C27.05 41.52 27.42 41.87 28.16 41.87C29.28 41.87 29.81 40.87 29.81 38.6V22.6L20.61 41.67L19.22 41L28.84 21.32L30.98 16.54H33.64Z" fill="white" />
    <path d="M28.84 21.32L19.22 41L20.61 41.67L29.81 22.6V24.6C29.81 23.6 29.5 22.5 28.84 21.32Z" fill="#58C2F0" />
  </svg>
);

const socialLinks = [
  { icon: Github, href: "https://github.com/xiaoker", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/xiaoker", label: "Twitter" },
  { icon: RealJikeIcon, href: "https://web.okjike.com/u/AFFE2178-78E4-4465-9B48-6BC12E851D27", label: "即刻" },
];

export function Footer() {
  return (
    <footer className="border-t border-border mt-16">
      <div className="content-container-wide py-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-4">
          {/* Copyright */}
          <p className="text-sm text-muted-foreground">
            © 2026 xiaoker.com All rights reserved.
          </p>

          {/* Social Links */}
          <div className="flex items-center space-x-4">
            {socialLinks.map((link) => (
              <a
                key={link.label}
                href={link.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-muted-foreground hover:text-foreground transition-colors"
                aria-label={link.label}
              >
                <link.icon className="h-5 w-5" />
              </a>
            ))}
          </div>
        </div>
      </div>
    </footer>
  );
}