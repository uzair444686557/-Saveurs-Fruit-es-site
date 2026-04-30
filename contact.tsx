import { createFileRoute } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useState } from "react";
import { Phone, Mail, MapPin, Clock, Check } from "lucide-react";
import { z } from "zod";
import { useI18n } from "@/i18n/I18nProvider";
import { Reveal, RevealItem } from "@/components/site/Reveal";

export const Route = createFileRoute("/contact")({
  head: () => ({
    meta: [
      { title: "Contact & réservation — Ô Saveurs fruitées" },
      { name: "description", content: "Réservez le food truck Ô Saveurs fruitées pour votre prochain événement. Réponse sous 24h." },
      { property: "og:title", content: "Contact — Ô Saveurs fruitées" },
      { property: "og:description", content: "Réservez le truck. Réponse sous 24h." },
    ],
  }),
  component: ContactPage,
});

const schema = z.object({
  name: z.string().trim().min(2, "Trop court").max(80),
  email: z.string().trim().email("Email invalide").max(160),
  phone: z.string().trim().min(6, "Numéro trop court").max(40),
  type: z.string().trim().min(2).max(80),
  date: z.string().trim().min(1, "Date requise"),
  message: z.string().trim().min(10, "Donnez-nous un peu plus de détails").max(2000),
});

function ContactPage() {
  const { t } = useI18n();
  const [status, setStatus] = useState<"idle" | "sending" | "success">("idle");
  const [errors, setErrors] = useState<Record<string, string>>({});

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const data = Object.fromEntries(fd.entries());
    const parsed = schema.safeParse(data);
    if (!parsed.success) {
      const errs: Record<string, string> = {};
      parsed.error.issues.forEach((i) => {
        errs[i.path[0] as string] = i.message;
      });
      setErrors(errs);
      return;
    }
    setErrors({});
    setStatus("sending");
    await new Promise((r) => setTimeout(r, 900));
    setStatus("success");
    (e.target as HTMLFormElement).reset();
  }

  const inputClass =
    "w-full bg-card/60 border border-border rounded-xl px-4 py-3 text-sm placeholder:text-muted-foreground/60 focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/30 transition";

  return (
    <div className="pt-32 md:pt-40 pb-8">
      <div className="mx-auto max-w-7xl px-5 md:px-8">
        <Reveal className="text-center max-w-3xl mx-auto mb-14">
          <RevealItem>
            <p className="text-xs uppercase tracking-[0.3em] text-accent font-semibold mb-4">{t.nav.contact}</p>
          </RevealItem>
          <RevealItem>
            <h1 className="font-display text-5xl md:text-7xl font-black text-balance mb-5">
              {t.contact.title}
            </h1>
          </RevealItem>
          <RevealItem>
            <p className="text-lg text-muted-foreground">{t.contact.subtitle}</p>
          </RevealItem>
        </Reveal>

        <div className="grid lg:grid-cols-5 gap-10 lg:gap-14">
          <aside className="lg:col-span-2 space-y-8">
            <h2 className="font-display text-2xl font-bold">{t.contact.info}</h2>
            <ul className="space-y-5">
              <li className="flex gap-4">
                <span className="grid place-items-center size-10 rounded-full bg-accent/15 text-accent shrink-0">
                  <Phone className="size-4" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">{t.contact.phone}</div>
                  <div className="text-sm">+33 0 00 00 00 00 · +1 (305) 000 0000</div>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="grid place-items-center size-10 rounded-full bg-accent/15 text-accent shrink-0">
                  <Mail className="size-4" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">{t.contact.email}</div>
                  <div className="text-sm">hello@osaveursfruitees.com</div>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="grid place-items-center size-10 rounded-full bg-accent/15 text-accent shrink-0">
                  <MapPin className="size-4" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">{t.contact.address}</div>
                  <div className="text-sm leading-relaxed">
                    Mortagne-sur-Gironde, France<br />
                    Wynwood, Miami FL, USA
                  </div>
                </div>
              </li>
              <li className="flex gap-4">
                <span className="grid place-items-center size-10 rounded-full bg-accent/15 text-accent shrink-0">
                  <Clock className="size-4" />
                </span>
                <div>
                  <div className="text-xs uppercase tracking-wider text-muted-foreground mb-0.5">{t.contact.hours}</div>
                  <div className="text-sm">{t.contact.hoursValue}</div>
                </div>
              </li>
            </ul>

            <div
              className="aspect-[4/3] rounded-2xl overflow-hidden border border-border/60 relative"
              style={{ background: "var(--gradient-fresh)" }}
            >
              <div className="absolute inset-0 grid place-items-center text-background/80 font-display text-xl text-center px-6">
                Mortagne-sur-Gironde<br />⟷<br />Miami
              </div>
            </div>
          </aside>

          <div className="lg:col-span-3">
            {status === "success" ? (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="rounded-2xl border border-accent/50 bg-accent/10 p-10 text-center"
              >
                <div className="mx-auto mb-5 grid place-items-center size-14 rounded-full bg-accent text-accent-foreground">
                  <Check className="size-6" />
                </div>
                <h3 className="font-display text-2xl font-bold mb-2">Merci !</h3>
                <p className="text-muted-foreground">{t.contact.form.success}</p>
              </motion.div>
            ) : (
              <form onSubmit={onSubmit} className="space-y-5" noValidate>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label={t.contact.form.name} error={errors.name}>
                    <input name="name" required className={inputClass} placeholder="Camille Dupont" />
                  </Field>
                  <Field label={t.contact.form.email} error={errors.email}>
                    <input type="email" name="email" required className={inputClass} placeholder="vous@email.com" />
                  </Field>
                </div>
                <div className="grid sm:grid-cols-2 gap-5">
                  <Field label={t.contact.form.phone} error={errors.phone}>
                    <input name="phone" required className={inputClass} placeholder="+33 6 12 34 56 78" />
                  </Field>
                  <Field label={t.contact.form.date} error={errors.date}>
                    <input type="date" name="date" required className={inputClass} />
                  </Field>
                </div>
                <Field label={t.contact.form.type} error={errors.type}>
                  <input name="type" required className={inputClass} placeholder={t.contact.form.typePlaceholder} />
                </Field>
                <Field label={t.contact.form.message} error={errors.message}>
                  <textarea
                    name="message"
                    required
                    rows={5}
                    className={inputClass + " resize-none"}
                    placeholder="Date, lieu, nombre d'invités, ambiance souhaitée…"
                  />
                </Field>
                <motion.button
                  type="submit"
                  disabled={status === "sending"}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="shine-btn w-full sm:w-auto inline-flex items-center justify-center gap-2 rounded-full bg-primary px-8 py-4 text-sm font-bold text-primary-foreground hover:shadow-[var(--shadow-glow)] transition disabled:opacity-60"
                >
                  {status === "sending" ? t.contact.form.sending : t.contact.form.submit}
                </motion.button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

function Field({
  label,
  error,
  children,
}: {
  label: string;
  error?: string;
  children: React.ReactNode;
}) {
  return (
    <label className="block">
      <span className="block text-xs uppercase tracking-[0.18em] font-semibold text-muted-foreground mb-2">
        {label}
      </span>
      {children}
      {error && (
        <motion.span
          initial={{ opacity: 0, y: -4 }}
          animate={{ opacity: 1, y: 0 }}
          className="block mt-1.5 text-xs text-primary"
        >
          {error}
        </motion.span>
      )}
    </label>
  );
}
