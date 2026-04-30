import { createFileRoute, Link } from "@tanstack/react-router";
import { ArrowRight, Check } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { Reveal, RevealItem } from "@/components/site/Reveal";
import eventsImg from "@/assets/events-banner.jpg";
import storyDetail from "@/assets/story-detail.jpg";

export const Route = createFileRoute("/events")({
  head: () => ({
    meta: [
      { title: "Événements privés et professionnels — Ô Saveurs fruitées" },
      { name: "description", content: "Réservez le food truck pour vos mariages, séminaires, lancements et festivals. Service clé en main." },
      { property: "og:title", content: "Événements — Ô Saveurs fruitées" },
      { property: "og:description", content: "Mariages, séminaires, festivals. Le truck, l'énergie, les saveurs." },
      { property: "og:image", content: eventsImg },
    ],
  }),
  component: EventsPage,
});

function EventsPage() {
  const { t } = useI18n();
  return (
    <div className="pt-32 md:pt-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <RevealItem>
            <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">
              {t.featured.eyebrow}
            </p>
          </RevealItem>
          <RevealItem>
            <h1 className="font-display text-5xl md:text-7xl font-black text-balance mb-5">
              {t.pages.eventsTitle}
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="text-lg text-muted-foreground">{t.pages.eventsSub}</p>
          </RevealItem>
        </Reveal>

        <div className="grid md:grid-cols-2 gap-6 mb-20">
          {[
            { title: t.pages.privateTitle, body: t.pages.privateBody, img: eventsImg },
            { title: t.pages.proTitle, body: t.pages.proBody, img: storyDetail },
          ].map((p, i) => (
            <article
              key={i}
              className="group relative overflow-hidden rounded-2xl border border-border/50 hover:border-accent/60 transition-all"
            >
              <div className="aspect-[4/3] overflow-hidden">
                <img
                  src={p.img}
                  alt={p.title}
                  loading="lazy"
                  className="size-full object-cover transition-transform duration-1000 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-transparent" />
              </div>
              <div className="absolute bottom-0 left-0 right-0 p-7">
                <h2 className="font-display text-3xl font-bold mb-2">{p.title}</h2>
                <p className="text-sm text-foreground/80 max-w-md">{p.body}</p>
              </div>
            </article>
          ))}
        </div>

        <div className="rounded-2xl bg-card border border-border/50 p-8 md:p-12 mb-16">
          <h3 className="font-display text-2xl md:text-3xl font-bold mb-6">{t.pages.includes}</h3>
          <ul className="grid sm:grid-cols-2 gap-4">
            {t.pages.includesList.map((it, i) => (
              <li key={i} className="flex gap-3 items-start">
                <span className="mt-0.5 grid place-items-center size-6 rounded-full bg-accent/20 text-accent shrink-0">
                  <Check className="size-3.5" />
                </span>
                <span className="text-sm">{it}</span>
              </li>
            ))}
          </ul>
        </div>

        <div className="text-center pb-8">
          <Link
            to="/contact"
            className="shine-btn inline-flex items-center gap-2 rounded-full bg-primary px-7 py-4 text-sm font-bold text-primary-foreground hover:shadow-[var(--shadow-glow)] transition-all"
          >
            {t.featured.cta}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </div>
  );
}
