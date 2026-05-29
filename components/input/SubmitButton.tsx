// components/input/SubmitButton.tsx

import { Loader2 } from 'lucide-react';

interface SubmitButtonProps {
  loading: boolean;
  disabled: boolean;
  onClick: () => void;
}

export default function SubmitButton({
  loading,
  disabled,
  onClick,
}: SubmitButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={disabled || loading}
      className="flex w-full items-center justify-center gap-3 rounded-md bg-el-blue px-6 py-4 text-sm font-semibold text-white transition-all duration-200 hover:opacity-90 disabled:cursor-not-allowed disabled:bg-slate-300 disabled:text-slate-500"
    >
      {loading ? (
        <>
          <Loader2 className="h-5 w-5 animate-spin" />
          Analysing...
        </>
      ) : (
        <>Analyse My Stack →</>
      )}
    </button>
  );
}