import * as React from "react";
import { ChevronLeftIcon, ChevronRightIcon } from "@plankui/icons";
import { cn } from "@/lib/cn";
import { Dialog, DialogContent, DialogDescription, DialogTitle } from "./dialog";

export interface LightboxImage {
  src: string;
  alt: string;
  caption?: React.ReactNode;
}

export interface LightboxProps {
  images: LightboxImage[];
  /** Thumbnail grid columns. */
  columns?: 2 | 3 | 4;
  className?: string;
}

/** A grid of thumbnails that opens each image large, with previous and next by button or arrow key. */
export function Lightbox({ images, columns = 3, className }: LightboxProps) {
  const [open, setOpen] = React.useState<number | null>(null);
  const go = (d: number) => setOpen((i) => (i === null ? i : (i + d + images.length) % images.length));
  const img = open === null ? null : images[open];
  return (
    <>
      <ul className={cn("grid gap-2", columns === 2 ? "grid-cols-2" : columns === 4 ? "grid-cols-2 sm:grid-cols-4" : "grid-cols-2 sm:grid-cols-3", className)}>
        {images.map((im, i) => (
          <li key={im.src}>
            <button
              type="button"
              onClick={() => setOpen(i)}
              aria-label={`Open ${im.alt}`}
              className="block aspect-[4/3] w-full overflow-hidden rounded-tile bg-paper-2 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-focus"
            >
              <img src={im.src} alt="" loading="lazy" className="size-full object-cover transition-transform duration-[var(--dur-short)] hover:scale-[1.03]" />
            </button>
          </li>
        ))}
      </ul>
      <Dialog open={open !== null} onOpenChange={(o) => !o && setOpen(null)}>
        <DialogContent
          className="max-w-4xl gap-3 p-3"
          onKeyDown={(e) => {
            if (e.key === "ArrowLeft") go(-1);
            if (e.key === "ArrowRight") go(1);
          }}
        >
          {img && (
            <>
              <DialogTitle className="sr-only">{img.alt}</DialogTitle>
              <DialogDescription className="sr-only">Image {open! + 1} of {images.length}. Use the arrow keys for the others.</DialogDescription>
              <div className="relative overflow-hidden rounded-tile bg-paper-2">
                <img src={img.src} alt={img.alt} className="max-h-[75svh] w-full object-contain" />
                {images.length > 1 && (
                  <>
                    <NavButton side="left" onClick={() => go(-1)} />
                    <NavButton side="right" onClick={() => go(1)} />
                  </>
                )}
              </div>
              <div className="flex items-baseline justify-between gap-3 px-1 pb-1 text-sm">
                <span className="text-ink-2">{img.caption ?? img.alt}</span>
                <span className="shrink-0 tabular-nums text-muted">{open! + 1} / {images.length}</span>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </>
  );
}

function NavButton({ side, onClick }: { side: "left" | "right"; onClick: () => void }) {
  const Icon = side === "left" ? ChevronLeftIcon : ChevronRightIcon;
  return (
    <button
      type="button"
      onClick={onClick}
      aria-label={side === "left" ? "Previous image" : "Next image"}
      className={cn(
        "absolute top-1/2 grid size-9 -translate-y-1/2 place-items-center rounded-pill bg-paper/85 text-ink shadow-key backdrop-blur hover:bg-paper focus-visible:outline-2 focus-visible:outline-focus",
        side === "left" ? "left-3" : "right-3",
      )}
    >
      <Icon className="size-4" />
    </button>
  );
}
