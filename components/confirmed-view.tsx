"use client";

import { ThemeToggle } from "@/components/theme-toggle";
import { primaryButton, secondaryButton } from "@/components/ui";
import { useBooking } from "@/lib/booking";
import { getBranch, restaurant } from "@/lib/data";
import { formatLong } from "@/lib/dates";
import { Calendar, Location, People, TickCircle } from "iconsax-react";
import Image from "next/image";
import Link from "next/link";

export function ConfirmedView() {
  const booking = useBooking();
  const reservation = booking.reservation;

  if (!reservation) {
    return (
      <div className="mx-auto flex min-h-dvh max-w-lg flex-col justify-center px-5 text-center">
        <h1 className="font-display text-4xl tracking-tight">No table reserved yet</h1>
        <p className="mt-3 text-sm leading-relaxed text-muted">
          Choose a time, tap a table, and you’ll land here with the seat you picked.
        </p>
        <Link href="/" className={`${primaryButton} mt-6`}>
          Back to {restaurant.name}
        </Link>
      </div>
    );
  }

  const branch = getBranch(reservation.branchId);
  const table = branch.tables.find((item) => item.id === reservation.tableId);

  return (
    <div className="min-h-dvh">
      <header className="mx-auto flex h-16 max-w-3xl items-center justify-between px-4">
        <Link href="/" className="flex items-center gap-3">
          <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-[11px] font-bold tracking-wide text-accent-foreground">
            VT
          </span>
          <span className="font-display text-lg tracking-tight">{restaurant.name}</span>
        </Link>
        <ThemeToggle />
      </header>

      <main className="mx-auto max-w-3xl px-4 pb-16">
        <div className="overflow-hidden rounded-[28px] border border-line bg-surface lift">
          {table ? (
            <div className="relative aspect-[16/8] bg-surface-2 sm:aspect-[16/7]">
              <Image
                src={table.photo}
                alt={table.photoAlt}
                fill
                priority
                sizes="(min-width: 768px) 768px, 100vw"
                className="object-cover"
              />
            </div>
          ) : null}
          <div className="p-6 sm:p-8">
            <p className="inline-flex items-center gap-2 text-sm font-semibold text-good">
              <TickCircle size={18} variant="Bold" aria-hidden />
              Reserved
            </p>
            <h1 className="mt-2 font-display text-4xl tracking-tight sm:text-5xl">
              Your table is saved
            </h1>
            <p className="mt-3 max-w-lg text-sm leading-relaxed text-muted">
              Show this note at the host stand. It stays on this device if you leave and come back.
            </p>

            <dl className="mt-6 grid gap-3 sm:grid-cols-2">
              <div className="rounded-2xl bg-surface-2 p-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Table
                </dt>
                <dd className="mt-1 font-display text-2xl">
                  {table?.name ?? "Table"}
                </dd>
                <dd className="text-sm text-muted">
                  {table?.zone} · {table?.seats} seats
                </dd>
              </div>
              <div className="rounded-2xl bg-surface-2 p-4">
                <dt className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
                  Code
                </dt>
                <dd className="mt-1 font-display text-2xl tracking-wide">
                  {reservation.code}
                </dd>
                <dd className="text-sm text-muted">Give this to the host</dd>
              </div>
            </dl>

            <ul className="mt-5 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <Location size={16} variant="Bold" className="text-accent" aria-hidden />
                {branch.short} · {branch.address}
              </li>
              <li className="flex items-center gap-2">
                <Calendar size={16} variant="Bold" className="text-accent" aria-hidden />
                {formatLong(reservation.date)} · {reservation.time}
              </li>
              <li className="flex items-center gap-2">
                <People size={16} variant="Bold" className="text-accent" aria-hidden />
                Party of {reservation.guests}
              </li>
            </ul>

            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/" className={secondaryButton}>
                Back to the restaurant
              </Link>
              <Link
                href="/reserve"
                className={primaryButton}
                onClick={() => {
                  booking.clearReservation();
                  booking.clearTable();
                }}
              >
                Book another table
              </Link>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
