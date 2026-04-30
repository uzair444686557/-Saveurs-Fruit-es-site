import { Link, useLocation } from "@tanstack/react-router";
import { motion, AnimatePresence, useScroll, useMotionValueEvent } from "framer-motion";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import { useI18n } from "@/i18n/I18nProvider";
import { LangToggle } from "./LangToggle";

type NavKey = "home" | "menu" | "events" | "story" | "gallery" | "contact";
const links: { to: string; key: NavKey }[] = [
  { to: "/", key: "home" },
  { to: "/menu", key: "menu" },
  { to: "/events", key: "events" },
  { to: "/story", key: "story" },
  { to: "/gallery", key: "gallery" },
];

export function Navbar() {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const { scrollY } = useScroll();
  const { pathname } = useLocation();
  const onHero = pathname === "/";

  useMotionValueEvent(scrollY, "change", (v) => setScrolled(v > 40));

  return (
    <>
      <motion.header
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1], delay: 0.1 }}
        className={`fixed top-0 inset-x-0 z-50 transition-all duration-500 ${
          scrolled || !onHero
            ? "bg-background/70 backdrop-blur-xl border-b border-border/40"
            : "bg-transparent"
        }`}
      >
        <div className="mx-auto max-w-7xl px-5 md:px-8 h-16 md:h-20 flex items-center justify-between gap-6">
          <Link to="/" className="flex items-center gap-2 group" aria-label="Ô Saveurs fruitées">
            <span className="font-display text-xl md:text-2xl font-black tracking-tight">
              Ô <span className="text-accent">Saveurs</span> fruitées
            </span>
          </Link>

          <nav className="hidden lg:flex items-center gap-8 text-sm font-medium">
            {links.map((l) => (
              <Link
                key={l.to}
                to={l.to}
                activeOptions={{ exact: l.to === "/" }}
                className="underline-slide pb-1 text-foreground/85 hover:text-foreground transition-colors"
              >
                {t.nav[l.key]}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-3">
            <LangToggle />
            <Link
              to="/contact"
              className="hidden sm:inline-flex shine-btn items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 transition-all hover:shadow-[var(--shadow-glow)]"
            >
              {t.nav.cta}
            </Link>
            <button
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              className="lg:hidden p-2 -mr-2"
            >
              <Menu className="size-6" />
            </button>
          </div>
        </div>
      </motion.header>

      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="fixed inset-0 z-[80] bg-background/98 backdrop-blur-2xl flex flex-col"
          >
            <div className="flex items-center justify-between h-16 md:h-20 px-5 md:px-8">
              <span className="font-display text-xl font-black">Ô <span className="text-accent">Saveurs</span></span>
              <button onClick={() => setOpen(false)} aria-label="Close menu" className="p-2 -mr-2">
                <X className="size-6" />
              </button>
            </div>
            <nav className="flex-1 flex flex-col items-center justify-center gap-6 px-6">
              {[...links, { to: "/contact", key: "contact" as NavKey }].map((l, i) => (
                <motion.div
                  key={l.to}
                  initial={{ opacity: 0, x: 60 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.1 + i * 0.08, duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
                >
                  <Link
                    to={l.to}
                    onClick={() => setOpen(false)}
                    className="font-display text-5xl md:text-6xl font-black tracking-tight hover:text-accent transition-colors"
                  >
                    {t.nav[l.key]}
                  </Link>
                </motion.div>
              ))}
              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="pt-6"
              >
                <LangToggle />
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
