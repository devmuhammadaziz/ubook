"use client";

import { GuestStepper } from "@/components/guest-stepper";
import { HeroCarousel } from "@/components/hero-carousel";
import { ThemeToggle } from "@/components/theme-toggle";
import { primaryButton } from "@/components/ui";
import {
  branches,
  getBranch,
  heroImages,
  openTables,
  restaurant,
  type Branch,
} from "@/lib/data";
import { useBooking } from "@/lib/booking";
import {
  formatDayNumber,
  formatLong,
  formatMedium,
  formatMonth,
  formatWeekday,
  isMonday,
  toISODate,
  upcomingDates,
} from "@/lib/dates";
import {
  ArrowRight,
  Calendar,
  Clock,
  Eye,
  Location,
  People,
  QuoteDown,
  Star1,
  TickCircle,
} from "iconsax-react";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";

function Reviews({ branch }: { branch: Branch }) {
  const [showReviews, setShowReviews] = useState(false);
  const featured = branch.reviews[0];

  return (
    <section className="py-8">
      <div className="rounded-[28px] border border-line bg-surface p-5 sm:p-6">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Star1 size={18} variant="Bold" className="text-accent" aria-hidden />
            <span className="font-semibold">{branch.rating}</span>
            <span className="text-sm text-muted">{branch.reviewCount}</span>
          </div>
          {branch.reviews.length > 1 ? (
            <button
              type="button"
              className="text-sm font-semibold text-accent"
              onClick={() => setShowReviews((open) => !open)}
              aria-expanded={showReviews}
            >
              {showReviews ? "Show less" : "See all"}
            </button>
          ) : null}
        </div>
        <figure className="mt-4 border-l-2 border-accent/40 pl-4">
          <QuoteDown size={18} variant="Bold" className="text-accent" aria-hidden />
          <blockquote className="mt-2 font-display text-xl italic leading-snug">
            “{featured.quote}”
          </blockquote>
          <figcaption className="mt-3 text-sm text-muted">{featured.author}</figcaption>
        </figure>
        {showReviews ? (
          <ul className="mt-5 space-y-4 border-t border-line pt-5">
            {branch.reviews.slice(1).map((review) => (
              <li key={review.author}>
                <p className="text-sm leading-relaxed">“{review.quote}”</p>
                <p className="mt-1 text-xs text-muted">
                  {review.author} · {review.score}
                </p>
              </li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  );
}

export function HomeView() {
  const booking = useBooking();
  const branch = getBranch(booking.draft.branchId);
  const dates = upcomingDates(14);
  const today = toISODate(new Date());
  const available = openTables(branch, booking.draft.guests);
  const canContinue = Boolean(booking.draft.time) && !isMonday(booking.draft.date);

  return (
    <div className="min-h-dvh pb-28 lg:pb-12">
      <header className="sticky top-0 z-30 border-b border-line/80 bg-background/80 backdrop-blur-md">
        <div className="mx-auto flex h-16 max-w-6xl items-center justify-between px-4">
          <Link href="/" className="flex items-center gap-3">
            <span className="grid h-9 w-9 place-items-center rounded-xl bg-accent text-[11px] font-bold tracking-wide text-accent-foreground">
              VT
            </span>
            <span className="font-display text-lg tracking-tight">{restaurant.name}</span>
          </Link>
          <div className="flex items-center gap-2">
            <a href="#book" className={`${primaryButton} hidden h-11 px-4 sm:inline-flex`}>
              Reserve
            </a>
            <ThemeToggle />
          </div>
        </div>
      </header>

      <main id="content" className="mx-auto max-w-6xl px-4">
        {booking.reservation ? (
          <Link
            href="/confirmed"
            className="mt-5 flex items-center justify-between gap-3 rounded-2xl border border-line bg-good-soft px-4 py-3 text-sm"
          >
            <span className="inline-flex items-center gap-2 font-semibold">
              <TickCircle size={18} variant="Bold" className="text-good" aria-hidden />
              Reservation {booking.reservation.code} is saved
            </span>
            <ArrowRight size={16} variant="Bold" aria-hidden />
          </Link>
        ) : null}

        <section className="grid items-center gap-8 py-6 lg:grid-cols-2 lg:py-10">
          <HeroCarousel images={heroImages} />
          <div>
            <div className="flex flex-wrap items-center gap-2 text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              <span className="rounded-md bg-accent-soft px-2.5 py-1 text-accent">
                {restaurant.cuisine}
              </span>
              <span>{restaurant.style}</span>
              <span aria-hidden>·</span>
              <span>{restaurant.price}</span>
            </div>
            <h1 className="mt-4 font-display text-5xl tracking-tight sm:text-6xl">
              {restaurant.name}
            </h1>
            <div className="mt-4 flex flex-wrap items-center gap-3 text-sm">
              <span className="inline-flex items-center gap-1.5 font-semibold">
                <Star1 size={16} variant="Bold" className="text-accent" aria-hidden />
                {branch.rating}
              </span>
              <span className="text-muted">{branch.reviewCount}</span>
              <span className="inline-flex items-center gap-1.5 rounded-full bg-good-soft px-3 py-1 text-xs font-semibold text-good">
                <span className="h-1.5 w-1.5 rounded-full bg-good" />
                {openTables(branch).length} open tonight
              </span>
            </div>

            <div className="mt-8">
              <div className="mb-3 flex items-center justify-between">
                <h2 className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  Select location
                </h2>
                <span className="text-xs text-muted">{branches.length} locations</span>
              </div>
              <div className="grid grid-cols-3 gap-1 rounded-2xl bg-surface-2 p-1" role="tablist">
                {branches.map((item) => {
                  const active = item.id === branch.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      role="tab"
                      aria-selected={active}
                      onClick={() => booking.setBranch(item.id)}
                      className={
                        active
                          ? "h-11 rounded-xl bg-surface text-sm font-semibold text-foreground lift"
                          : "h-11 rounded-xl text-sm font-medium text-muted"
                      }
                    >
                      {item.name}
                    </button>
                  );
                })}
              </div>
              <p className="mt-3 inline-flex items-start gap-2 text-sm text-muted">
                <Location size={16} variant="Bold" className="mt-0.5 shrink-0 text-accent" aria-hidden />
                <span>
                  {branch.address}
                  <span className="block text-xs">{branch.area}</span>
                </span>
              </p>
              <p className="mt-2 inline-flex items-center gap-2 text-sm text-muted">
                <Clock size={16} variant="Bold" className="text-accent" aria-hidden />
                {restaurant.hours} · {restaurant.closed}
              </p>
              <p className="mt-4 max-w-xl text-base leading-relaxed text-muted">
                {restaurant.description}
              </p>
            </div>
          </div>
        </section>

        <section id="book" className="scroll-mt-20 pb-8">
          <div className="rounded-[28px] border border-line bg-surface p-5 lift sm:p-8">
            <div className="grid gap-8 lg:grid-cols-[minmax(0,1fr)_280px]">
              <div>
                <h2 className="font-display text-3xl tracking-tight">Plan the evening</h2>
                <p className="mt-2 max-w-lg text-sm leading-relaxed text-muted">
                  Pick the day, the party, and a time. Next you’ll choose the exact table and see a photo of it.
                </p>

                <div className="mt-6 flex gap-2 overflow-x-auto scroller pb-1">
                  {dates.map((date) => {
                    const iso = toISODate(date);
                    const closed = isMonday(iso);
                    const selected = iso === booking.draft.date;
                    return (
                      <button
                        key={iso}
                        type="button"
                        disabled={closed}
                        aria-pressed={selected}
                        onClick={() => booking.setDate(iso)}
                        className={
                          selected
                            ? "flex h-[4.5rem] w-16 shrink-0 flex-col items-center justify-center rounded-2xl bg-accent text-accent-foreground"
                            : "flex h-[4.5rem] w-16 shrink-0 flex-col items-center justify-center rounded-2xl border border-line bg-background text-foreground disabled:opacity-40"
                        }
                      >
                        <span className="text-[10px] font-semibold uppercase tracking-wide">
                          {iso === today ? "Today" : formatWeekday(iso)}
                        </span>
                        <span className="text-lg font-semibold leading-none">
                          {formatDayNumber(iso)}
                        </span>
                        <span className="text-[10px] uppercase">
                          {closed ? "Closed" : formatMonth(iso)}
                        </span>
                      </button>
                    );
                  })}
                </div>

                <div className="mt-6">
                  <p className="mb-2 text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                    Party size
                  </p>
                  <GuestStepper
                    value={booking.draft.guests}
                    onChange={booking.setGuests}
                  />
                </div>

                <div className="mt-6">
                  <div className="mb-2 flex items-center justify-between">
                    <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                      Open slots
                    </p>
                    <span className="text-xs text-muted">{branch.name}</span>
                  </div>
                  <div className="flex flex-wrap gap-2">
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
                              ? "h-11 rounded-xl bg-accent px-4 text-sm font-semibold text-accent-foreground"
                              : "h-11 rounded-xl border border-line bg-background px-4 text-sm font-semibold text-foreground hover:bg-surface-2"
                          }
                        >
                          {slot}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </div>

              <aside className="flex flex-col rounded-[24px] bg-surface-2 p-5">
                <p className="text-xs font-semibold uppercase tracking-[0.16em] text-muted">
                  So far
                </p>
                <ul className="mt-4 space-y-3 text-sm">
                  <li className="flex items-center gap-2">
                    <Location size={16} variant="Bold" className="text-accent" aria-hidden />
                    {branch.short}
                  </li>
                  <li className="flex items-center gap-2">
                    <Calendar size={16} variant="Bold" className="text-accent" aria-hidden />
                    {formatMedium(booking.draft.date)}
                  </li>
                  <li className="flex items-center gap-2">
                    <Clock size={16} variant="Bold" className="text-accent" aria-hidden />
                    {booking.draft.time ?? "Time not chosen"}
                  </li>
                  <li className="flex items-center gap-2">
                    <People size={16} variant="Bold" className="text-accent" aria-hidden />
                    Party of {booking.draft.guests}
                  </li>
                </ul>
                <p className="mt-4 text-sm text-muted">
                  {available.length}{" "}
                  {available.length === 1 ? "table fits" : "tables fit"} this party.
                </p>
                <div className="mt-auto pt-6">
                  {canContinue ? (
                    <Link href="/reserve" className={`${primaryButton} w-full`}>
                      Choose your table
                      <ArrowRight size={18} variant="Bold" aria-hidden />
                    </Link>
                  ) : (
                    <button type="button" className={`${primaryButton} w-full`} disabled>
                      Select a time
                    </button>
                  )}
                </div>
              </aside>
            </div>
          </div>
        </section>

        <section className="py-4">
          <div className="mb-3 flex items-end justify-between">
            <h2 className="font-display text-3xl tracking-tight">Branch ambience</h2>
            <span className="text-xs font-semibold uppercase tracking-[0.14em] text-muted">
              {branch.name}
            </span>
          </div>
          <div
            className={
              branch.gallery.length > 2
                ? "flex gap-3 overflow-x-auto scroller lg:grid lg:grid-cols-3 lg:overflow-visible"
                : "flex gap-3 overflow-x-auto scroller lg:grid lg:grid-cols-2 lg:overflow-visible"
            }
          >
            {branch.gallery.map((image) => (
              <div
                key={image.src}
                className="relative aspect-[16/10] w-[78%] shrink-0 overflow-hidden rounded-2xl bg-surface-2 sm:w-80 lg:w-auto"
              >
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(min-width: 1024px) 360px, 80vw"
                  className="object-cover"
                />
              </div>
            ))}
          </div>
        </section>

        <Reviews key={branch.id} branch={branch} />

        <section className="grid gap-3 pb-10 sm:grid-cols-3">
          {[
            {
              icon: Calendar,
              title: "Set the evening",
              copy: "Location, day, party size, and a time that is still open.",
            },
            {
              icon: People,
              title: "Tap a table",
              copy: "The floor plan is the room from above. Open seats stay blue.",
            },
            {
              icon: Eye,
              title: "See the real seat",
              copy: "A photo of that table opens before you confirm anything.",
            },
          ].map((step, index) => (
            <article key={step.title} className="rounded-[24px] border border-line bg-surface p-5">
              <step.icon size={22} variant="Bold" className="text-accent" aria-hidden />
              <p className="mt-4 font-display text-lg">
                0{index + 1} {step.title}
              </p>
              <p className="mt-2 text-sm leading-relaxed text-muted">{step.copy}</p>
            </article>
          ))}
        </section>

        <footer className="border-t border-line py-6 text-sm text-muted">
          {restaurant.name} · {formatLong(booking.draft.date)} · {restaurant.hours}
        </footer>
      </main>

      <div className="fixed inset-x-0 bottom-0 z-40 border-t border-line bg-surface/90 px-4 py-3 backdrop-blur-md lg:hidden">
        <div className="mx-auto flex max-w-6xl items-center gap-3">
          <div className="min-w-0">
            <p className="text-[10px] font-semibold uppercase tracking-[0.14em] text-muted">
              {branch.name}
            </p>
            <p className="truncate text-sm font-semibold">
              {booking.draft.time ?? "Select a time"}
            </p>
          </div>
          {canContinue ? (
            <Link href="/reserve" className={`${primaryButton} min-w-40 flex-1`}>
              Choose table
            </Link>
          ) : (
            <a href="#book" className={`${primaryButton} min-w-40 flex-1`}>
              Select a time
            </a>
          )}
        </div>
      </div>
    </div>
  );
}
