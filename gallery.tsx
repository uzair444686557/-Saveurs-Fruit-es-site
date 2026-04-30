import { createFileRoute } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight } from "lucide-react";
import { useState, useCallback, useEffect } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { Reveal, RevealItem } from "@/components/site/Reveal";

import g1 from "@/assets/gallery-1.jpg";
import g2 from "@/assets/gallery-2.jpg";
import g3 from "@/assets/gallery-3.jpg";
import g4 from "@/assets/gallery-4.jpg";
import g5 from "@/assets/gallery-5.jpg";
import g6 from "@/assets/gallery-6.jpg";
import juice from "@/assets/signature-juice.jpg";
import wrap from "@/assets/signature-wrap.jpg";
import granite from "@/assets/signature-granite.jpg";

const images = [g1, g3, juice, g4, granite, g5, wrap, g2, g6];

export const Route = createFileRoute("/gallery")({
  head: () => ({
    meta: [
      { title: "Galerie — Ô Saveurs fruitées" },
      { name: "description", content: "Quelques instants capturés sur la route : événements, créations, ambiance du food truck." },
      { property: "og:title", content: "Galerie — Ô Saveurs fruitées" },
      { property: "og:description", content: "Photos de notre food truck en action." },
      { property: "og:image", content: g1 },
    ],
  }),
  component: GalleryPage,
});

function GalleryPage() {
  const { t } = useI18n();
  const [active, setActive] = useState<number | null>(null);

  const next = useCallback(() => setActive((i) => (i === null ? null : (i + 1) % images.length)), []);
  const prev = useCallback(() => setActive((i) => (i === null ? null : (i - 1 + images.length) % images.length)), []);

  useEffect(() => {
    if (active === null) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setActive(null);
      if (e.key === "ArrowRight") next();
      if (e.key === "ArrowLeft") prev();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [active, next, prev]);

  return (
    <div className="pt-32 md:pt-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <RevealItem>
            <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">
              {t.nav.gallery}
            </p>
          </RevealItem>
          <RevealItem>
            <h1 className="font-display text-5xl md:text-7xl font-black text-balance mb-5">
              {t.nav.gallery}
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="text-lg text-muted-foreground">{t.pages.gallerySub}</p>
          </RevealItem>
        </Reveal>

        <div className="columns-1 sm:columns-2 lg:columns-3 gap-4 [column-fill:_balance]">
          {images.map((src, i) => (
            <motion.button
              key={i}
              onClick={() => setActive(i)}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.6, delay: (i % 6) * 0.08, ease: [0.22, 1, 0.36, 1] }}
              className="group relative mb-4 block w-full overflow-hidden rounded-xl break-inside-avoid"
              aria-label={`Open image ${i + 1}`}
            >
              <img
                src={src}
                alt={`Galerie ${i + 1}`}
                loading="lazy"
                className="w-full h-auto transition-transform duration-1000 group-hover:scale-110"
              />
              <div className="absolute inset-0 bg-accent/0 group-hover:bg-accent/55 transition-colors duration-500" />
            </motion.button>
          ))}
        </div>
      </div>

      <AnimatePresence>
        {active !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[150] bg-background/95 backdrop-blur-md flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <button
              onClick={() => setActive(null)}
              className="absolute top-5 right-5 p-3 rounded-full bg-card/80 hover:bg-accent hover:text-accent-foreground transition"
              aria-label="Close"
            >
              <X className="size-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); prev(); }}
              className="absolute left-4 md:left-8 p-3 rounded-full bg-card/80 hover:bg-accent hover:text-accent-foreground transition"
              aria-label="Previous"
            >
              <ChevronLeft className="size-5" />
            </button>
            <button
              onClick={(e) => { e.stopPropagation(); next(); }}
              className="absolute right-4 md:right-8 p-3 rounded-full bg-card/80 hover:bg-accent hover:text-accent-foreground transition"
              aria-label="Next"
            >
              <ChevronRight className="size-5" />
            </button>
            <motion.img
              key={active}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.3 }}
              src={images[active]}
              alt={`Image ${active + 1}`}
              onClick={(e) => e.stopPropagation()}
              className="max-w-[90vw] max-h-[85vh] object-contain rounded-lg"
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
