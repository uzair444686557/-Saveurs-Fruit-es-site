import { createFileRoute, Link } from "@tanstack/react-router";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { ArrowRight, ArrowDown, Quote, Plus } from "lucide-react";
import { useI18n } from "@/i18n/I18nProvider";
import { Reveal, RevealItem } from "@/components/site/Reveal";
import { Counter } from "@/components/site/Counter";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion";

import heroImg from "@/assets/hero-truck.jpg";
import storyImg from "@/assets/story-portrait.jpg";
import juiceImg from "@/assets/signature-juice.jpg";
import graniteImg from "@/assets/signature-granite.jpg";
import wrapImg from "@/assets/signature-wrap.jpg";
import eventsImg from "@/assets/events-banner.jpg";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Ô Saveurs fruitées — Food truck · Jus frais, granités, wraps" },
      {
        name: "description",
        content:
          "Jus pressés minute, granités maison, wraps & hot dogs gourmands. Food truck pour vos événements privés et professionnels — Mortagne-sur-Gironde et Miami.",
      },
      { property: "og:title", content: "Ô Saveurs fruitées — Food truck artisanal" },
      {
        property: "og:description",
        content: "Jus, granités, wraps et hot dogs faits maison pour vos événements privés et professionnels.",
      },
      { property: "og:image", content: heroImg },
      { name: "twitter:image", content: heroImg },
    ],
  }),
  component: Home,
});

function Home() {
  return (
    <>
      <Hero />
      <TrustBar />
      <Story />
      <MenuPreview />
      <EventsBanner />
      <Process />
      <Testimonials />
      <FAQ />
      <ContactCTA />
    </>
  );
}

function Hero() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start start", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["0%", "25%"]);
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.15]);
  const opacity = useTransform(scrollYProgress, [0, 0.8], [1, 0]);

  return (
    <section ref={ref} className="relative h-[100svh] min-h-[640px] w-full overflow-hidden">
      <motion.div style={{ y, scale }} className="absolute inset-0">
        <img
          src={heroImg}
          alt="Food truck Ô Saveurs fruitées au crépuscule, avec étalage de fruits frais"
          className="size-full object-cover"
          fetchPriority="high"
        />
      </motion.div>
      <div className="absolute inset-0" style={{ background: "var(--gradient-hero)" }} />
      <div className="absolute inset-0 bg-gradient-to-br from-primary/15 via-transparent to-accent/15 mix-blend-overlay" />

      <motion.div style={{ opacity }} className="relative z-10 h-full flex flex-col justify-end pb-20 md:pb-28">
        <div className="mx-auto max-w-7xl w-full px-5 md:px-8">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xs md:text-sm uppercase tracking-[0.3em] text-accent font-semibold mb-5 md:mb-7"
          >
            {t.hero.eyebrow}
          </motion.p>
          <h1 className="font-display text-[14vw] sm:text-[10vw] md:text-[7.5rem] lg:text-[9rem] font-black leading-[0.9] tracking-tight text-balance max-w-5xl">
            {[t.hero.title1, t.hero.title2, t.hero.title3].map((line, i) => (
              <motion.span
                key={i}
                initial={{ opacity: 0, y: 60, clipPath: "inset(0 0 100% 0)" }}
                animate={{ opacity: 1, y: 0, clipPath: "inset(0 0 0% 0)" }}
                transition={{ duration: 0.9, delay: 0.45 + i * 0.15, ease: [0.22, 1, 0.36, 1] }}
                className="block"
              >
                {i === 1 ? <span className="text-primary italic">{line}</span> : line}
              </motion.span>
            ))}
          </h1>
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.0 }}
            className="mt-6 md:mt-8 max-w-xl text-base md:text-lg text-foreground/80 leading-relaxed text-pretty"
          >
            {t.hero.subtitle}
          </motion.p>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 1.15 }}
            className="mt-8 md:mt-10 flex flex-wrap gap-3"
          >
            <Link
              to="/contact"
              className="shine-btn group inline-flex items-center gap-2 rounded-full bg-primary px-6 py-3.5 text-sm font-semibold text-primary-foreground hover:brightness-110 transition-all hover:shadow-[var(--shadow-glow)]"
            >
              {t.hero.ctaPrimary}
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              to="/menu"
              className="inline-flex items-center gap-2 rounded-full border border-foreground/30 bg-background/30 backdrop-blur px-6 py-3.5 text-sm font-semibold hover:border-accent hover:text-accent transition-all"
            >
              {t.hero.ctaSecondary}
            </Link>
          </motion.div>
        </div>
      </motion.div>

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4 }}
        className="absolute bottom-6 left-1/2 -translate-x-1/2 z-10 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.3em] text-foreground/60"
      >
        <span>{t.hero.scroll}</span>
        <motion.div animate={{ y: [0, 8, 0] }} transition={{ duration: 1.6, repeat: Infinity }}>
          <ArrowDown className="size-4" />
        </motion.div>
      </motion.div>
    </section>
  );
}

function TrustBar() {
  const { t } = useI18n();
  const stats = [
    { v: 420, s: "+", l: t.trust.events },
    { v: 12000, s: "+", l: t.trust.fruits },
    { v: 4.9, s: "/5", l: t.trust.rating },
    { v: 7, s: "", l: t.trust.years },
  ];
  return (
    <section className="border-y border-border/50 bg-secondary/40">
      <div className="mx-auto max-w-7xl px-5 md:px-8 py-10 md:py-14 grid grid-cols-2 md:grid-cols-4 gap-y-8 md:gap-0 md:divide-x divide-border/50">
        {stats.map((s, i) => (
          <div key={i} className="text-center md:px-6">
            <div className="font-display text-4xl md:text-5xl font-black text-accent">
              <Counter to={s.v} suffix={s.s} />
            </div>
            <div className="mt-2 text-xs uppercase tracking-[0.2em] text-muted-foreground">{s.l}</div>
          </div>
        ))}
      </div>
    </section>
  );
}

function Story() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["10%", "-10%"]);
  return (
    <section ref={ref} className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8 grid lg:grid-cols-2 gap-12 lg:gap-20 items-center">
        <motion.div
          initial={{ opacity: 0, x: -40 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, margin: "-80px" }}
          transition={{ duration: 0.9, ease: [0.22, 1, 0.36, 1] }}
          className="relative aspect-[4/5] overflow-hidden rounded-2xl"
        >
          <motion.img
            style={{ y }}
            src={storyImg}
            alt="Portrait du fondateur d'Ô Saveurs fruitées devant le truck"
            className="size-full object-cover scale-110"
            loading="lazy"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-primary/20 to-transparent mix-blend-overlay" />
        </motion.div>

        <Reveal className="space-y-7">
          <RevealItem>
            <span className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
              {t.story.eyebrow}
            </span>
          </RevealItem>
          <RevealItem>
            <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-black text-balance">
              {t.story.title}
            </h2>
          </RevealItem>
          <RevealItem>
            <p className="text-base md:text-lg text-foreground/75 leading-relaxed text-pretty">
              {t.story.body}
            </p>
          </RevealItem>
          <RevealItem>
            <blockquote className="border-l-4 border-accent pl-5 py-1 font-display text-xl md:text-2xl italic text-accent/95">
              {t.story.pull}
            </blockquote>
          </RevealItem>
          <RevealItem>
            <Link
              to="/story"
              className="inline-flex items-center gap-2 text-sm font-semibold text-accent hover:gap-3 transition-all"
            >
              {t.story.cta}
              <ArrowRight className="size-4" />
            </Link>
          </RevealItem>
        </Reveal>
      </div>
    </section>
  );
}

function MenuPreview() {
  const { t } = useI18n();
  const items = [
    { ...t.menu.items.juice, img: juiceImg },
    { ...t.menu.items.granite, img: graniteImg },
    { ...t.menu.items.wrap, img: wrapImg },
  ];
  return (
    <section className="bg-[oklch(0.13_0.005_130)] py-24 md:py-32 relative">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-14">
          <div>
            <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">
              {t.menu.eyebrow}
            </p>
            <h2 className="font-display text-4xl md:text-6xl font-black max-w-3xl text-balance">
              {t.menu.title}
            </h2>
          </div>
          <div className="hidden md:block flex-1 h-px bg-gradient-to-r from-accent/50 to-transparent" />
        </div>

        <Reveal className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {items.map((it) => (
            <RevealItem key={it.name}>
              <article className="group relative overflow-hidden rounded-2xl bg-card border border-border/50 hover:border-accent/70 transition-all duration-500 hover:-translate-y-2 hover:shadow-[var(--shadow-card)]">
                <div className="aspect-[4/5] overflow-hidden">
                  <img
                    src={it.img}
                    alt={it.name}
                    loading="lazy"
                    className="size-full object-cover transition-transform duration-[1200ms] group-hover:scale-110"
                  />
                </div>
                <div className="p-6">
                  <div className="flex items-baseline justify-between gap-3 mb-2">
                    <h3 className="font-display text-2xl font-bold">{it.name}</h3>
                    <span className="text-accent font-semibold text-sm whitespace-nowrap">{it.price}</span>
                  </div>
                  <p className="text-sm text-muted-foreground leading-relaxed">{it.desc}</p>
                </div>
              </article>
            </RevealItem>
          ))}
        </Reveal>

        <div className="mt-12 text-center">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full border border-foreground/20 px-6 py-3 text-sm font-semibold hover:border-accent hover:text-accent transition-all"
          >
            {t.menu.cta}
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}

function EventsBanner() {
  const { t } = useI18n();
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], ["-15%", "15%"]);
  return (
    <section ref={ref} className="relative h-[80vh] min-h-[520px] overflow-hidden">
      <motion.img
        style={{ y, scale: 1.2 }}
        src={eventsImg}
        alt="Truck installé pour un événement privé en plein air"
        loading="lazy"
        className="absolute inset-0 size-full object-cover"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/30 to-background/85" />
      <div className="relative z-10 h-full flex items-center">
        <div className="mx-auto max-w-4xl px-5 md:px-8 text-center">
          <Reveal className="space-y-7">
            <RevealItem>
              <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold">
                {t.featured.eyebrow}
              </p>
            </RevealItem>
            <RevealItem>
              <h2 className="font-display text-4xl md:text-6xl lg:text-7xl font-black text-balance">
                {t.featured.title}
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="text-base md:text-lg text-foreground/80 max-w-2xl mx-auto text-pretty">
                {t.featured.body}
              </p>
            </RevealItem>
            <RevealItem>
              <Link
                to="/events"
                className="shine-btn inline-flex items-center gap-2 rounded-full bg-accent px-7 py-4 text-sm font-bold text-accent-foreground hover:brightness-110 transition-all hover:shadow-[var(--shadow-glow)]"
              >
                {t.featured.cta}
                <ArrowRight className="size-4" />
              </Link>
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function Process() {
  const { t } = useI18n();
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center mb-16 md:mb-20">
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">
            {t.process.eyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-black text-balance max-w-3xl mx-auto">
            {t.process.title}
          </h2>
        </div>

        <div className="relative grid md:grid-cols-4 gap-10 md:gap-6">
          <div className="hidden md:block absolute top-10 left-[12%] right-[12%] h-px bg-gradient-to-r from-transparent via-accent/40 to-transparent" />
          {t.process.steps.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ duration: 0.7, delay: i * 0.15, ease: [0.22, 1, 0.36, 1] }}
              className="relative text-center md:text-left"
            >
              <div className="mx-auto md:mx-0 mb-5 size-20 rounded-full bg-card border-2 border-accent/40 flex items-center justify-center font-display text-3xl font-black text-accent">
                0{i + 1}
              </div>
              <h3 className="font-display text-2xl font-bold mb-2">{s.title}</h3>
              <p className="text-sm text-muted-foreground leading-relaxed">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}

function Testimonials() {
  const { t } = useI18n();
  return (
    <section className="bg-secondary/40 py-24 md:py-32">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <div className="text-center mb-16">
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">
            {t.testimonials.eyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-6xl font-black text-balance max-w-3xl mx-auto">
            {t.testimonials.title}
          </h2>
        </div>
        <Reveal className="grid md:grid-cols-3 gap-6">
          {t.testimonials.list.map((r, i) => (
            <RevealItem key={i}>
              <article className="relative h-full p-8 rounded-2xl bg-card border border-border/50 hover:border-accent/50 transition-all hover:-translate-y-1">
                <Quote className="absolute -top-3 -left-3 size-12 text-accent rotate-180 fill-accent" />
                <div className="flex gap-1 mb-4 text-[var(--color-accent-2)]">
                  {Array.from({ length: 5 }).map((_, k) => (
                    <span key={k} className="text-lg" aria-hidden>★</span>
                  ))}
                </div>
                <p className="text-base leading-relaxed mb-6">{r.quote}</p>
                <div className="flex items-center gap-3">
                  <div className="size-10 rounded-full" style={{ background: "var(--gradient-citrus)" }} />
                  <div>
                    <div className="font-semibold text-sm">{r.name}</div>
                    <div className="text-xs text-muted-foreground">{r.role}</div>
                  </div>
                </div>
              </article>
            </RevealItem>
          ))}
        </Reveal>
      </div>
    </section>
  );
}

function FAQ() {
  const { t } = useI18n();
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-3xl px-5 md:px-8">
        <div className="text-center mb-12">
          <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">
            {t.faq.eyebrow}
          </p>
          <h2 className="font-display text-4xl md:text-5xl font-black text-balance">
            {t.faq.title}
          </h2>
        </div>
        <Accordion type="single" collapsible className="w-full space-y-3">
          {t.faq.items.map((it, i) => (
            <AccordionItem
              key={i}
              value={`item-${i}`}
              className="border border-border/60 rounded-xl px-5 data-[state=open]:border-accent/60 data-[state=open]:bg-card/50 transition-colors"
            >
              <AccordionTrigger className="py-5 hover:no-underline text-left font-display text-lg font-bold data-[state=open]:text-accent [&>svg]:hidden group">
                <span className="flex-1">{it.q}</span>
                <Plus className="size-5 shrink-0 transition-transform duration-300 group-data-[state=open]:rotate-45" />
              </AccordionTrigger>
              <AccordionContent className="text-muted-foreground leading-relaxed pb-5">
                {it.a}
              </AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>
      </div>
    </section>
  );
}

function ContactCTA() {
  const { t } = useI18n();
  return (
    <section className="py-24 md:py-32">
      <div className="mx-auto max-w-5xl px-5 md:px-8">
        <div
          className="relative overflow-hidden rounded-3xl p-10 md:p-16 text-center"
          style={{ background: "var(--gradient-citrus)" }}
        >
          <div className="absolute inset-0 opacity-20" style={{ background: "radial-gradient(circle at 30% 20%, white, transparent 60%)" }} />
          <Reveal className="relative space-y-6">
            <RevealItem>
              <h2 className="font-display text-4xl md:text-6xl font-black text-background text-balance">
                {t.contactCta.title}
              </h2>
            </RevealItem>
            <RevealItem>
              <p className="text-background/85 text-lg max-w-xl mx-auto">{t.contactCta.body}</p>
            </RevealItem>
            <RevealItem>
              <Link
                to="/contact"
                className="shine-btn inline-flex items-center gap-2 rounded-full bg-background px-7 py-4 text-sm font-bold text-foreground hover:scale-105 transition-transform"
              >
                {t.contactCta.cta}
                <ArrowRight className="size-4" />
              </Link>
            </RevealItem>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
