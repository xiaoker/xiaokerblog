import { Github, Twitter } from "lucide-react";

const socialLinks = [
  { icon: Github, href: "https://github.com/xiaoker", label: "GitHub" },
  { icon: Twitter, href: "https://x.com/xiaoker", label: "Twitter" },
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