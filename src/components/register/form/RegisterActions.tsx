import { Button } from "@/components/ui/button";
import { ArrowLeft, ArrowRight, Loader2, LockKeyhole } from "lucide-react";

type RegisterActionsType = {
  step: FormStep;
  onBack: () => void;
  isSubmitting: boolean;
};

export const RegisterActions = ({ step, isSubmitting, onBack }: RegisterActionsType) => {
  let label = step === 2 ? "Create my profile" : "Continue";

  if (isSubmitting) label = "Creating profile...";

  return (
    <>
      <div className="flex gap-3 mt-4">
        {step > 0 && (
          <Button type="button" variant="outline" className="h-11" disabled={isSubmitting} onClick={onBack}>
            <ArrowLeft className="shrink-0" size={15} />
            Back
          </Button>
        )}
        <Button
          type="submit"
          disabled={isSubmitting}
          className="bg-[linear-gradient(105deg,#b694ff,#e5bdff)] text-[#241332] shadow-[0_3px_19px_-9px_#985aff] enabled:hover:brightness-108 flex-1 text-xs font-semibold h-11"
        >
          {isSubmitting && <Loader2 className="size-4 animate-spin motion-reduce:animate-none" />}
          {label}
          {!isSubmitting && <ArrowRight className="shrink-0 size-4" />}
        </Button>
      </div>

      <p className="mt-5 flex items-center justify-center gap-1.5 text-xs text-[#c3b7d4]">
        <LockKeyhole size={11} />
        Progress is saved when you click Continue.
      </p>
    </>
  );
};
