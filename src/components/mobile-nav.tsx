"use client";

import { useState } from "react";
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
          <SheetHeader className="px-4 py-4 border-b border-border/40">
            <SheetTitle className="text-left text-base">
              <span className="text-primary">Traversy</span>
              <span className="text-muted-foreground font-normal">
                {" "}
                Indexed
              </span>
            </SheetTitle>
          </SheetHeader>
          <div className="overflow-y-auto h-full">{children}</div>
        </SheetContent>
      </Sheet>
    </>
  );
}
