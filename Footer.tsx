import { Link } from "@tanstack/react-router";
import { Instagram, Facebook, Mail, Phone } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";

export function Footer() {
  const { t } = useI18n();
  return (
    <footer className="relative mt-24 border-t border-accent/30">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-16 grid gap-12 md:grid-cols-4">
        <div>
          <div className="font-display text-2xl font-black mb-3">
            Ô <span className="text-accent">Saveurs</span> fruitées
          </div>
          <p className="text-sm text-muted-foreground max-w-xs leading-relaxed">{t.footer.tagline}</p>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-accent mb-4 font-sans font-semibold">
            {t.footer.explore}
          </h4>
          <ul className="space-y-2.5 text-sm">
            {[
              { to: "/menu", label: t.nav.menu },
              { to: "/events", label: t.nav.events },
              { to: "/story", label: t.nav.story },
              { to: "/gallery", label: t.nav.gallery },
              { to: "/contact", label: t.nav.contact },
            ].map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="text-foreground/75 hover:text-accent transition-colors">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-accent mb-4 font-sans font-semibold">
            {t.footer.contact}
          </h4>
          <ul className="space-y-2.5 text-sm text-foreground/75">
            <li className="flex items-center gap-2"><Phone className="size-4 text-accent" /> +33 0 00 00 00 00</li>
            <li className="flex items-center gap-2"><Mail className="size-4 text-accent" /> hello@osaveursfruitees.com</li>
            <li>{t.footer.locations}</li>
          </ul>
        </div>
        <div>
          <h4 className="text-xs uppercase tracking-[0.2em] text-accent mb-4 font-sans font-semibold">
            {t.footer.follow}
          </h4>
          <div className="flex gap-3">
            <a href="#" aria-label="Instagram" className="p-2 rounded-full border border-border hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all">
              <Instagram className="size-4" />
            </a>
            <a href="#" aria-label="Facebook" className="p-2 rounded-full border border-border hover:bg-accent hover:text-accent-foreground hover:border-accent transition-all">
              <Facebook className="size-4" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t border-border/40">
        <div className="mx-auto max-w-7xl px-5 md:px-8 py-6 flex flex-col sm:flex-row justify-between items-center gap-3 text-xs text-muted-foreground">
          <span>© {new Date().getFullYear()} Ô Saveurs fruitées. {t.footer.rights}</span>
          <span>{t.footer.locations}</span>
        </div>
      </div>
    </footer>
  );
}
