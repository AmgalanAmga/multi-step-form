import { Button } from "@/components/ui/button";
import { LoadingSpinner } from "@/components/ui/motion";
import { ArrowLeft, ArrowRight, LockKeyhole } from "lucide-react";

type RegisterActionsType = {
  busy: boolean;
  step: FormStep;
  onBack: () => void;
  submitting: boolean;
  submissionStage: "uploading" | "saving";
};

export const RegisterActions = ({ step, busy, submitting, submissionStage, onBack }: RegisterActionsType) => {
  const disabled = busy || submitting;
  let label = step === 3 ? "Create my profile" : "Continue";
  if (busy) label = "Checking...";
  if (submitting) label = submissionStage === "uploading" ? "Uploading..." : "Saving...";

  return (
    <>
      <div className="flex gap-3 mt-8">
        {step > 1 && (
          <Button type="button" variant="outline" className="h-11" disabled={disabled} onClick={onBack}>
            <ArrowLeft size={15} />
            Back
          </Button>
        )}
        <Button type="submit" disabled={disabled} className="flex-1 text-xs font-semibold h-11">
          {disabled && <LoadingSpinner />}
          {label}
          {!disabled && <ArrowRight className="size-4" />}
        </Button>
      </div>
      <p className="mt-5 flex items-center justify-center gap-1.5 text-[10px] text-muted-foreground">
        <LockKeyhole size={11} />
        Progress is saved when you click Continue.
      </p>
    </>
  );
};
