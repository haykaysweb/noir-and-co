"use client";

import { useActionState } from "react";
import { subscribeToNewsletterAction } from "@/actions/newsletter";
import Container from "@/components/ui/Container";
import { inputClassName } from "@/components/ui/FormField";
import SubmitButton from "@/components/ui/SubmitButton";
import { initialFormState } from "@/lib/form-state";

export default function NewsletterSection() {
  const [state, formAction] = useActionState(subscribeToNewsletterAction, initialFormState);
  const emailError = state.fieldErrors?.email?.[0];

  return (
    <section>
      <Container className="py-16 lg:py-24">
        <div className="rounded-2xl bg-sand-100 px-6 py-12 text-center lg:px-16 lg:py-16">
          <p className="mb-3 text-xs uppercase tracking-[0.2em] text-sand-700">Stay Connected</p>
          <h2 className="mb-3 font-serif text-3xl font-semibold text-ink-900 lg:text-4xl">
            Join Our Newsletter
          </h2>
          <p className="mx-auto mb-6 max-w-md text-sm text-ink-500">
            Be the first to know about new collections, private sales, and style stories.
          </p>

          {state.status === "success" ? (
            <p role="status" className="text-sm font-medium text-sand-700">
              {state.message}
            </p>
          ) : (
            <form action={formAction} noValidate className="mx-auto max-w-md">
              <div className="flex flex-col gap-3 sm:flex-row">
                <label htmlFor="newsletter-email" className="sr-only">
                  Email address
                </label>
                <input
                  id="newsletter-email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  defaultValue={state.values?.email ?? ""}
                  aria-invalid={Boolean(emailError)}
                  placeholder="Enter your email"
                  className={`${inputClassName} flex-1 py-3.5`}
                />
                <SubmitButton size="md" pendingLabel="Subscribing…">
                  Subscribe
                </SubmitButton>
              </div>

              {(emailError || state.message) && (
                <p role="alert" className="mt-2 text-left text-xs text-red-600">
                  {emailError ?? state.message}
                </p>
              )}
            </form>
          )}
        </div>
      </Container>
    </section>
  );
}