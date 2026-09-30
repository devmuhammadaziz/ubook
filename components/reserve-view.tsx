"use client";

import { FloorPlan } from "@/components/floor-plan";
import { GuestStepper } from "@/components/guest-stepper";
import { TablePreview } from "@/components/table-preview";
import { ThemeToggle } from "@/components/theme-toggle";
import { useBooking } from "@/lib/booking";
import { getBranch, openTables, restaurant } from "@/lib/data";
import { formatMedium } from "@/lib/dates";
import { ArrowLeft } from "iconsax-react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { flushSync } from "react-dom";

function Legend() {
  const items = [
    { label: "Open", className: "bg-[var(--chair)]" },
    { label: "Your table", className: "bg-[var(--selected)]" },
    { label: "Booked", className: "bg-[var(--chair-reserved)]" },
    { label: "Too small", className: "bg-[var(--chair)] opacity-40" },
  ];
  return (
    <ul className="flex flex-wrap gap-x-4 gap-y-2 text-xs font-medium text-muted">
      {items.map((item) => (
        <li key={item.label} className="inline-flex items-center gap-2">
          <span className={`h-2.5 w-2.5 rounded-[3px] ${item.className}`} />
          {item.label}
        </li>
      ))}
    </ul>
  );
}

export function ReserveView() {
  const booking = useBooking();
  const router = useRouter();
  const branch = getBranch(booking.draft.branchId);
  const table =
    branch.tables.find((item) => item.id === booking.draft.tableId) ?? null;
  const bookable = openTables(branch, booking.draft.guests).length;

  function reserve() {
    let created = false;
    flushSync(() => {
      created = Boolean(booking.confirm());
    });
    if (created) router.push("/confirmed");
  }

  return (
    <div className="min-h-dvh lg:grid lg:h-dvh lg:grid-rows-[auto_minmax(0,1fr)] lg:overflow-hidden">
      <header className="border-b border-line bg-background/90 backdrop-blur-md">
        <div className="mx-auto flex max-w-6xl items-center gap-3 px-4 py-3">
          <Link
            href="/#book"
            aria-label="Back to planning"
            className="grid h-11 w-11 shrink-0 place-items-center rounded-full border border-line bg-surface text-foreground"
          >
            <ArrowLeft size={18} color="currentColor" variant="Bold" aria-hidden />
          </Link>
          <div className="min-w-0 flex-1">
            <p className="truncate font-display text-xl tracking-tight">{branch.short}</p>
            <p className="truncate text-sm text-muted">
              {formatMedium(booking.draft.date)}
              {" · "}
              {booking.draft.time ?? "Choose a time"}
              {" · "}
              {restaurant.name}
            </p>
          </div>
          <ThemeToggle />
        </div>
      </header>

      <div className="lg:grid lg:min-h-0 lg:grid-cols-[minmax(320px,420px)_minmax(0,1fr)]">
        <aside className="hidden border-line bg-surface lg:block lg:overflow-y-auto lg:border-r">
          <TablePreview
            table={table}
            guests={booking.draft.guests}
            time={booking.draft.time}
            onReserve={reserve}
            onClear={booking.clearTable}
          />
        </aside>

        <section
          className={
            table
              ? "px-4 py-5 pb-[68vh] lg:overflow-y-auto lg:px-8 lg:pb-10"
              : "px-4 py-5 pb-28 lg:overflow-y-auto lg:px-8 lg:pb-10"
          }
        >
          <div className="mx-auto max-w-[640px]">
            <h1 className="font-display text-4xl tracking-tight">The room, from above</h1>
            <p className="mt-2 text-sm leading-relaxed text-muted">
              Tap a table. Booked seats stay visible so you can still see them. Faded ones are too small for this party.
            </p>
            <div className="mt-5 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <GuestStepper value={booking.draft.guests} onChange={booking.setGuests} />
              <p className="text-sm font-medium text-muted">
                {bookable} open for this party
              </p>
            </div>
            <div className="mt-4 flex gap-2 overflow-x-auto scroller">
              {branch.slots.map((slot) => {
                const selected = booking.draft.time === slot;
                return (
                  <button
                    key={slot}
                    type="button"
                    aria-pressed={selected}
                    onClick={() => booking.setTime(slot)}
                    className={
                      selected
                        ? "h-10 shrink-0 rounded-xl bg-accent px-4 text-sm font-semibold text-accent-foreground"
                        : "h-10 shrink-0 rounded-xl border border-line bg-surface px-4 text-sm font-semibold"
                    }
                  >
                    {slot}
                  </button>
                );
              })}
            </div>
            <div className="mt-4">
              <Legend />
            </div>
            <div className="mt-4 overflow-hidden rounded-[28px] border border-line bg-surface">
              <FloorPlan
                branchId={branch.id}
                tables={branch.tables}
                guests={booking.draft.guests}
                selectedId={booking.draft.tableId}
                onSelect={booking.setTable}
              />
            </div>
          </div>
        </section>
      </div>

      <div className="fixed inset-x-0 bottom-0 z-40 lg:hidden">
        {table ? (
          <div className="max-h-[64vh] overflow-y-auto rounded-t-[28px] border border-line bg-surface lift">
            <TablePreview
              compact
              table={table}
              guests={booking.draft.guests}
              time={booking.draft.time}
              onReserve={reserve}
              onClear={booking.clearTable}
            />
          </div>
        ) : (
          <div className="px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))]">
            <p className="rounded-full border border-line bg-surface px-4 py-3 text-center text-sm font-medium lift">
              Tap an open table to see how it looks
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
