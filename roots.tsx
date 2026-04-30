import { Outlet, createRootRoute, HeadContent, Scripts } from "@tanstack/react-router";

import appCss from "../styles.css?url";
import { I18nProvider } from "@/i18n/I18nProvider";
import { Navbar } from "@/components/site/Navbar";
import { Footer } from "@/components/site/Footer";
import { ScrollProgress } from "@/components/site/ScrollProgress";
import { Cursor } from "@/components/site/Cursor";
import { Toaster } from "@/components/ui/sonner";

function NotFoundComponent() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-4">
      <div className="max-w-md text-center">
        <h1 className="text-7xl font-display font-black text-foreground">404</h1>
        <h2 className="mt-4 text-xl font-semibold">Page introuvable</h2>
        <p className="mt-2 text-sm text-muted-foreground">
          Cette page n'existe pas ou a été déplacée.
        </p>
        <div className="mt-6">
          <a
            href="/"
            className="inline-flex items-center justify-center rounded-full bg-primary px-5 py-2.5 text-sm font-semibold text-primary-foreground hover:brightness-110 transition"
          >
            Retour à l'accueil
          </a>
        </div>
      </div>
    </div>
  );
}

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Ô Saveurs fruitées — Food truck artisanal · Jus, granités, wraps" },
      {
        name: "description",
        content:
          "Food truck Ô Saveurs fruitées — jus pressés minute, granités maison, wraps & hot dogs gourmands. Mortagne-sur-Gironde · Miami. Pour vos événements privés et professionnels.",
      },
      { name: "theme-color", content: "#1A1C19" },
      { property: "og:type", content: "website" },
      { property: "og:site_name", content: "Ô Saveurs fruitées" },
      { name: "twitter:card", content: "summary_large_image" },
      { property: "og:title", content: "Ô Saveurs fruitées — Food truck artisanal · Jus, granités, wraps" },
      { name: "twitter:title", content: "Ô Saveurs fruitées — Food truck artisanal · Jus, granités, wraps" },
      { name: "description", content: "Ô Saveurs Elevate is a premium website showcasing a food truck's fresh juices, frozen treats, and savory items." },
      { property: "og:description", content: "Ô Saveurs Elevate is a premium website showcasing a food truck's fresh juices, frozen treats, and savory items." },
      { name: "twitter:description", content: "Ô Saveurs Elevate is a premium website showcasing a food truck's fresh juices, frozen treats, and savory items." },
      { property: "og:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e088c196-4a03-4d07-b012-5d27c7fc6789/id-preview-ae4b865c--af78cca1-dedd-4f2d-aa41-9073ae969700.lovable.app-1777491771013.png" },
      { name: "twitter:image", content: "https://pub-bb2e103a32db4e198524a2e9ed8f35b4.r2.dev/e088c196-4a03-4d07-b012-5d27c7fc6789/id-preview-ae4b865c--af78cca1-dedd-4f2d-aa41-9073ae969700.lovable.app-1777491771013.png" },
    ],
    links: [
      { rel: "stylesheet", href: appCss },
      { rel: "preconnect", href: "https://fonts.googleapis.com" },
      { rel: "preconnect", href: "https://fonts.gstatic.com", crossOrigin: "anonymous" },
      {
        rel: "stylesheet",
        href: "https://fonts.googleapis.com/css2?family=Fraunces:opsz,wght@9..144,400;9..144,700;9..144,800;9..144,900&family=Inter+Tight:wght@300;400;500;600;700&display=swap",
      },
    ],
  }),
  shellComponent: RootShell,
  component: RootComponent,
  notFoundComponent: NotFoundComponent,
});

function RootShell({ children }: { children: React.ReactNode }) {
  return (
    <html lang="fr">
      <head>
        <HeadContent />
      </head>
      <body className="grain">
        {children}
        <Scripts />
      </body>
    </html>
  );
}

function RootComponent() {
  return (
    <I18nProvider>
      <ScrollProgress />
      <Cursor />
      <Navbar />
      <main className="relative z-10">
        <Outlet />
      </main>
      <Footer />
      <Toaster />
    </I18nProvider>
  );
}
