"use client";

import { useActionState, useState } from "react";
import { Check, Send } from "lucide-react";
import { sendContactMessageAction } from "@/actions/contact";
import SubmitButton from "@/components/ui/SubmitButton";
import TextField from "@/components/ui/TextField";
import { initialFormState } from "@/lib/form-state";

function ContactFormFields({ onSendAnother }: { onSendAnother: () => void }) {
  // state = what the server last returned. formAction = what the <form> calls on submit.
  const [state, formAction] = useActionState(sendContactMessageAction, initialFormState);

  if (state.status === "success") {
    return (
      <div role="status" className="rounded-2xl bg-sand-100 p-8 text-center lg:p-12">
        <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-full bg-success">
          <Check size={28} className="text-white" />
        </div>
        <h2 className="mb-2 font-serif text-2xl font-semibold text-ink-900">Message Sent</h2>
        <p className="mb-6 text-sm text-ink-500">{state.message}</p>
        <button
          type="button"
          onClick={onSendAnother}
          className="text-sm font-medium text-sand-700 underline transition-colors hover:text-sand-800"
        >
          Send another message
        </button>
      </div>
    );
  }

  return (
    // noValidate turns off the browser's own popups so our consistent messages show instead.
    <form action={formAction} noValidate className="space-y-5">
      {state.status === "error" && state.message && (
        <p role="alert" className="rounded-lg bg-red-50 px-4 py-3 text-sm text-red-700">
          {state.message}
        </p>
      )}

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <TextField name="name" label="Name" autoComplete="name" state={state} />
        <TextField name="email" label="Email" type="email" autoComplete="email" state={state} />
      </div>
      <TextField name="subject" label="Subject" state={state} />
      <TextField name="message" label="Message" rows={5} state={state} />

      <SubmitButton fullWidth size="md" pendingLabel="Sending…">
        <Send size={16} /> Send Message
      </SubmitButton>
    </form>
  );
}

export default function ContactForm() {
  // Changing the key makes React throw the form away and start a fresh one,
  // which is how "Send another message" clears everything.
  const [formKey, setFormKey] = useState(0);

  return <ContactFormFields key={formKey} onSendAnother={() => setFormKey((key) => key + 1)} />;
}