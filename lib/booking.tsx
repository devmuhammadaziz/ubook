"use client";

import { getBranch } from "@/lib/data";
import { firstBookableISO, isMonday } from "@/lib/dates";
import {
  createContext,
  useContext,
  useSyncExternalStore,
  type ReactNode,
} from "react";

const STORAGE_KEY = "ubook-velvet-v1";
const CHANGE_EVENT = "ubook-booking";

export type Draft = {
  branchId: string;
  date: string;
  time: string | null;
  guests: number;
  tableId: string | null;
};

export type Reservation = {
  branchId: string;
  date: string;
  time: string;
  guests: number;
  tableId: string;
  code: string;
};

type Persisted = {
  draft: Draft;
  reservation: Reservation | null;
};

type BookingContextValue = Persisted & {
  ready: boolean;
  setBranch: (branchId: string) => void;
  setDate: (date: string) => void;
  setTime: (time: string) => void;
  setGuests: (guests: number) => void;
  setTable: (tableId: string | null) => void;
  confirm: () => Reservation | null;
  clearTable: () => void;
  clearReservation: () => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

function defaultDraft(): Draft {
  return {
    branchId: "downtown",
    date: firstBookableISO(),
    time: null,
    guests: 2,
    tableId: null,
  };
}

function clampGuests(value: number) {
  if (!Number.isFinite(value)) return 2;
  return Math.min(10, Math.max(1, Math.round(value)));
}

function sanitizeDraft(input: Partial<Draft> | null | undefined): Draft {
  const branch = getBranch(input?.branchId ?? "downtown");
  const earliest = firstBookableISO();
  const date =
    input?.date && input.date >= earliest && !isMonday(input.date)
      ? input.date
      : earliest;
  const time =
    input?.time && branch.slots.includes(input.time) ? input.time : null;
  const guests = clampGuests(input?.guests ?? 2);
  const match = branch.tables.find((item) => item.id === input?.tableId);
  const tableId = match && match.seats >= guests ? match.id : null;
  return { branchId: branch.id, date, time, guests, tableId };
}

function sanitizeReservation(
  input: Reservation | null | undefined,
): Reservation | null {
  if (!input) return null;
  const branch = getBranch(input.branchId);
  const table = branch.tables.find((item) => item.id === input.tableId);
  if (!table || table.status !== "open" || !input.code) return null;
  if (!branch.slots.includes(input.time) || isMonday(input.date)) return null;
  if (table.seats < input.guests) return null;
  return {
    branchId: branch.id,
    date: input.date,
    time: input.time,
    guests: clampGuests(input.guests),
    tableId: table.id,
    code: input.code,
  };
}

function reservationCode(draft: Draft) {
  const raw = `${draft.branchId}|${draft.date}|${draft.time}|${draft.tableId}|${draft.guests}`;
  let hash = 2166136261;
  for (let index = 0; index < raw.length; index += 1) {
    hash ^= raw.charCodeAt(index);
    hash = Math.imul(hash, 16777619);
  }
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let value = hash >>> 0;
  let code = "";
  for (let index = 0; index < 5; index += 1) {
    code += alphabet[value % alphabet.length];
    value = Math.floor(value / alphabet.length);
  }
  return `VT-${code}`;
}

function buildReservation(draft: Draft): Reservation | null {
  const branch = getBranch(draft.branchId);
  const table = branch.tables.find((item) => item.id === draft.tableId);
  if (!draft.time || !table) return null;
  if (table.status !== "open" || table.seats < draft.guests) return null;
  if (!branch.slots.includes(draft.time) || isMonday(draft.date)) return null;
  return {
    branchId: draft.branchId,
    date: draft.date,
    time: draft.time,
    guests: draft.guests,
    tableId: table.id,
    code: reservationCode(draft),
  };
}

let cachedRaw: string | null | undefined;
let cachedState: Persisted | null = null;

function readState(): Persisted {
  const raw = sessionStorage.getItem(STORAGE_KEY);
  if (raw === cachedRaw && cachedState) return cachedState;
  cachedRaw = raw;
  if (!raw) {
    cachedState = { draft: defaultDraft(), reservation: null };
    return cachedState;
  }
  try {
    const parsed = JSON.parse(raw) as Persisted;
    const draft = sanitizeDraft(parsed.draft);
    cachedState = { draft, reservation: sanitizeReservation(parsed.reservation) };
    return cachedState;
  } catch {
    cachedState = { draft: defaultDraft(), reservation: null };
    return cachedState;
  }
}

function writeState(next: Persisted) {
  const raw = JSON.stringify(next);
  cachedRaw = raw;
  cachedState = next;
  sessionStorage.setItem(STORAGE_KEY, raw);
  window.dispatchEvent(new Event(CHANGE_EVENT));
}

function updateState(updater: (current: Persisted) => Persisted) {
  writeState(updater(readState()));
}

function subscribe(onStoreChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onStoreChange);
  return () => window.removeEventListener(CHANGE_EVENT, onStoreChange);
}

function getServerSnapshot() {
  return null;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const state = useSyncExternalStore(subscribe, readState, getServerSnapshot);

  if (!state) {
    return (
      <div className="grid min-h-dvh place-items-center bg-background px-6 text-foreground">
        <p className="font-display text-3xl tracking-tight">The Velvet Truffle</p>
      </div>
    );
  }

  const value: BookingContextValue = {
    ...state,
    ready: true,
    setBranch: (branchId) =>
      updateState((current) => ({
        ...current,
        draft: sanitizeDraft({
          ...current.draft,
          branchId,
          time: null,
          tableId: null,
        }),
      })),
    setDate: (date) =>
      updateState((current) => ({
        ...current,
        draft: {
          ...current.draft,
          date,
          time: isMonday(date) ? null : current.draft.time,
        },
      })),
    setTime: (time) =>
      updateState((current) => {
        const branch = getBranch(current.draft.branchId);
        if (!branch.slots.includes(time) || isMonday(current.draft.date)) {
          return current;
        }
        return { ...current, draft: { ...current.draft, time } };
      }),
    setGuests: (guests) =>
      updateState((current) => ({
        ...current,
        draft: { ...current.draft, guests: clampGuests(guests) },
      })),
    setTable: (tableId) =>
      updateState((current) => ({
        ...current,
        draft: { ...current.draft, tableId },
      })),
    confirm: () => {
      const current = readState();
      const created = buildReservation(current.draft);
      if (!created) return null;
      writeState({ ...current, reservation: created });
      return created;
    },
    clearTable: () =>
      updateState((current) => ({
        ...current,
        draft: { ...current.draft, tableId: null },
      })),
    clearReservation: () =>
      updateState((current) => ({ ...current, reservation: null })),
  };

  return (
    <BookingContext.Provider value={value}>{children}</BookingContext.Provider>
  );
}

export function useBooking() {
  const value = useContext(BookingContext);
  if (!value) {
    throw new Error("useBooking must be used within BookingProvider");
  }
  return value;
}
