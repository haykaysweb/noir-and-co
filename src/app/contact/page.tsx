import type { Metadata } from "next";
import { Mail, MapPin, Phone } from "lucide-react";
import ContactForm from "@/components/contact/ContactForm";
import Container from "@/components/ui/Container";
import SectionHeading from "@/components/ui/SectionHeading";

export const metadata: Metadata = {
  title: "Contact",
  description: "Questions about an order or a product? Get in touch.",
};

const CONTACT_DETAILS = [
  { icon: Mail, label: "Email", value: "hello@noirandco.com" },
  { icon: Phone, label: "Phone", value: "+234 7061 555-987" },
  { icon: MapPin, label: "Showroom", value: "12 Greene Street, Lagos, Nigeria" },
];

const SHOWROOM_HOURS = [
  { days: "Monday – Friday", hours: "10am – 7pm" },
  { days: "Saturday", hours: "11am – 6pm" },
  { days: "Sunday", hours: "Closed" },
];

// A server component. Only the form needs the browser, so only ContactForm is a client component.
export default function ContactPage() {
  return (
    <>
      <Container className="pb-6 pt-8 text-center">
        <SectionHeading level="h1" eyebrow="Get in Touch" title="Contact Us" align="center" />
        <p className="mx-auto mt-4 max-w-md text-sm text-ink-500">
          Questions about an order, a product, or just want to say hello? We&apos;d love to hear
          from you.
        </p>
      </Container>

      <Container className="py-8 lg:py-12">
        <div className="grid grid-cols-1 gap-8 lg:grid-cols-2 lg:gap-16">
          {/* Contact details */}
          <div>
            <h2 className="mb-6 font-serif text-2xl font-semibold text-ink-900">Visit or Reach Out</h2>

            <ul className="space-y-6">
              {CONTACT_DETAILS.map((detail) => (
                <li key={detail.label} className="flex items-start gap-4">
                  <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-sand-100">
                    <detail.icon size={20} className="text-sand-700" aria-hidden="true" />
                  </div>
                  <div>
                    <p className="mb-1 text-xs uppercase tracking-wider text-ink-400">{detail.label}</p>
                    <p className="text-sm font-medium text-ink-900">{detail.value}</p>
                  </div>
                </li>
              ))}
            </ul>

            <div className="mt-8 border-t border-ink-100 pt-8">
              <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-ink-900">
                Showroom Hours
              </h3>
              <dl className="space-y-2 text-sm">
                {SHOWROOM_HOURS.map((row) => (
                  <div key={row.days} className="flex justify-between">
                    <dt className="text-ink-600">{row.days}</dt>
                    <dd className={row.hours === "Closed" ? "text-ink-400" : "text-ink-900"}>
                      {row.hours}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* Form */}
          <ContactForm />
        </div>
      </Container>
    </>
  );
}