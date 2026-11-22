import { CheckCircle2 } from "lucide-react";

export const StepSuccess = () => (
  <section role="status" className="py-6 text-center">
    <CheckCircle2 aria-hidden="true" className="mx-auto mb-4 size-12 text-[#c5a6ff]" />
    <h2 className="text-3xl font-semibold tracking-tight">You’re all set!</h2>
    <p className="mt-3 text-sm text-[#c3b7d4]">Your profile has been created.</p>
  </section>
);
