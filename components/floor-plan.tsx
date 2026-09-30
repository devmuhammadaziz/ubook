"use client";

import type { DiningTable } from "@/lib/data";

type Chair = { x: number; y: number; rot: number };

function chairsFor(table: DiningTable): Chair[] {
  if (table.shape === "booth") return [];
  if (table.shape === "round") {
    return Array.from({ length: table.seats }, (_, index) => {
      const angle = (index / table.seats) * Math.PI * 2 - Math.PI / 2;
      const distance = table.w / 2 + 16;
      return {
        x: table.x + Math.cos(angle) * distance,
        y: table.y + Math.sin(angle) * distance,
        rot: (angle * 180) / Math.PI + 90,
      };
    });
  }

  const facing = table.facing ?? "both";
  const chairs: Chair[] = [];
  const place = (count: number, y: number, rot: number) => {
    if (count <= 0) return;
    const width = Math.max(table.w - 18, 18);
    for (let index = 0; index < count; index += 1) {
      chairs.push({
        x: table.x - width / 2 + (width / count) * (index + 0.5),
        y,
        rot,
      });
    }
  };

  if (facing === "south") {
    place(table.seats, table.y + table.h / 2 + 13, 180);
  } else if (facing === "north") {
    place(table.seats, table.y - table.h / 2 - 13, 0);
  } else {
    place(Math.ceil(table.seats / 2), table.y - table.h / 2 - 13, 0);
    place(Math.floor(table.seats / 2), table.y + table.h / 2 + 13, 180);
  }
  return chairs;
}

function ChairShape({ chair }: { chair: Chair }) {
  return (
    <rect
      className="seat"
      x={-8}
      y={-5.5}
      width={16}
      height={11}
      rx={3.5}
      transform={`translate(${chair.x} ${chair.y}) rotate(${chair.rot})`}
    />
  );
}

function TableShape({ table }: { table: DiningTable }) {
  if (table.shape === "round") {
    const radius = table.w / 2;
    return (
      <>
        <circle className="table-top" cx={table.x} cy={table.y} r={radius} />
        <circle className="centerpiece" cx={table.x} cy={table.y} r={radius * 0.28} />
        <text
          className="seat-count"
          x={table.x}
          y={table.y + 1}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {table.seats}
        </text>
      </>
    );
  }

  if (table.shape === "booth") {
    const left = table.x - table.w / 2;
    const top = table.y - table.h / 2;
    const bench = 16;
    const tableTop = top + bench + 8;
    const tableHeight = table.h * 0.38;
    return (
      <>
        <rect className="seat" x={left} y={top} width={table.w} height={bench + 12} rx={16} />
        <rect className="seat" x={left} y={top} width={bench} height={table.h * 0.78} rx={12} />
        <rect
          className="seat"
          x={left + table.w - bench}
          y={top}
          width={bench}
          height={table.h * 0.78}
          rx={12}
        />
        <rect
          className="table-top"
          x={left + bench + 8}
          y={tableTop}
          width={table.w - bench * 2 - 16}
          height={tableHeight}
          rx={8}
        />
        <text
          className="seat-count"
          x={table.x}
          y={tableTop + tableHeight / 2}
          textAnchor="middle"
          dominantBaseline="middle"
        >
          {table.seats}
        </text>
      </>
    );
  }

  return (
    <>
      <rect
        className="table-top"
        x={table.x - table.w / 2}
        y={table.y - table.h / 2}
        width={table.w}
        height={table.h}
        rx={8}
      />
      <text
        className="seat-count"
        x={table.x}
        y={table.y + 1}
        textAnchor="middle"
        dominantBaseline="middle"
      >
        {table.seats}
      </text>
    </>
  );
}

function Room({ branchId }: { branchId: string }) {
  return (
    <g>
      <rect className="room-shell" x="16" y="16" width="368" height="678" rx="28" />
      {branchId === "harbor" ? (
        <g>
          <rect className="window-pane" x="36" y="30" width="328" height="22" rx="8" />
          <text className="plan-label" x="200" y="45" textAnchor="middle">
            WATER
          </text>
        </g>
      ) : branchId === "midtown" ? (
        <g>
          <rect className="seat" x="344" y="78" width="22" height="520" rx="10" opacity="0.85" />
          <text className="plan-label" x="200" y="58" textAnchor="middle">
            LOUNGE
          </text>
          <text className="plan-label" x="355" y="70" textAnchor="middle">
            BAR
          </text>
        </g>
      ) : (
        <g>
          {[0, 1, 2, 3, 4].map((pane) => (
            <rect
              key={pane}
              className="window-pane"
              x={40 + pane * 66}
              y="32"
              width="50"
              height="12"
              rx="3"
            />
          ))}
          <text className="plan-label" x="200" y="64" textAnchor="middle">
            WINDOWS
          </text>
          <text className="plan-label" x="318" y="392" textAnchor="middle">
            KITCHEN
          </text>
          <line
            x1="40"
            y1="582"
            x2="360"
            y2="582"
            stroke="var(--floor-line)"
            strokeDasharray="3 4"
          />
          <text className="plan-label" x="78" y="600" textAnchor="middle">
            TERRACE
          </text>
        </g>
      )}
      <circle className="plant" cx="42" cy="210" r="7" />
      <circle className="plant" cx="358" cy="250" r="6" />
      <text className="plan-label" x="200" y="674" textAnchor="middle">
        ENTRANCE
      </text>
    </g>
  );
}

export function FloorPlan({
  branchId,
  tables,
  guests,
  selectedId,
  onSelect,
}: {
  branchId: string;
  tables: DiningTable[];
  guests: number;
  selectedId: string | null;
  onSelect: (id: string) => void;
}) {
  return (
    <svg
      viewBox="0 0 400 710"
      role="group"
      aria-label="Restaurant floor plan"
      className="floor-svg"
    >
      <defs>
        <linearGradient id="wood" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="var(--wood-a)" />
          <stop offset="100%" stopColor="var(--wood-b)" />
        </linearGradient>
      </defs>
      <Room branchId={branchId} />
      {tables.map((table) => {
        const selected = table.id === selectedId;
        const tight = table.status === "open" && table.seats < guests;
        const label = [
          table.name,
          `${table.seats} seats`,
          table.zone,
          table.status === "held" ? "booked" : tight ? "too small for this party" : "open",
        ].join(", ");
        const className = [
          "table-hit",
          table.status === "held" ? "is-held" : "",
          tight ? "is-tight" : "",
          selected ? "is-selected" : "",
        ]
          .filter(Boolean)
          .join(" ");

        return (
          <g
            key={table.id}
            className={className}
            role="button"
            tabIndex={0}
            onMouseDown={(event) => event.preventDefault()}
            aria-pressed={selected}
            aria-label={label}
            onClick={() => onSelect(table.id)}
            onKeyDown={(event) => {
              if (event.key === "Enter" || event.key === " ") {
                event.preventDefault();
                onSelect(table.id);
              }
            }}
          >
            <title>{label}</title>
            <ellipse
              cx={table.x}
              cy={table.y}
              rx={table.w / 2 + 22}
              ry={table.h / 2 + 22}
              fill="transparent"
            />
            {selected ? (
              <ellipse
                className="selected-ring"
                cx={table.x}
                cy={table.y}
                rx={table.w / 2 + 26}
                ry={table.h / 2 + 26}
              />
            ) : null}
            {chairsFor(table).map((chair, index) => (
              <ChairShape key={`${table.id}-chair-${index}`} chair={chair} />
            ))}
            <TableShape table={table} />
          </g>
        );
      })}
    </svg>
  );
}
