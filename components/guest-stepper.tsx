"use client";

import { Add, Minus } from "iconsax-react";

export function GuestStepper({
  value,
  onChange,
}: {
  value: number;
  onChange: (value: number) => void;
}) {
  return (
    <div className="inline-flex items-center rounded-2xl border border-line bg-surface p-1">
      <button
        type="button"
        className="grid h-11 w-11 place-items-center rounded-xl text-foreground transition hover:bg-surface-2 disabled:opacity-30"
        onClick={() => onChange(value - 1)}
        disabled={value <= 1}
        aria-label="Fewer guests"
      >
        <Minus size={18} color="currentColor" variant="Bold" aria-hidden />
      </button>
      <span className="min-w-20 text-center text-sm font-semibold">
        {value} {value === 1 ? "guest" : "guests"}
      </span>
      <button
        type="button"
        className="grid h-11 w-11 place-items-center rounded-xl text-foreground transition hover:bg-surface-2 disabled:opacity-30"
        onClick={() => onChange(value + 1)}
        disabled={value >= 10}
        aria-label="More guests"
      >
        <Add size={18} color="currentColor" variant="Bold" aria-hidden />
      </button>
    </div>
  );
}
