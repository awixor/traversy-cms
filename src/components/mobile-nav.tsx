"use client";

import { useState } from "react";
import Image from "next/image";
import { Menu } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
} from "@/components/ui/sheet";

interface MobileNavProps {
  children: React.ReactNode;
}

export function MobileNav({ children }: MobileNavProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Button
        variant="ghost"
        size="icon"
        className="lg:hidden"
        onClick={() => setOpen(true)}
        aria-label="Open navigation"
      >
        <Menu className="h-5 w-5" />
      </Button>

      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="left" className="w-64 p-0">
          <SheetHeader className="px-5 py-5 border-b border-border/40">
            <SheetTitle className="text-left">
              <div className="flex items-center gap-2.5">
                <div className="relative flex h-9 w-9 items-center justify-center overflow-hidden rounded-xl bg-primary/5">
                  <Image
                    src="/logo.png"
                    alt="Traversy Logo"
                    width={32}
                    height={32}
                    className="h-7 w-7 object-contain"
                  />
                </div>
                <span className="text-muted-foreground font-bold tracking-tighter text-2xl">
                  Index<span className="text-primary inline-block">ed</span>
                </span>
              </div>
            </SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-full">{children}</div>
        </SheetContent>
      </Sheet>
    </>
  );
}
