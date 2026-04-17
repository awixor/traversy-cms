"use client";

import Link from "next/link";
import Image from "next/image";
import { SearchTrigger } from "@/components/search-trigger";

function GithubIcon({ className }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="currentColor"
      className={className}
      aria-hidden="true"
    >
      <path d="M12 0C5.37 0 0 5.37 0 12c0 5.31 3.435 9.795 8.205 11.385.6.105.825-.255.825-.57 0-.285-.015-1.23-.015-2.235-3.015.555-3.795-.735-4.035-1.41-.135-.345-.72-1.41-1.23-1.695-.42-.225-1.02-.78-.015-.795.945-.015 1.62.87 1.845 1.23 1.08 1.815 2.805 1.305 3.495.99.105-.78.42-1.305.765-1.605-2.67-.3-5.46-1.335-5.46-5.925 0-1.305.465-2.385 1.23-3.225-.12-.3-.54-1.53.12-3.18 0 0 1.005-.315 3.3 1.23.96-.27 1.98-.405 3-.405s2.04.135 3 .405c2.295-1.56 3.3-1.23 3.3-1.23.66 1.65.24 2.88.12 3.18.765.84 1.23 1.905 1.23 3.225 0 4.605-2.805 5.625-5.475 5.925.435.375.81 1.095.81 2.22 0 1.605-.015 2.895-.015 3.3 0 .315.225.69.825.57A12.02 12.02 0 0 0 24 12c0-6.63-5.37-12-12-12z" />
    </svg>
  );
}

interface TopNavProps {
  mobileNavSlot?: React.ReactNode;
  onSearchOpen?: () => void;
}

export function TopNav({ mobileNavSlot, onSearchOpen }: TopNavProps) {
  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/70 backdrop-blur-md transition-all duration-300">
      <div className="flex h-16 items-center gap-4 px-4">
        {/* Mobile menu */}
        {mobileNavSlot}

        {/* Logo */}
        <Link
          href="/"
          className="hidden lg:flex group items-center gap-2.5 font-semibold text-xl shrink-0 transition-opacity hover:opacity-90"
        >
          <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-primary/5 transition-all duration-300 group-hover:bg-primary/10 group-hover:shadow-[0_0_20px_rgba(var(--primary),0.2)]">
            <Image
              src="/logo.png"
              alt="Traversy Logo"
              width={32}
              height={32}
              className="h-7 w-7 object-contain transition-transform duration-500 ease-out group-hover:scale-110"
              priority
            />
          </div>
          <span className="text-muted-foreground font-semibold tracking-tight transition-colors duration-300 group-hover:text-foreground">
            Index<span className="text-primary">ed</span>
          </span>
        </Link>

        {/* Search trigger — centered */}
        <div className="flex flex-1 justify-center px-4">
          <SearchTrigger onClick={onSearchOpen ?? (() => {})} />
        </div>

        {/* GitHub link */}
        <Link
          href="https://github.com/awixor/traversy-cms"
          target="_blank"
          rel="noopener noreferrer"
          className="ml-auto shrink-0 text-muted-foreground hover:text-foreground transition-colors"
          aria-label="GitHub"
        >
          <GithubIcon className="h-5 w-5" />
        </Link>
      </div>
    </header>
  );
}
