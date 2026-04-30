import { useI18n } from "@/i18n/I18nProvider";

export function LangToggle() {
  const { lang, setLang } = useI18n();
  return (
    <div className="inline-flex items-center rounded-full border border-border/60 bg-background/40 backdrop-blur p-0.5 text-xs font-semibold tracking-wide">
      {(["fr", "en"] as const).map((l) => (
        <button
          key={l}
          onClick={() => setLang(l)}
          aria-pressed={lang === l}
          className={`px-3 py-1.5 rounded-full uppercase transition-colors ${
            lang === l
              ? "bg-accent text-accent-foreground"
              : "text-foreground/70 hover:text-foreground"
          }`}
        >
          {l}
        </button>
      ))}
    </div>
  );
}
