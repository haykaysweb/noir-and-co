import Link from "next/link";
import Container from "@/components/ui/Container";
import { FOOTER_LINK_GROUPS, SOCIAL_LINKS } from "@/data/site-content";
import { STORE_NAME, STORE_TAGLINE } from "@/lib/constants";

// A server component: it has no state or click handlers, so it sends no JavaScript to the browser.
export default function Footer() {
  return (
    <footer className="mt-20 bg-ink-900 text-ink-200">
      <Container className="py-16">
        <div className="grid grid-cols-1 gap-10 md:grid-cols-2 lg:grid-cols-5">
          {/* Brand and social links */}
          <div className="lg:col-span-2">
            <p className="mb-4 font-serif text-2xl font-semibold text-white">
              NOIR <span className="text-sand-500">&</span> CO
            </p>
            <p className="max-w-xs text-sm leading-relaxed text-ink-400">{STORE_TAGLINE}</p>

            {/*
              Social links are plain text on purpose. Newer versions of
              lucide-react no longer ship brand logos. If you want logos,
              install react-icons and swap them in here.
            */}
            <ul className="mt-6 flex flex-wrap gap-2">
              {SOCIAL_LINKS.map((social) => (
                <li key={social.label}>
                  <a
                    href={social.href}
                    className="rounded-full border border-ink-700 px-4 py-2 text-xs text-ink-400 transition-colors hover:border-sand-500 hover:text-sand-500"
                  >
                    {social.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Link columns */}
          {FOOTER_LINK_GROUPS.map((group) => (
            <nav key={group.title} aria-label={group.title}>
              <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-white">
                {group.title}
              </h2>
              <ul className="space-y-3">
                {group.links.map((link) => (
                  <li key={link.label}>
                    <Link
                      href={link.href}
                      className="text-sm text-ink-400 transition-colors hover:text-sand-500"
                    >
                      {link.label}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          ))}
        </div>

        <div className="mt-12 flex flex-col items-center justify-between gap-4 border-t border-ink-800 pt-8 sm:flex-row">
          <p className="text-xs text-ink-500">
           haykaysweb © {new Date().getFullYear()} {STORE_NAME}. All rights reserved.
          </p>
          <p className="text-xs text-ink-500">Designed with intention.</p>
        </div>
      </Container>
    </footer>
  );
}