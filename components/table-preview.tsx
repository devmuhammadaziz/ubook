"use client";

import type { DiningTable } from "@/lib/data";
import { primaryButton } from "@/components/ui";
import {
  Building,
  Cake,
  CloseCircle,
  Crown,
  Cup,
  Eye,
  Gallery,
  Lamp,
  Lovely,
  Reserve,
  Sun1,
  SunFog,
  TickCircle,
  Wind,
  type Icon,
} from "iconsax-react";
import Image from "next/image";

const perkIcons: Record<string, Icon> = {
  "Street view": Eye,
  "Window light": Sun1,
  Quiet: Lamp,
  "Velvet booth": Crown,
  Celebration: Cake,
  "Chef's counter": Reserve,
  Terrace: SunFog,
  Cocktails: Cup,
  Intimate: Lovely,
  Waterfront: Wind,
  "Sunset view": SunFog,
  "Dining room": Building,
};

function blockReason(table: DiningTable, guests: number, time: string | null) {
  if (!time) return "Choose a time, then reserve this seat.";
  if (table.status === "held") return "Someone already has this table for tonight.";
  if (table.seats < guests) {
    return `This table seats ${table.seats}. Your party is ${guests}.`;
  }
  return null;
}

export function TablePreview({
  table,
  guests,
  time,
  onReserve,
  onClear,
  compact = false,
}: {
  table: DiningTable | null;
  guests: number;
  time: string | null;
  onReserve: () => void;
  onClear: () => void;
  compact?: boolean;
}) {
  if (!table) {
    return (
      <div className="flex h-full flex-col justify-center px-6 py-10 text-center">
        <div className="mx-auto mb-5 grid h-16 w-16 place-items-center rounded-2xl bg-accent-soft text-accent">
          <Gallery size={28} variant="Bold" aria-hidden />
        </div>
        <h2 className="font-display text-3xl tracking-tight">Tap a table</h2>
        <p className="mx-auto mt-3 max-w-xs text-sm leading-relaxed text-muted">
          The plan is the room from above. Tap any table and a real photo of that seat opens here, before you reserve it.
        </p>
      </div>
    );
  }

  const reason = blockReason(table, guests, time);
  const PerkFallback = TickCircle;

  if (compact) {
    return (
      <div key={table.id} className="rise grid grid-cols-[148px_minmax(0,1fr)]">
        <div className="relative h-full min-h-44 bg-surface-2">
          <Image
            src={table.photo}
            alt={table.photoAlt}
            fill
            sizes="148px"
            className="object-cover"
          />
          <div className="absolute left-2 top-2 rounded-full bg-black/55 px-2 py-1 text-[10px] font-semibold text-white">
            How it looks
          </div>
        </div>
        <div className="flex min-w-0 flex-col gap-2 p-3">
          <div className="flex items-start justify-between gap-2">
            <div className="min-w-0">
              <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
                {table.zone}
              </p>
              <h2 className="truncate font-display text-2xl leading-tight tracking-tight">
                {table.name}
              </h2>
            </div>
            <button
              type="button"
              onClick={onClear}
              aria-label="Close table preview"
              className="grid h-9 w-9 shrink-0 place-items-center rounded-full bg-surface-2 text-foreground"
            >
              <CloseCircle size={18} color="currentColor" variant="Bold" aria-hidden />
            </button>
          </div>
          <p className="line-clamp-2 text-xs leading-relaxed text-muted">{table.note}</p>
          <button
            type="button"
            className={`${primaryButton} mt-auto h-11 w-full`}
            disabled={Boolean(reason)}
            onClick={onReserve}
          >
            <Reserve size={16} color="currentColor" variant="Bold" aria-hidden />
            {reason ? "Not this seat" : "Reserve this table"}
          </button>
        </div>
      </div>
    );
  }

  return (
    <div key={table.id} className="rise flex flex-col">
      <div className={compact ? "relative h-48 bg-surface-2" : "relative aspect-[4/3] bg-surface-2"}>
        <Image
          src={table.photo}
          alt={table.photoAlt}
          fill
          sizes="(min-width: 1024px) 420px, 100vw"
          className="object-cover"
        />
        <div className="absolute left-3 top-3 rounded-full bg-black/55 px-3 py-1 text-xs font-semibold text-white backdrop-blur-sm">
          How this table looks
        </div>
        <button
          type="button"
          onClick={onClear}
          aria-label="Close table preview"
          className="absolute right-3 top-3 grid h-10 w-10 place-items-center rounded-full bg-black/55 text-white backdrop-blur-sm"
        >
          <CloseCircle size={18} color="currentColor" variant="Bold" aria-hidden />
        </button>
      </div>
      <div className="space-y-4 p-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
            {table.zone}
          </p>
          <h2 className="mt-1 font-display text-3xl tracking-tight">{table.name}</h2>
          <p className="mt-1 text-sm text-muted">
            {table.seats} {table.seats === 1 ? "seat" : "seats"}
            {table.status === "held" ? " · Booked" : " · Open"}
          </p>
        </div>
        <p className="text-sm leading-relaxed text-foreground">{table.note}</p>
        <ul className="flex flex-wrap gap-2">
          {table.perks.map((perk) => {
            const PerkIcon = perkIcons[perk] ?? PerkFallback;
            return (
              <li
                key={perk}
                className="inline-flex items-center gap-1.5 rounded-full bg-surface-2 px-3 py-1.5 text-xs font-semibold text-foreground"
              >
                <PerkIcon size={14} variant="Bold" className="text-accent" aria-hidden />
                {perk}
              </li>
            );
          })}
        </ul>
        {reason ? (
          <p className="rounded-2xl bg-accent-soft px-4 py-3 text-sm leading-relaxed text-foreground">
            {reason}
          </p>
        ) : (
          <p className="text-sm text-muted">
            {time} · party of {guests}
          </p>
        )}
        <button
          type="button"
          className={`${primaryButton} w-full`}
          disabled={Boolean(reason)}
          onClick={onReserve}
        >
          <Reserve size={18} color="currentColor" variant="Bold" aria-hidden />
          {reason ? "Can’t reserve this seat" : "Reserve this table"}
        </button>
      </div>
    </div>
  );
}
