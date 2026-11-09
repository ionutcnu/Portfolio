"use client";

import { Clock3, ExternalLink } from "lucide-react";
import { useEffect, useState } from "react";
import { BentoBox } from "./BentoGrid";

type Stats = {
  status: "ready" | "unavailable" | "processing";
  profile?: string;
  range?: string;
  total?: number | null;
  average?: number | null;
  categories?: { name: string; percent: number }[];
  languages?: { name: string; percent: number }[];
  stale?: boolean;
};
const colors = ["#89b4fa", "#cba6f7", "#e5a54b", "#a6e3a1", "#94e2d5"];
const statusText = "text-[11px] leading-[1.8] text-[hsl(var(--foreground)/0.6)]";
function categoryColor(name: string, index: number) {
  return name === "AI Coding" ? "#cba6f7" : colors[index % colors.length];
}
function duration(seconds: number) {
  const minutes = Math.round(seconds / 60);
  return `${Math.floor(minutes / 60)}h ${minutes % 60}m`;
}

export default function WakaTimeWidget() {
  const [stats, setStats] = useState<Stats | null>(null);
  const [attempt, setAttempt] = useState(0);
  useEffect(() => {
    const controller = new AbortController();
    setStats(null);
    fetch("/api/wakatime", { signal: controller.signal, cache: "no-store" })
      .then((response) => {
        if (!response.ok) throw new Error("Unavailable");
        return response.json() as Promise<Stats>;
      })
      .then(setStats)
      .catch(() => {
        if (!controller.signal.aborted) setStats({ status: "unavailable" });
      });
    return () => controller.abort();
  }, [attempt]);
  return (
    <BentoBox className="waka-card">
      <div className="waka-heading mb-[22px] flex flex-wrap items-center justify-between gap-2">
        <h3 className="m-0 flex items-center gap-2">
          <Clock3 size={16} aria-hidden="true" className="text-[#cba6f7]" />
          Coding activity
        </h3>
        <span className="rounded-[20px] border border-border px-[9px] py-1 text-[10px]">
          {stats?.range ?? "Public stats"}
        </span>
      </div>
      {!stats ? (
        <p className={statusText} role="status">
          Loading coding activity...
        </p>
      ) : stats.status === "ready" ? (
        <>
          {stats.total != null && (
            <dl className="mb-6 grid grid-cols-2 gap-4 max-sm:gap-2.5">
              <div className="rounded-lg border border-[hsl(var(--border)/0.7)] bg-[hsl(var(--foreground)/0.025)] px-[18px] py-4 max-sm:p-3">
                <dt className="text-[11px] text-[hsl(var(--foreground)/0.6)]">Coding time</dt>
                <dd className="mt-1 text-[clamp(22px,2.4vw,30px)] font-semibold tracking-[-0.04em] tabular-nums text-[#edc17a]">
                  {duration(stats.total ?? 0)}
                </dd>
              </div>
              <div className="rounded-lg border border-[hsl(var(--border)/0.7)] bg-[hsl(var(--foreground)/0.025)] px-[18px] py-4 max-sm:p-3">
                <dt className="text-[11px] text-[hsl(var(--foreground)/0.6)]">Daily average</dt>
                <dd className="mt-1 text-[clamp(22px,2.4vw,30px)] font-semibold tracking-[-0.04em] tabular-nums text-[#cdd6f4]">
                  {stats.average == null ? "Unavailable" : duration(stats.average)}
                </dd>
              </div>
            </dl>
          )}
          <div className="grid flex-1 grid-cols-2 gap-[26px] max-sm:grid-cols-1 max-sm:gap-6">
            {!!stats.categories?.length && (
              <section aria-label="Activity breakdown">
                <h4 className="mb-4 text-[11px] font-semibold text-[hsl(var(--foreground)/0.7)]">
                  How I code
                </h4>
                <div
                  className="mb-[18px] flex h-2.5 overflow-hidden rounded-[5px] bg-[hsl(var(--foreground)/0.07)]"
                  aria-hidden="true"
                >
                  {stats.categories.map((category, index) => (
                    <span
                      key={category.name}
                      style={{
                        width: `${category.percent}%`,
                        background: categoryColor(category.name, index),
                      }}
                    />
                  ))}
                </div>
                <ul className="grid grid-cols-1 gap-[13px] text-[11px]">
                  {stats.categories.map((category, index) => (
                    <li key={category.name} className="flex justify-between gap-2">
                      <span className="inline-flex items-center gap-[7px]">
                        <i
                          style={{ background: categoryColor(category.name, index) }}
                          className="inline-block h-1.5 w-1.5 flex-shrink-0 rounded-full"
                          aria-hidden="true"
                        />
                        {category.name === "Coding" ? "Manual coding" : category.name}
                      </span>
                      <strong className="font-medium tabular-nums text-[hsl(var(--foreground)/0.85)]">
                        {category.percent.toFixed(1)}%
                      </strong>
                    </li>
                  ))}
                </ul>
              </section>
            )}
            {stats.total === 0 ? (
              <p className={statusText}>No coding activity recorded in this period.</p>
            ) : (
              <div className="grid content-start gap-[11px] border-l border-border pl-[26px] max-sm:border-l-0 max-sm:border-t max-sm:pt-5 max-sm:pl-0">
                <h4 className="mb-1 text-[11px] font-semibold text-[hsl(var(--foreground)/0.7)]">
                  Top languages
                </h4>
                {stats.languages?.map((language, index) => (
                  <div key={language.name}>
                    <div className="mb-[5px] flex justify-between text-[10px]">
                      <span>{language.name}</span>
                      <span>{language.percent.toFixed(1)}%</span>
                    </div>
                    <div
                      className="h-[5px] overflow-hidden rounded-[4px] bg-[hsl(var(--foreground)/0.07)]"
                      aria-hidden="true"
                    >
                      <span
                        style={{ width: `${language.percent}%`, background: colors[index] }}
                        className="block h-full rounded-[inherit]"
                      />
                    </div>
                  </div>
                ))}
                {!stats.languages?.length && (
                  <p className={statusText}>Language breakdown is not publicly available.</p>
                )}
              </div>
            )}
          </div>
          {stats.stale && (
            <p className={statusText}>
              Showing the latest available stats while WakaTime refreshes.
            </p>
          )}
        </>
      ) : (
        <p className={statusText} role="status">
          {stats.status === "processing"
            ? "WakaTime is preparing the latest stats."
            : "Coding activity is currently unavailable."}
        </p>
      )}
      <div className="mt-6 flex gap-5 border-t border-border pt-4 text-[10px] text-[hsl(var(--foreground)/0.55)]">
        {stats?.profile && (
          <a
            href={stats.profile}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-1.5"
          >
            Tracked with WakaTime
            <ExternalLink size={12} aria-hidden="true" />
          </a>
        )}
        {stats && ["unavailable", "processing"].includes(stats.status) && (
          <button
            type="button"
            onClick={() => setAttempt((value) => value + 1)}
            className="text-[#edc17a]"
          >
            Retry
          </button>
        )}
      </div>
    </BentoBox>
  );
}
