import { Github, Twitter } from "lucide-react";

const Jike = (props: React.ComponentProps<"svg">) => (
  <svg
    viewBox="0 0 24 24"
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12.24 3.5c-4.97 0-9 3.84-9 8.57 0 4.74 3.97 8.58 8.9 8.58 4.96 0 8.94-3.75 8.94-8.49 0-4.73-3.9-8.58-8.84-8.66zm.6 13.52c-2.3 0-3.8-1.57-3.8-3.7V7.5h2.1v5.7c0 1.07.67 1.7 1.66 1.7 1.02 0 1.65-.63 1.65-1.7V7.5h2.1v5.8c0 2.15-1.53 3.72-3.7 3.72z" />
  </svg>
);

const socialLinks = [
  { icon: Github, href: "https://github.com/xiaoker", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/xiaoker", label: "Twitter" },
  { icon: Jike, href: "https://web.okjike.com/u/AFFE2178-78E4-4465-9B48-6BC12E851D27", label: "即刻" },
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