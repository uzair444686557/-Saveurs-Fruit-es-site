import { createFileRoute } from "@tanstack/react-router";
import { useI18n } from "@/i18n/I18nProvider";
import { Reveal, RevealItem } from "@/components/site/Reveal";
import juiceImg from "@/assets/signature-juice.jpg";
import graniteImg from "@/assets/signature-granite.jpg";
import wrapImg from "@/assets/signature-wrap.jpg";
import hotdogImg from "@/assets/gallery-2.jpg";

export const Route = createFileRoute("/menu")({
  head: () => ({
    meta: [
      { title: "Menu — Ô Saveurs fruitées" },
      { name: "description", content: "Carte du food truck : jus pressés, granités maison, wraps gourmands et hot dogs signature." },
      { property: "og:title", content: "Menu — Ô Saveurs fruitées" },
      { property: "og:description", content: "Jus, granités, wraps, hot dogs. Composés autour des fruits du moment." },
      { property: "og:image", content: juiceImg },
    ],
  }),
  component: MenuPage,
});

function MenuPage() {
  const { t } = useI18n();
  const cats = [
    { ...t.menu.items.juice, img: juiceImg },
    { ...t.menu.items.granite, img: graniteImg },
    { ...t.menu.items.wrap, img: wrapImg },
    { ...t.menu.items.hotdog, img: hotdogImg },
  ];
  return (
    <div className="pt-32 md:pt-40">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-16 md:mb-20">
          <RevealItem>
            <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">
              {t.menu.eyebrow}
            </p>
          </RevealItem>
          <RevealItem>
            <h1 className="font-display text-5xl md:text-7xl font-black text-balance mb-5">
              {t.pages.menuTitle}
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="text-lg text-muted-foreground">{t.pages.menuSub}</p>
          </RevealItem>
        </Reveal>

        <Reveal className="grid sm:grid-cols-2 gap-6">
          {cats.map((c) => (
            <RevealItem key={c.name}>
              <article className="group grid grid-cols-5 gap-5 p-5 rounded-2xl bg-card border border-border/50 hover:border-accent/60 transition-all hover:-translate-y-1">
                <div className="col-span-2 aspect-square overflow-hidden rounded-xl">
                  <img
                    src={c.img}
                    alt={c.name}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  />
                </div>
                <div className="col-span-3 flex flex-col justify-center">
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h2 className="font-display text-2xl font-bold">{c.name}</h2>
                    <span className="text-accent font-semibold text-sm whitespace-nowrap">{c.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{c.desc}</p>
                </div>
              </article>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </div>
  );
}
